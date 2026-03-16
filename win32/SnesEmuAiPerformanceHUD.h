#pragma once
#include <windows.h>
#include <cstdint>
#include <cstdio>
#include <string>
#include <deque>
#include "../ppu.h"

/**
 * SNES Emu Ai - Performance HUD (2026)
 * ─────────────────────────────────────────────────────────────────
 * Draws a non-intrusive HUD overlay directly onto GFX.Screen:
 *   ┌──────────────────────────────┐
 *   │  FPS: 59.94  SPD: 100%  CPU │
 *   └──────────────────────────────┘
 *
 * The font is a minimal 4×5 pixel bitmap stored inline (no assets).
 * Toggle visibility with SnesEmuAiPerformanceHUD::ToggleVisible().
 * ─────────────────────────────────────────────────────────────────
 * Usage (in wsnes9x.cpp after S9xMainLoop()):
 *   SnesEmuAiPerformanceHUD::GetInstance().OnFrame();
 * ─────────────────────────────────────────────────────────────────
 */

class SnesEmuAiPerformanceHUD {
public:
    static SnesEmuAiPerformanceHUD& GetInstance() {
        static SnesEmuAiPerformanceHUD inst;
        return inst;
    }

    // ── Called every emulated frame ──
    void OnFrame() {
        if (!m_visible) return;

        DWORD now = timeGetTime();
        m_frameTimes.push_back(now);
        // Keep only last 60 frames in the window
        while (m_frameTimes.size() > 60)
            m_frameTimes.pop_front();

        // Calculate FPS every 30 frames to reduce overhead
        m_framesSinceCalc++;
        if (m_framesSinceCalc >= 30) {
            m_framesSinceCalc = 0;
            if (m_frameTimes.size() >= 2) {
                DWORD elapsed = m_frameTimes.back() - m_frameTimes.front();
                if (elapsed > 0)
                    m_lastFPS = (float)(m_frameTimes.size() - 1) * 1000.0f / elapsed;
            }
        }

        // Draw every frame even if FPS calc didn't update
        DrawHUD();
    }

    void ToggleVisible() { m_visible = !m_visible; }
    bool IsVisible()     const { return m_visible; }
    float GetFPS()       const { return m_lastFPS; }

    // ── Allow external update of speed percentage (optional) ──
    void SetSpeedPercent(int pct) { m_speedPct = pct; }

private:
    SnesEmuAiPerformanceHUD()
        : m_visible(false), m_lastFPS(0.0f), m_framesSinceCalc(0), m_speedPct(100) {}

    bool  m_visible;
    float m_lastFPS;
    int   m_framesSinceCalc;
    int   m_speedPct;
    std::deque<DWORD> m_frameTimes;

    // ─── Minimal 4×5 pixel font (ASCII 32..90) ───────────────────
    // Each char = 5 rows × 4 cols, stored as 5 nibbles (1 byte each row, lower 4 bits)
    // Chars stored starting at ASCII 48 ('0') to ASCII 90 ('Z')
    static const uint8_t FONT_COLS = 4;
    static const uint8_t FONT_ROWS = 5;

    // Font bitmap: index 0 = '0', covers '0'-'9', 'A'-'Z', '.', ':', '%', ' '
    // Each entry: 5 rows, each row is a 4-bit mask (bit3=leftmost pixel)
    static const uint8_t s_font[][FONT_ROWS]; // defined below

    // Map a character to font index
    static int FontIdx(char c) {
        if (c >= '0' && c <= '9') return c - '0';
        if (c >= 'A' && c <= 'Z') return 10 + (c - 'A');
        if (c >= 'a' && c <= 'z') return 10 + (c - 'a'); // same as uppercase
        if (c == '.') return 36;
        if (c == ':') return 37;
        if (c == '%') return 38;
        if (c == '/') return 39;
        return -1; // space / unknown → blank
    }

    // ─── Draw one character onto GFX.Screen at pixel (px,py) ─────
    void DrawChar(uint16_t* screen, int ppl, int scrW, int scrH,
                  int px, int py, char c, uint16_t color) const {
        int idx = FontIdx(c);
        if (idx < 0) return;
        const uint8_t* glyph = s_font[idx];
        for (int row = 0; row < FONT_ROWS; row++) {
            int y = py + row;
            if (y < 0 || y >= scrH) continue;
            for (int col = 0; col < FONT_COLS; col++) {
                int x = px + col;
                if (x < 0 || x >= scrW) continue;
                if (glyph[row] & (0x8 >> col))
                    screen[y * ppl + x] = color;
            }
        }
    }

    // ─── Draw text string ──────────────────────────────────────────
    void DrawText(uint16_t* screen, int ppl, int scrW, int scrH,
                  int x, int y, const std::string& text, uint16_t color) const {
        int cx = x;
        for (char c : text) {
            DrawChar(screen, ppl, scrW, scrH, cx, y, c, color);
            cx += FONT_COLS + 1; // 1 pixel gap between chars
        }
    }

    // ─── Fill a rectangle with a semi-dark overlay (darken pixels) ─
    void FillRect(uint16_t* screen, int ppl, int scrW, int scrH,
                  int x, int y, int w, int h) const {
        for (int row = y; row < y + h; row++) {
            if (row < 0 || row >= scrH) continue;
            for (int col = x; col < x + w; col++) {
                if (col < 0 || col >= scrW) continue;
                // Halve each channel → dark overlay
                uint16_t p = screen[row * ppl + col];
#if defined(RGB565)
                screen[row * ppl + col] = ((p >> 1) & 0x7BEF);
#else
                screen[row * ppl + col] = ((p >> 1) & 0x3DEF);
#endif
            }
        }
    }

    // ─── Main draw routine ─────────────────────────────────────────
    void DrawHUD() {
        if (!GFX.Screen) return;
        int scrW = (int)IPPU.RenderedScreenWidth;
        int scrH = (int)IPPU.RenderedScreenHeight;
        if (scrW <= 0 || scrH <= 0) return;

        // Build the HUD string
        char buf[64];
        int fps  = (int)(m_lastFPS + 0.5f);
        int frac = (int)((m_lastFPS - (float)(fps > 0 ? fps : 0)) * 10.0f + 0.5f) % 10;
        // Format:  FPS:59.9  SPD:100%
        snprintf(buf, sizeof(buf), "FPS:%d.%d  SPD:%d%%", fps, frac, m_speedPct);
        std::string text(buf);

        int textW = (int)text.size() * (FONT_COLS + 1);
        int textH = FONT_ROWS;

        // Position: top-right corner with 4-pixel margin
        int x = scrW - textW - 4;
        int y = 3;

        // Background darken box
        FillRect(GFX.Screen, (int)GFX.RealPPL, scrW, scrH,
                 x - 2, y - 1, textW + 4, textH + 2);

        // White text  BUILD_PIXEL(31,31,31) ≈ white in RGB555
        uint16_t white = (31 << 10) | (31 << 5) | 31;
        DrawText(GFX.Screen, (int)GFX.RealPPL, scrW, scrH, x, y, text, white);
    }
};

// ─── 4×5 font bitmap ─────────────────────────────────────────────────────────
// Row order: top→bottom; bit3 = left pixel
//            '0'-'9' indices 0-9
//            'A'-'Z' indices 10-35
//            '.'=36, ':'=37, '%'=38, '/'=39
inline const uint8_t SnesEmuAiPerformanceHUD::s_font[][FONT_ROWS] = {
    // 0
    {0b0110, 0b1001, 0b1001, 0b1001, 0b0110},
    // 1
    {0b0010, 0b0110, 0b0010, 0b0010, 0b0111},
    // 2
    {0b0110, 0b1001, 0b0010, 0b0100, 0b1111},
    // 3
    {0b1110, 0b0001, 0b0110, 0b0001, 0b1110},
    // 4
    {0b1001, 0b1001, 0b1111, 0b0001, 0b0001},
    // 5
    {0b1111, 0b1000, 0b1110, 0b0001, 0b1110},
    // 6
    {0b0110, 0b1000, 0b1110, 0b1001, 0b0110},
    // 7
    {0b1111, 0b0001, 0b0010, 0b0100, 0b0100},
    // 8
    {0b0110, 0b1001, 0b0110, 0b1001, 0b0110},
    // 9
    {0b0110, 0b1001, 0b0111, 0b0001, 0b0110},
    // A (10)
    {0b0110, 0b1001, 0b1111, 0b1001, 0b1001},
    // B (11)
    {0b1110, 0b1001, 0b1110, 0b1001, 0b1110},
    // C (12)
    {0b0110, 0b1000, 0b1000, 0b1000, 0b0110},
    // D (13)
    {0b1110, 0b1001, 0b1001, 0b1001, 0b1110},
    // E (14)
    {0b1111, 0b1000, 0b1110, 0b1000, 0b1111},
    // F (15)
    {0b1111, 0b1000, 0b1110, 0b1000, 0b1000},
    // G (16)
    {0b0110, 0b1000, 0b1011, 0b1001, 0b0110},
    // H (17)
    {0b1001, 0b1001, 0b1111, 0b1001, 0b1001},
    // I (18)
    {0b1110, 0b0100, 0b0100, 0b0100, 0b1110},
    // J (19)
    {0b0001, 0b0001, 0b0001, 0b1001, 0b0110},
    // K (20)
    {0b1001, 0b1010, 0b1100, 0b1010, 0b1001},
    // L (21)
    {0b1000, 0b1000, 0b1000, 0b1000, 0b1111},
    // M (22)
    {0b1001, 0b1111, 0b1111, 0b1001, 0b1001},
    // N (23)
    {0b1001, 0b1101, 0b1011, 0b1001, 0b1001},
    // O (24)
    {0b0110, 0b1001, 0b1001, 0b1001, 0b0110},
    // P (25)
    {0b1110, 0b1001, 0b1110, 0b1000, 0b1000},
    // Q (26)
    {0b0110, 0b1001, 0b1001, 0b1011, 0b0111},
    // R (27)
    {0b1110, 0b1001, 0b1110, 0b1010, 0b1001},
    // S (28)
    {0b0110, 0b1000, 0b0110, 0b0001, 0b1110},
    // T (29)
    {0b1111, 0b0100, 0b0100, 0b0100, 0b0100},
    // U (30)
    {0b1001, 0b1001, 0b1001, 0b1001, 0b0110},
    // V (31)
    {0b1001, 0b1001, 0b1001, 0b0110, 0b0110},
    // W (32)
    {0b1001, 0b1001, 0b1111, 0b1111, 0b1001},
    // X (33)
    {0b1001, 0b0110, 0b0110, 0b0110, 0b1001},
    // Y (34)
    {0b1001, 0b0110, 0b0100, 0b0100, 0b0100},
    // Z (35)
    {0b1111, 0b0001, 0b0110, 0b1000, 0b1111},
    // . (36)
    {0b0000, 0b0000, 0b0000, 0b0000, 0b0100},
    // : (37)
    {0b0000, 0b0100, 0b0000, 0b0100, 0b0000},
    // % (38)
    {0b1001, 0b0010, 0b0100, 0b1001, 0b0000},
    // / (39)
    {0b0001, 0b0010, 0b0100, 0b1000, 0b0000},
};
