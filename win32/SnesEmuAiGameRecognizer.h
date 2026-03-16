#pragma once
#include <windows.h>
#include <winhttp.h>
#include <string>
#include <sstream>
#include <iomanip>

#pragma comment(lib, "winhttp.lib")

/**
 * SNES Emu Ai - Game Recognizer (2026)
 * ─────────────────────────────────────────────────────────────────
 * On every ROM load:
 *  1. Reads Memory.ROMCRC32 and Memory.ROMName from the core.
 *  2. Queries https://cheat-index.replit.app/api/rom/<CRC32> for
 *     game metadata (title, region, year, genre).
 *  3. Caches the response in the window title and a local struct.
 *  4. Optionally auto-loads cloud cheats for this game.
 * ─────────────────────────────────────────────────────────────────
 */

struct GameInfo {
    std::string  crc32Hex;       // e.g. "A09BC006"
    std::string  title;          // Official English title
    std::string  region;         // "NTSC-U", "PAL", "NTSC-J"
    std::string  year;           // "1994"
    std::string  genre;          // "RPG", "Action", etc.
    bool         resolved;       // true = fetched from cloud
};

class SnesEmuAiGameRecognizer {
public:
    static SnesEmuAiGameRecognizer& GetInstance() {
        static SnesEmuAiGameRecognizer inst;
        return inst;
    }

    // ── Called from LoadROMPlain() immediately after Memory.LoadROM() succeeds ──
    void OnRomLoaded(uint32_t crc32, const char* romName) {
        m_info = {};
        m_info.crc32Hex  = ToHex(crc32);
        m_info.title     = romName ? romName : "";
        m_info.resolved  = false;

        // Kick off an async cloud lookup (fire-and-forget thread)
        m_crc32 = crc32;
        HANDLE hThread = CreateThread(
            nullptr, 0,
            [](LPVOID pThis) -> DWORD {
                auto* self = static_cast<SnesEmuAiGameRecognizer*>(pThis);
                self->FetchGameInfo();
                return 0;
            },
            this, 0, nullptr);
        if (hThread) CloseHandle(hThread);
    }

    const GameInfo& GetInfo() const { return m_info; }

    // ── Format for display in the main window title bar ──
    std::string GetDisplayTitle() const {
        if (!m_info.resolved || m_info.title.empty()) return m_info.title;
        std::string s = m_info.title;
        if (!m_info.year.empty())   s += "  [" + m_info.year + "]";
        if (!m_info.region.empty()) s += "  " + m_info.region;
        if (!m_info.genre.empty())  s += "  \xe2\x80\xa2  " + m_info.genre;
        return s;
    }

private:
    SnesEmuAiGameRecognizer() {}
    GameInfo m_info;
    uint32_t m_crc32 = 0;

    // ── Convert uint32 to upper-case 8-char hex ──
    static std::string ToHex(uint32_t v) {
        std::ostringstream ss;
        ss << std::uppercase << std::hex << std::setfill('0') << std::setw(8) << v;
        return ss.str();
    }

    // ── WinHTTP synchronous GET (runs on background thread) ──
    std::string HttpGet(const std::string& host, const std::string& path) {
        std::string result;
        HINTERNET hSess = WinHttpOpen(
            L"SnesEmuAi/2026",
            WINHTTP_ACCESS_TYPE_AUTOMATIC_PROXY,
            WINHTTP_NO_PROXY_NAME, WINHTTP_NO_PROXY_BYPASS, 0);
        if (!hSess) return result;

        HINTERNET hConn = WinHttpConnect(
            hSess,
            std::wstring(host.begin(), host.end()).c_str(),
            INTERNET_DEFAULT_HTTPS_PORT, 0);
        if (!hConn) { WinHttpCloseHandle(hSess); return result; }

        HINTERNET hReq = WinHttpOpenRequest(
            hConn, L"GET",
            std::wstring(path.begin(), path.end()).c_str(),
            nullptr, WINHTTP_NO_REFERER,
            WINHTTP_DEFAULT_ACCEPT_TYPES,
            WINHTTP_FLAG_SECURE);
        if (!hReq) { WinHttpCloseHandle(hConn); WinHttpCloseHandle(hSess); return result; }

        // Relax SSL on dev/preview environments
        DWORD flags = SECURITY_FLAG_IGNORE_CERT_DATE_INVALID;
        WinHttpSetOption(hReq, WINHTTP_OPTION_SECURITY_FLAGS, &flags, sizeof(flags));

        if (WinHttpSendRequest(hReq, WINHTTP_NO_ADDITIONAL_HEADERS, 0,
                               WINHTTP_NO_REQUEST_DATA, 0, 0, 0) &&
            WinHttpReceiveResponse(hReq, nullptr)) {
            DWORD bytesAvail = 0;
            while (WinHttpQueryDataAvailable(hReq, &bytesAvail) && bytesAvail > 0) {
                std::string chunk(bytesAvail, '\0');
                DWORD bytesRead = 0;
                WinHttpReadData(hReq, &chunk[0], bytesAvail, &bytesRead);
                result.append(chunk, 0, bytesRead);
            }
        }
        WinHttpCloseHandle(hReq);
        WinHttpCloseHandle(hConn);
        WinHttpCloseHandle(hSess);
        return result;
    }

    // ── Extract a JSON string field  "key":"value" ──
    static std::string JsonField(const std::string& json, const std::string& key) {
        std::string needle = "\"" + key + "\"";
        auto kp = json.find(needle);
        if (kp == std::string::npos) return {};
        auto q1 = json.find('"', kp + needle.size() + 1);
        if (q1 == std::string::npos) return {};
        auto q2 = json.find('"', q1 + 1);
        if (q2 == std::string::npos) return {};
        return json.substr(q1 + 1, q2 - q1 - 1);
    }

    // ── Background lookup ──
    void FetchGameInfo() {
        std::string path = "/api/rom/" + m_info.crc32Hex;
        std::string json = HttpGet("cheat-index.replit.app", path);
        if (json.empty()) return;

        std::string title  = JsonField(json, "title");
        std::string region = JsonField(json, "region");
        std::string year   = JsonField(json, "year");
        std::string genre  = JsonField(json, "genre");

        if (!title.empty())  m_info.title  = title;
        if (!region.empty()) m_info.region = region;
        if (!year.empty())   m_info.year   = year;
        if (!genre.empty())  m_info.genre  = genre;
        m_info.resolved = true;
    }
};
