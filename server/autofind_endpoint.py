"""
POST /api/v1/autofind
AI-powered cheat keyword discovery for I Cheat Finder dialog.

Request:
    {
        "preset":     "SNES",
        "game":       "Super Mario World",
        "cheatNames": ["Infinite Lives", "Moon Jump"]
    }

Response:
    {
        "preset":         "SNES",
        "game":           "Super Mario World",
        "normalizedGame": "super mario world",
        "results": [
            {
                "input":      "Infinite Lives",
                "normalized": "infinite lives",
                "aliases":    ["unlimited lives", "99 lives", "extra lives"],
                "keywords":   [
                    "Super Mario World infinite lives SNES cheat code",
                    "super mario world unlimited lives game genie"
                ],
                "confidence": 0.95
            }
        ]
    }

Add to your main FastAPI app:
    from autofind_endpoint import router as autofind_router
    app.include_router(autofind_router, prefix="/api/v1")
"""

from __future__ import annotations

import os
import re
import time
import unicodedata
from functools import lru_cache
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel, Field, validator

# ---------------------------------------------------------------------------
# Optional dependencies — gracefully degrade if not installed
# ---------------------------------------------------------------------------
try:
    import openai
    _OPENAI_AVAILABLE = True
except ImportError:
    _OPENAI_AVAILABLE = False

# ---------------------------------------------------------------------------
# Router
# ---------------------------------------------------------------------------
router = APIRouter()

# ---------------------------------------------------------------------------
# Configuration (reads from environment variables)
# ---------------------------------------------------------------------------
OPENAI_API_KEY:  str = os.getenv("OPENAI_API_KEY", "")
CHEATINDEX_API_KEY: str = os.getenv("CHEATINDEX_API_KEY", "")
MAX_CHEAT_NAMES: int  = int(os.getenv("AUTOFIND_MAX_NAMES", "50"))
RATE_LIMIT_RPS:  float = float(os.getenv("AUTOFIND_RATE_LIMIT", "5"))   # requests/sec per IP

# ---------------------------------------------------------------------------
# Simple in-process rate limiter (per-IP token bucket)
# ---------------------------------------------------------------------------
_rate_buckets: dict[str, tuple[float, float]] = {}   # ip -> (tokens, last_time)

def _check_rate_limit(ip: str) -> None:
    capacity = RATE_LIMIT_RPS * 2          # burst
    refill   = RATE_LIMIT_RPS              # tokens/sec
    now      = time.monotonic()
    tokens, last = _rate_buckets.get(ip, (capacity, now))
    tokens = min(capacity, tokens + (now - last) * refill)
    if tokens < 1.0:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Rate limit exceeded. Please wait a moment.",
        )
    _rate_buckets[ip] = (tokens - 1.0, now)

def _client_ip(request: Request) -> str:
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"

# ---------------------------------------------------------------------------
# API-key authentication (optional — skipped if CHEATINDEX_API_KEY is empty)
# ---------------------------------------------------------------------------
def _verify_api_key(request: Request) -> None:
    if not CHEATINDEX_API_KEY:
        return   # auth disabled
    provided = (
        request.headers.get("X-API-Key")
        or request.headers.get("Authorization", "").removeprefix("Bearer ").strip()
    )
    if provided != CHEATINDEX_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing API key.",
        )

# ---------------------------------------------------------------------------
# Pydantic models
# ---------------------------------------------------------------------------
class AutofindRequest(BaseModel):
    preset:      str        = Field("SNES", min_length=1, max_length=32)
    game:        str        = Field(...,    min_length=1, max_length=256)
    cheatNames:  List[str]  = Field(...,    min_items=1)

    @validator("cheatNames", each_item=True)
    def _clean_name(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Cheat name must not be empty.")
        if len(v) > 128:
            raise ValueError(f"Cheat name too long (max 128 chars): {v[:40]}...")
        return v

    @validator("cheatNames")
    def _limit_count(cls, v: list) -> list:
        if len(v) > MAX_CHEAT_NAMES:
            raise ValueError(f"Too many cheat names (max {MAX_CHEAT_NAMES}).")
        return v


class CheatResult(BaseModel):
    input:      str
    normalized: str
    aliases:    List[str]
    keywords:   List[str]
    confidence: float


class AutofindResponse(BaseModel):
    preset:         str
    game:           str
    normalizedGame: str
    results:        List[CheatResult]


# ---------------------------------------------------------------------------
# Text normalisation helpers
# ---------------------------------------------------------------------------
def _normalize(text: str) -> str:
    """Lowercase, strip accents, collapse whitespace."""
    text = unicodedata.normalize("NFKD", text)
    text = "".join(c for c in text if not unicodedata.combining(c))
    return re.sub(r"\s+", " ", text).strip().lower()


def _deduplicate(items: list[str]) -> list[str]:
    seen: set[str] = set()
    out:  list[str] = []
    for item in items:
        key = _normalize(item)
        if key not in seen:
            seen.add(key)
            out.append(item)
    return out


# ---------------------------------------------------------------------------
# Static alias / keyword dictionary (fast, no AI cost)
# ---------------------------------------------------------------------------
_STATIC_ALIASES: dict[str, list[str]] = {
    "infinite lives":   ["unlimited lives", "99 lives", "extra lives", "infinite 1-ups"],
    "infinite health":  ["unlimited health", "god mode", "invincibility", "no damage"],
    "infinite energy":  ["unlimited energy", "full energy", "max energy"],
    "moon jump":        ["high jump", "super jump", "infinite jump", "fly"],
    "infinite coins":   ["unlimited coins", "max coins", "999 coins"],
    "infinite time":    ["unlimited time", "no time limit", "stop timer"],
    "max score":        ["infinite score", "9999999 score", "high score hack"],
    "walk through walls": ["no clip", "pass through walls", "wall clip"],
    "infinite ammo":    ["unlimited ammo", "no reload", "max ammo"],
    "infinite money":   ["unlimited money", "max gold", "infinite gold", "999 gold"],
    "level select":     ["stage select", "world select", "area select"],
    "all items":        ["full inventory", "all weapons", "all power ups", "max items"],
}


@lru_cache(maxsize=512)
def _static_lookup(normalized_name: str) -> Optional[list[str]]:
    """Return cached alias list for a normalised cheat name, or None."""
    return _STATIC_ALIASES.get(normalized_name)


# ---------------------------------------------------------------------------
# Build keywords from aliases + game context
# ---------------------------------------------------------------------------
def _build_keywords_static(
    game: str, preset: str, cheat_name: str, aliases: list[str]
) -> list[str]:
    """Generate search keyword strings without calling AI."""
    norm_game = _normalize(game)
    keywords: list[str] = []
    all_names = [cheat_name] + aliases
    for name in all_names[:4]:     # limit iterations
        keywords.append(f"{game} {name} {preset} cheat code")
        keywords.append(f"{norm_game} {_normalize(name)} cheat")
    keywords.append(f"{game} {preset} game genie {cheat_name}")
    keywords.append(f"{game} {preset} pro action replay {cheat_name}")
    return _deduplicate(keywords)[:8]


# ---------------------------------------------------------------------------
# OpenAI-powered keyword expansion
# ---------------------------------------------------------------------------
_SYSTEM_PROMPT = """\
You are a SNES/retro-game cheat-code research assistant.
Given a game name, platform, and a list of cheat descriptions, return ONLY a
JSON array of results. Each result must have:
  "input"      : the original cheat description (copy exactly)
  "normalized" : lowercase version
  "aliases"    : 3-6 alternative English names for the same cheat
  "keywords"   : 4-8 search query strings a human would type to find this cheat
  "confidence" : float 0.0-1.0 (how confident you are these keywords are relevant)

Rules:
- Do NOT invent cheat codes or memory addresses.
- Keywords must be natural search phrases, not codes.
- Return ONLY valid JSON. No prose, no markdown.
"""


def _ai_expand(
    game: str, preset: str, cheat_names: list[str]
) -> list[dict] | None:
    """Call OpenAI and return parsed result list, or None on failure."""
    if not _OPENAI_AVAILABLE or not OPENAI_API_KEY:
        return None
    try:
        client = openai.OpenAI(api_key=OPENAI_API_KEY)
        user_msg = (
            f"Platform: {preset}\n"
            f"Game: {game}\n"
            f"Cheats: {cheat_names}"
        )
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": _SYSTEM_PROMPT},
                {"role": "user",   "content": user_msg},
            ],
            temperature=0.3,
            max_tokens=1200,
            timeout=15,
        )
        raw = response.choices[0].message.content or ""
        # Strip markdown fences if present
        raw = re.sub(r"^```[a-z]*\n?", "", raw.strip())
        raw = re.sub(r"\n?```$", "", raw)
        import json
        parsed = json.loads(raw)
        if isinstance(parsed, list):
            return parsed
        if isinstance(parsed, dict) and "results" in parsed:
            return parsed["results"]
    except Exception:
        pass
    return None


# ---------------------------------------------------------------------------
# Main processing logic
# ---------------------------------------------------------------------------
def _process_request(req: AutofindRequest) -> AutofindResponse:
    norm_game = _normalize(req.game)
    results: list[CheatResult] = []

    # Try AI expansion for all names in one call (efficient)
    ai_results: dict[str, dict] = {}
    if _OPENAI_AVAILABLE and OPENAI_API_KEY:
        ai_list = _ai_expand(req.game, req.preset, req.cheatNames)
        if ai_list:
            for item in ai_list:
                if isinstance(item, dict) and "input" in item:
                    key = _normalize(str(item["input"]))
                    ai_results[key] = item

    for name in req.cheatNames:
        norm_name = _normalize(name)
        ai_item   = ai_results.get(norm_name)

        if ai_item:
            aliases  = [str(a) for a in ai_item.get("aliases",  []) if a][:6]
            keywords = [str(k) for k in ai_item.get("keywords", []) if k][:8]
            conf     = float(ai_item.get("confidence", 0.85))
        else:
            # Fall back to static dictionary
            static = _static_lookup(norm_name)
            aliases  = list(static) if static else []
            keywords = _build_keywords_static(req.game, req.preset, name, aliases)
            conf     = 0.70 if static else 0.50

        # Always ensure at least basic keyword coverage
        if not keywords:
            keywords = _build_keywords_static(req.game, req.preset, name, aliases)

        results.append(CheatResult(
            input      = name,
            normalized = norm_name,
            aliases    = _deduplicate(aliases),
            keywords   = _deduplicate(keywords),
            confidence = round(min(max(conf, 0.0), 1.0), 2),
        ))

    return AutofindResponse(
        preset         = req.preset,
        game           = req.game,
        normalizedGame = norm_game,
        results        = results,
    )


# ---------------------------------------------------------------------------
# Route
# ---------------------------------------------------------------------------
@router.post(
    "/autofind",
    response_model=AutofindResponse,
    summary="AI-powered cheat keyword discovery",
    description=(
        "Accepts a game name and a list of cheat descriptions. "
        "Returns search keyword expansions and aliases. "
        "Does NOT return actual cheat codes or memory addresses."
    ),
)
async def autofind(
    body:    AutofindRequest,
    request: Request,
) -> AutofindResponse:
    _verify_api_key(request)
    _check_rate_limit(_client_ip(request))
    return _process_request(body)


# ---------------------------------------------------------------------------
# Cheat Coder proxy — forwards chat completions to OpenAI
# ---------------------------------------------------------------------------
class CheatCoderRequest(BaseModel):
    model:       str            = "gpt-4o-mini"
    temperature: float          = 0.0
    messages:    List[dict]     = Field(..., min_items=1)


class CheatCoderResponse(BaseModel):
    content: str


@router.post(
    "/cheatcoder",
    response_model=CheatCoderResponse,
    summary="AI cheat code formatter proxy",
    description="Proxies a chat completion request to OpenAI for cheat code formatting.",
)
async def cheatcoder(
    body:    CheatCoderRequest,
    request: Request,
) -> CheatCoderResponse:
    _verify_api_key(request)
    _check_rate_limit(_client_ip(request))

    if not _OPENAI_AVAILABLE or not OPENAI_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI service not configured on server.",
        )

    try:
        client = openai.OpenAI(api_key=OPENAI_API_KEY)
        response = client.chat.completions.create(
            model=body.model,
            messages=body.messages,
            temperature=body.temperature,
            max_tokens=2000,
            timeout=30,
        )
        content = response.choices[0].message.content or ""
        return CheatCoderResponse(content=content)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"AI request failed: {str(exc)[:200]}",
        )
