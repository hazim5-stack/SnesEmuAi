#pragma once
#include <windows.h>
#include <algorithm>
#include <cstdint>
#include <fstream>
#include <string>
#include <sstream>
#include <iomanip>
#include <ctime>
#include "../snes9x.h"
#include "../ppu.h"
#include "SnesEmuAiPaths.h"

/**
 * SNES Emu Ai - Smart Auto-Save (2026)
 * ─────────────────────────────────────────────────────────────────
 * Periodically saves the emulator state without user interaction.
 *
 * Features:
 *  • Configurable interval (1 – 60 minutes, default 5 min)
 *  • Rotates between 2 dedicated auto-save slots (S98, S99)
 *    to avoid overwriting user saves (slots 0-9)
 *  • Writes a timestamped log entry to  autosave.log
 *  • Skips saving when the emulator is paused or stopped
 *  • Emits a brief magenta flash on screen as visual confirmation
 *
 * Usage:
 *   In WinMain / WM_CREATE:
 *     SnesEmuAiAutoSave::GetInstance().Init(GUI.hWnd, 5);
 *
 *   In WM_TIMER handler:
 *     SnesEmuAiAutoSave::GetInstance().OnTimer(wParam);
 *
 *   On ROM load:
 *     SnesEmuAiAutoSave::GetInstance().ResetTimer();
 *
 *   On emulator exit:
 *     SnesEmuAiAutoSave::GetInstance().Shutdown();
 * ─────────────────────────────────────────────────────────────────
 */

class SnesEmuAiAutoSave {
public:
    static SnesEmuAiAutoSave& GetInstance() {
        static SnesEmuAiAutoSave inst;
        return inst;
    }

    static constexpr UINT_PTR TIMER_ID = 9900; // unique WM_TIMER ID
    static constexpr int SLOT_A = 98;           // auto-save slot A
    static constexpr int SLOT_B = 99;           // auto-save slot B

    // ── Call once at startup ──
    void Init(HWND hWnd, int intervalMinutes = 5) {
        m_hWnd      = hWnd;
        m_interval  = std::clamp(intervalMinutes, 1, 60);
        m_currentSlot = SLOT_A;
        m_enabled   = true;
        StartTimer();
    }

    // ── Call from WM_TIMER handler ──
    void OnTimer(UINT_PTR timerId) {
        if (timerId != TIMER_ID) return;
        if (!m_enabled) return;

        TriggerSave();
    }

    // ── Reset timer countdown (e.g. on manual save or ROM load) ──
    void ResetTimer() {
        if (!m_hWnd) return;
        KillTimer(m_hWnd, TIMER_ID);
        StartTimer();
    }

    // ── Enable / disable ──
    void SetEnabled(bool on) {
        m_enabled = on;
        if (!on && m_hWnd)
            KillTimer(m_hWnd, TIMER_ID);
        else if (on && m_hWnd)
            StartTimer();
    }

    // ── Change interval (minutes) and restart timer ──
    void SetInterval(int minutes) {
        m_interval = std::clamp(minutes, 1, 60);
        ResetTimer();
    }

    int  GetInterval() const { return m_interval; }
    bool IsEnabled()   const { return m_enabled;  }

    // ── Call on emulator exit ──
    void Shutdown() {
        if (m_hWnd)
            KillTimer(m_hWnd, TIMER_ID);
        m_hWnd = nullptr;
    }

    // ── Visual confirmation flash (call after save) ──
    void FlashConfirmation() {
        m_flashFrames = 6; // draw for 6 frames
    }

    // ── Called every frame to draw the save flash ──
    void DrawFlash() {
        if (m_flashFrames <= 0) return;
        --m_flashFrames;

        if (!GFX.Screen) return;

        int scrW = (int)IPPU.RenderedScreenWidth;
        int scrH = (int)IPPU.RenderedScreenHeight;
        if (scrW <= 0 || scrH <= 0) return;

        // Draw a 1-pixel green border around the screen
        // Green: RGB555 (0, 31, 0)
        uint16_t green = (0 << 10) | (31 << 5) | 0;

        // Top and bottom rows
        for (int x = 0; x < scrW; x++) {
            GFX.Screen[0 * (int)GFX.RealPPL + x] = green;
            if (scrH > 1)
                GFX.Screen[(scrH - 1) * (int)GFX.RealPPL + x] = green;
        }
        // Left and right columns
        for (int y = 0; y < scrH; y++) {
            GFX.Screen[y * (int)GFX.RealPPL + 0]         = green;
            if (scrW > 1)
                GFX.Screen[y * (int)GFX.RealPPL + (scrW - 1)] = green;
        }
    }

private:
    SnesEmuAiAutoSave()
        : m_hWnd(nullptr), m_interval(5),
          m_currentSlot(SLOT_A), m_enabled(false), m_flashFrames(0) {}

    HWND m_hWnd;
    int  m_interval;
    int  m_currentSlot;
    bool m_enabled;
    int  m_flashFrames;

    void StartTimer() {
        if (!m_hWnd) return;
        // WM_TIMER resolution: we set it in milliseconds
        SetTimer(m_hWnd, TIMER_ID, m_interval * 60 * 1000, nullptr);
    }

    void TriggerSave() {
        // Forward to the Snes9x slot-based freeze mechanism
        extern void FreezeUnfreezeSlot(int slot, bool8 freeze);

        if (Settings.StopEmulation || Settings.Paused) return;

        FreezeUnfreezeSlot(m_currentSlot, true);

        // Alternate between SLOT_A and SLOT_B
        m_currentSlot = (m_currentSlot == SLOT_A) ? SLOT_B : SLOT_A;

        WriteLog();
        FlashConfirmation();
    }

    void WriteLog() const {
        std::string path = SnesEmuAiPaths::LogsDirA() + "\\autosave.log";
        std::ofstream log(path, std::ios::app);
        if (!log) return;
        std::time_t now = std::time(nullptr);
        char tbuf[32];
        std::strftime(tbuf, sizeof(tbuf), "%Y-%m-%d %H:%M:%S", std::localtime(&now));
        log << "[AUTOSAVE] " << tbuf
            << "  slot=" << m_currentSlot
            << "\n";
    }
};
