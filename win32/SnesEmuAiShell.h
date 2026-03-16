#pragma once
#include <windows.h>
#include <dwmapi.h>
#include "SnesEmuAiBridge.h"

#pragma comment(lib, "dwmapi.lib")

/**
 * SNES Emu Ai - Modern Shell Controller
 * Manages the transition of the legacy window to a Windows 11 Fluent container.
 */

class SnesEmuAiShell {
public:
    static SnesEmuAiShell& GetInstance() {
        static SnesEmuAiShell instance;
        return instance;
    }

    // Modern Windows DWM Attributes
    #define DWMWA_WINDOW_CORNER_PREFERENCE 33
    #define DWMWA_USE_IMMERSIVE_DARK_MODE 20
    #define DWMWA_SYSTEM_BACKDROP_TYPE 38

    typedef enum {
        DWMWCP_DEFAULT = 0,
        DWMWCP_DONOTROUND = 1,
        DWMWCP_ROUND = 2,
        DWMWCP_ROUNDSMALL = 3
    } DWM_WINDOW_CORNER_PREFERENCE;

    // Apply Windows 11 effects (Rounded Corners & Dark Mode)
    void ApplyWin11Effects(HWND hWnd) {
        // Enforce rounded corners (Windows 11)
        DWM_WINDOW_CORNER_PREFERENCE cornerPreference = DWMWCP_ROUND;
        DwmSetWindowAttribute(hWnd, DWMWA_WINDOW_CORNER_PREFERENCE, &cornerPreference, sizeof(cornerPreference));

        // Enable Immersive Dark Mode for title bar
        BOOL darkMode = TRUE;
        DwmSetWindowAttribute(hWnd, DWMWA_USE_IMMERSIVE_DARK_MODE, &darkMode, sizeof(darkMode));
    }

    // Toggle between modern shell and classic menu
    void SetLayoutMode(bool modern) {
        // Layout mode switching removed - single interface only
    }

    bool IsDevMode() {
        // Read configuration to check for DevMode=1
        TCHAR szDevMode[10] = {0};
        GetPrivateProfileString(TEXT("Config"), TEXT("DevMode"), TEXT("0"), szDevMode, 10, TEXT(".\\SnesEmuAi.conf"));
        return (_tcscmp(szDevMode, TEXT("1")) == 0);
    }

private:
    SnesEmuAiShell() {}
};
