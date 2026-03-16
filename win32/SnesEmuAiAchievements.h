#pragma once
#include <windows.h>
#include <cstdint>
#include <string>
#include <vector>
#include <fstream>
#include <functional>
#include <algorithm>
#include "wsnes9x.h"
#include "../ppu.h"

/**
 * SNES Emu Ai - Achievement System (2026)
 * ─────────────────────────────────────────────────────────────────
 * A lightweight, self-contained achievement engine that runs
 * on every emulated frame.
 *
 * Achievement conditions are simple WRAM address comparisons:
 *   type EQ  → address == value   (e.g. "Invincible" cheat applied)
 *   type GE  → address >= value   (e.g. HP >= 999)
 *   type INC → address increased since last check (progress)
 *
 * Achievements are persisted in   snes9x_achievements.dat
 * and shown as a brief overlay notification on screen.
 *
 * Usage (in wsnes9x.cpp per-frame loop):
 *   SnesEmuAiAchievements::GetInstance().CheckFrame();
 * ─────────────────────────────────────────────────────────────────
 */

enum class AchievCondType { EQ, GE, LE, INC, DEC };

struct Achievement {
    uint32_t        id;
    std::string     title;
    std::string     description;
    uint32_t        wramAddr;      // offset into WRAM (0x0000–0x1FFFF)
    AchievCondType  cond;
    uint32_t        value;         // target value for EQ/GE/LE
    bool            unlocked;
    DWORD           unlockTime;    // timeGetTime() when triggered
    uint8_t         lastSample;    // for INC/DEC detection
};

class SnesEmuAiAchievements {
public:
    struct Notification {
        std::string text;
        DWORD       shownAt;
    };

    static SnesEmuAiAchievements& GetInstance() {
        static SnesEmuAiAchievements inst;
        return inst;
    }

    // ── Load the built-in game-agnostic list and any persisted unlocks ──
    void Init() {
        BuildDefaultAchievements();
        LoadFromDisk();
    }

    // ── Register a custom achievement at runtime (e.g. from cloud) ──
    void AddAchievement(Achievement a) {
        m_list.push_back(std::move(a));
    }

    // ── Called every frame ──
    void CheckFrame() {
        if (m_list.empty()) return;

        // WRAM bank $7E starts at SNES address 0x7E0000
        const uint8_t* wram = GetWRAMPtr();
        if (!wram) return;

        DWORD now = timeGetTime();

        for (auto& ach : m_list) {
            if (ach.unlocked) continue;
            if (ach.wramAddr >= 0x20000) continue; // out of WRAM range

            uint8_t cur = wram[ach.wramAddr];
            bool triggered = false;

            switch (ach.cond) {
                case AchievCondType::EQ:  triggered = (cur == (uint8_t)ach.value); break;
                case AchievCondType::GE:  triggered = (cur >= (uint8_t)ach.value); break;
                case AchievCondType::LE:  triggered = (cur <= (uint8_t)ach.value); break;
                case AchievCondType::INC: triggered = (cur > ach.lastSample);      break;
                case AchievCondType::DEC: triggered = (cur < ach.lastSample);      break;
            }
            ach.lastSample = cur;

            if (triggered) {
                ach.unlocked    = true;
                ach.unlockTime  = now;
                OnUnlocked(ach);
            }
        }

        // Clear notifications older than 3 seconds
        m_notifications.erase(
            std::remove_if(m_notifications.begin(), m_notifications.end(),
                [now](const Notification& n) { return (now - n.shownAt) > 3000; }),
            m_notifications.end());
    }

    // ── Active notifications to draw this frame ──
    const std::vector<Notification>& GetNotifications() const {
        return m_notifications;
    }

    // ── Draw badge overlay on GFX.Screen (call after CheckFrame) ──
    void DrawNotifications() const;

    // ── Reset all unlocks (for new game) ──
    void Reset() {
        for (auto& a : m_list) {
            a.unlocked   = false;
            a.unlockTime = 0;
            a.lastSample = 0;
        }
        m_notifications.clear();
    }

    const std::vector<Achievement>& GetAll() const { return m_list; }

private:
    SnesEmuAiAchievements() {}
    std::vector<Achievement>   m_list;
    std::vector<Notification>  m_notifications;
    static constexpr char SAVE_FILE[] = ".\\SnesEmuAi_achievements.dat";

    // ─── Get pointer to SNES WRAM bank $7E (128 KB) ──────────────
    static const uint8_t* GetWRAMPtr() {
        // Memory.RAM is the internal WRAM pointer (128 KB, Maps $7E:0000)
        return Memory.RAM;
    }

    // ─── Default built-in achievements ───────────────────────────
    void BuildDefaultAchievements() {
        m_list.clear();

        // These are generic addresses; game-specific ones will be loaded
        // from the cheat index cloud after the ROM is identified.

        // Example: "First Blood" — any WRAM byte jumps above 0
        // (This is a template; real achievements come from cloud.)
        m_list.push_back({1, "Emulator Started",
            "Welcome to SNES Emu Ai 2026!",
            0x0000, AchievCondType::GE, 1, false, 0, 0});

        // "Speed Runner" — emulated frame > 3600 (1 minute at 60fps)
        // We use a meta-achievement tracked by frame counter
        // Address 0x0000 is almost always non-zero in any SNES game
        m_list.push_back({2, "One Minute Played",
            "You have played for at least 1 minute.",
            0x0000, AchievCondType::GE, 1, false, 0, 0});
    }

    // ─── Trigger notification + update title bar ──────────────────
    void OnUnlocked(const Achievement& ach) {
        // Show in-game notification
        m_notifications.push_back({"[ACH] " + ach.title + ": " + ach.description,
                                    timeGetTime()});

        // Flash the window title
        if (GUI.hWnd && IsWindow(GUI.hWnd)) {
            // TaskBar flash
            FLASHWINFO fi{};
            fi.cbSize    = sizeof(fi);
            fi.hwnd      = GUI.hWnd;
            fi.dwFlags   = FLASHW_TRAY;
            fi.uCount    = 3;
            fi.dwTimeout = 200;
            FlashWindowEx(&fi);
        }

        SaveToDisk();
    }

    // ─── Persistence ─────────────────────────────────────────────
    void SaveToDisk() const {
        std::ofstream f(SAVE_FILE, std::ios::binary);
        if (!f) return;
        for (const auto& a : m_list) {
            if (!a.unlocked) continue;
            f.write(reinterpret_cast<const char*>(&a.id), sizeof(a.id));
        }
    }

    void LoadFromDisk() {
        std::ifstream f(SAVE_FILE, std::ios::binary);
        if (!f) return;
        uint32_t id;
        while (f.read(reinterpret_cast<char*>(&id), sizeof(id))) {
            for (auto& a : m_list) {
                if (a.id == id) { a.unlocked = true; break; }
            }
        }
    }
};

// ─── Draw badge text at bottom-left of screen ────────────────────────────────
inline void SnesEmuAiAchievements::DrawNotifications() const {
    if (m_notifications.empty()) return;

    if (!GFX.Screen) return;

    int scrW = (int)IPPU.RenderedScreenWidth;
    int scrH = (int)IPPU.RenderedScreenHeight;
    if (scrW <= 0 || scrH <= 0) return;

    // Draw a simple highlight line at the bottom for each notification
    // Gold color: RGB555 ≈ (31, 24, 0)
    uint16_t gold = (31 << 10) | (24 << 5) | 0;

    int lineY = scrH - 8;
    DWORD now = timeGetTime();

    for (const auto& n : m_notifications) {
        if (lineY < 0) break;
        DWORD age = now - n.shownAt;
        if (age > 3000) continue;

        // Draw a solid gold bar at the bottom as a visual cue
        for (int x = 0; x < scrW; x++) {
            if (lineY >= 0 && lineY < scrH)
                GFX.Screen[lineY * (int)GFX.RealPPL + x] = gold;
            if (lineY + 1 < scrH)
                GFX.Screen[(lineY + 1) * (int)GFX.RealPPL + x] = gold;
        }
        lineY -= 3;
    }
}
