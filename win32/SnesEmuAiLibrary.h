#pragma once
#include <windows.h>
#include <tchar.h>
#include <string>
#include <vector>
#include <filesystem>
#include <map>
#include "SnesEmuAiScraper.h"

namespace fs = std::filesystem;

/**
 * SNES Emu Ai - Game Library Engine
 * Responsible for scanning ROM directories, extracting metadata, 
 * and managing the modern library view state.
 */

struct GameEntry {
    std::wstring fileName;
    std::wstring fullPath;
    std::wstring gameTitle;
    std::wstring internalHeaderName;
    std::string crc32;
    std::wstring boxArtPath; // Path to cached/downloaded thumbnail
};

class SnesEmuAiLibrary {
public:
    static SnesEmuAiLibrary& GetInstance() {
        static SnesEmuAiLibrary instance;
        return instance;
    }

    // Scan a directory for SNES ROMs (.smc, .sfc, .zip, .jma)
    void ScanDirectory(const std::wstring& directoryPath) {
        m_games.clear();
        try {
            for (const auto& entry : fs::directory_iterator(directoryPath)) {
                if (entry.is_regular_file()) {
                    std::wstring ext = entry.path().extension().wstring();
                    // Lowercase extension check
                    for (auto& c : ext) c = std::tolower(c);

                    if (ext == L".smc" || ext == L".sfc" || ext == L".zip" || ext == L".jma") {
                        GameEntry game;
                        game.fileName = entry.path().filename().wstring();
                        game.fullPath = entry.path().wstring();
                        game.gameTitle = entry.path().stem().wstring(); // Default to filename
                        
                        // New: Scrape BoxArt URL based on standard Retro naming (No-Intro style)
                        game.boxArtPath = SnesEmuAiScraper::GetInstance().GetBoxArtUrl(game.gameTitle);
                        
                        m_games.push_back(game);
                    }
                }
            }
        } catch (...) {
            // Handle directory access errors
        }
    }

    const std::vector<GameEntry>& GetGames() const { return m_games; }

    // Add game to recent history and persist to config
    void AddToRecent(const std::wstring& fullPath) {
        auto it = std::find(m_recentPaths.begin(), m_recentPaths.end(), fullPath);
        if (it != m_recentPaths.end()) m_recentPaths.erase(it);
        
        m_recentPaths.insert(m_recentPaths.begin(), fullPath);
        if (m_recentPaths.size() > 10) m_recentPaths.pop_back();

        SaveRecentHistory();
    }

    const std::vector<std::wstring>& GetRecentPaths() const { return m_recentPaths; }

    void LoadRecentHistory() {
        const TCHAR* confPath = GetConfPath();
        for (int i = 0; i < 10; i++) {
            TCHAR key[20]; _stprintf_s(key, TEXT("Recent%d"), i);
            TCHAR path[MAX_PATH];
            GetPrivateProfileString(TEXT("RecentGames"), key, TEXT(""), path, MAX_PATH, confPath);
            if (_tcslen(path) > 0) m_recentPaths.push_back(path);
        }
    }

    void SaveRecentHistory() {
        const TCHAR* confPath = GetConfPath();
        for (int i = 0; i < (int)m_recentPaths.size(); i++) {
            TCHAR key[20]; _stprintf_s(key, TEXT("Recent%d"), i);
            WritePrivateProfileString(TEXT("RecentGames"), key, m_recentPaths[i].c_str(), confPath);
        }
    }

private:
    SnesEmuAiLibrary() { LoadRecentHistory(); }
    std::vector<GameEntry> m_games;
    std::vector<std::wstring> m_recentPaths;
    std::wstring m_appDataPath;

    static const TCHAR* GetConfPath() {
        static TCHAR confPath[MAX_PATH] = {0};
        if (!confPath[0]) {
            TCHAR appData[MAX_PATH]{};
            GetEnvironmentVariable(TEXT("APPDATA"), appData, MAX_PATH);
            TCHAR parent[MAX_PATH]{};
            _sntprintf(parent, MAX_PATH, TEXT("%s\\SnesEmuAi"), appData);
            parent[MAX_PATH - 1] = TEXT('\0');
            CreateDirectory(parent, NULL);
            _sntprintf(confPath, MAX_PATH, TEXT("%s\\SnesEmuAi.conf"), parent);
            confPath[MAX_PATH - 1] = TEXT('\0');
        }
        return confPath;
    }
};
