#pragma once
#include <windows.h>
#include <string>
#include <cstdio>
#include <ctime>
#include "rsrc/resource.h"
#include "SnesEmuAiLibrary.h"

/**
 * SNES Emu Ai - Bridge Architecture
 * This class acts as the mediator between the modern WinUI 3 Frontend 
 * and the legacy Win32 Snes9x Core.
 */

constexpr UINT WM_SNES_EMU_AI_LOAD_ROM = WM_APP + 0x120;

class SnesEmuAiBridge {
public:
    static SnesEmuAiBridge& GetInstance() {
        static SnesEmuAiBridge instance;
        return instance;
    }

    // Initialize the bridge with the main Win32 window handle
    void Initialize(HWND hMainWnd) {
        m_hMainWnd = hMainWnd;
    }

    // Execute a legacy command by ID (from resource.h)
    void ExecuteCommand(int commandId) {
        if (m_hMainWnd && IsWindow(m_hMainWnd)) {
            PostMessage(m_hMainWnd, WM_COMMAND, MAKEWPARAM(commandId, 0), 0);
        }
    }

    // Load a ROM file via the core engine.
    // This posts a dedicated message handled in wsnes9x.cpp.
    void LoadROM(const std::wstring& filePath) {
        SnesEmuAiLibrary::GetInstance().AddToRecent(filePath);
        if (!m_hMainWnd || !IsWindow(m_hMainWnd)) {
            LogBackendIssue("LoadROM dropped: main window is unavailable.");
            return;
        }

        std::wstring* payload = new std::wstring(filePath);
        if (!PostMessage(m_hMainWnd, WM_SNES_EMU_AI_LOAD_ROM, 0, reinterpret_cast<LPARAM>(payload))) {
            delete payload;
            LogBackendIssue("LoadROM failed to dispatch WM_SNES_EMU_AI_LOAD_ROM.");
        }
    }

    // Home quick action: launch last played ROM and try loading OOPS state.
    void ContinueLastPlayed() { ExecuteCommand(ID_SNES_API_CONTINUE_LAST_GAME); }

    // Play screen actions mapped to backend commands.
    void QuickSave() { ExecuteCommand(ID_SNES_API_QUICKSAVE); }
    void QuickLoad() { ExecuteCommand(ID_SNES_API_QUICKLOAD); }
    void ToggleFullscreen() { ExecuteCommand(ID_WINDOW_FULLSCREEN); }
    void CaptureScreenshot() { ExecuteCommand(ID_SAVESCREENSHOT); }
    void ToggleCheats() { ExecuteCommand(ID_CHEAT_APPLY); }
    void OpenCheatEditor() { ExecuteCommand(ID_CHEAT_ENTER); }
    void OpenCheatSearch() { ExecuteCommand(ID_CHEAT_SEARCH); }

    // Settings pages in new UI mapped to existing dialogs.
    void OpenGraphicsSettings() { ExecuteCommand(ID_OPTIONS_DISPLAY); }
    void OpenControlsSettings() { ExecuteCommand(ID_OPTIONS_JOYPAD); }
    void OpenAudioSettings() { ExecuteCommand(ID_SOUND_OPTIONS); }
    void OpenGeneralSettings() { ExecuteCommand(ID_OPTIONS_SETTINGS); }
    void OpenEmulatorSettings() { ExecuteCommand(ID_OPTIONS_SETTINGS); }

    // New UI settings apply actions are mapped to the nearest native settings dialogs.
    // This keeps the feature active instead of silently skipping it.
    void ApplyGraphicsSettingsFromNewUI() { OpenGraphicsSettings(); }
    void ApplyControlsSettingsFromNewUI() { OpenControlsSettings(); }
    void ApplyAudioSettingsFromNewUI() { OpenAudioSettings(); }

    // Legacy tools: request an API summary from backend internals.
    void OpenLegacyToolsInfo() { ExecuteCommand(ID_SNES_API_LEGACY_TOOLS_INFO); }

    // Removed features without backend implementation.
    void OpenAIAssistantRemoved() { LogBackendIssue("AI Assistant removed: no backend implementation."); }
    void EditScreenshotRemoved() { LogBackendIssue("Screenshot edit removed: no backend implementation."); }

    // Backward-compatible wrappers for older callers.
    void SetGraphicsFromNewUIUnsupported() { ApplyGraphicsSettingsFromNewUI(); }
    void SetControlsFromNewUIUnsupported() { ApplyControlsSettingsFromNewUI(); }

    HWND GetMainHWND() const { return m_hMainWnd; }

private:
    SnesEmuAiBridge() : m_hMainWnd(NULL) {}
    HWND m_hMainWnd;

    void LogBackendIssue(const char* message) {
        FILE* fs = fopen("SnesEmuAi.log", "a");
        if (!fs) {
            return;
        }

        std::time_t now = std::time(nullptr);
        std::tm t;
#ifdef _WIN32
        localtime_s(&t, &now);
#else
        t = *std::localtime(&now);
#endif
        char stamp[64] = {0};
        std::strftime(stamp, sizeof(stamp), "%Y-%m-%d %H:%M:%S", &t);
        fprintf(fs, "[%s] [Bridge] %s\n", stamp, message);
        fclose(fs);
    }

    // Delete copy/assignment
    SnesEmuAiBridge(const SnesEmuAiBridge&) = delete;
    SnesEmuAiBridge& operator=(const SnesEmuAiBridge&) = delete;
};
