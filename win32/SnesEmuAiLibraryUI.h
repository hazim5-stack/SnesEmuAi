#pragma once
#include <windows.h>
#include <vector>
#include <string>
#include "SnesEmuAiLibrary.h"
#include "SnesEmuAiBridge.h"

/**
 * SNES Emu Ai - Modern Library UI Controller
 * Maps the game collection to a visual grid structure.
 */

class SnesEmuAiLibraryUI {
public:
    static SnesEmuAiLibraryUI& GetInstance() {
        static SnesEmuAiLibraryUI instance;
        return instance;
    }

    // Render the Sidebar/Navigation Menu
    // Note: In Phase 3.2, these will be mapped to the actual modern UI rendering loop
    void RenderSidebar() {
        // [Library Icons]
        // [Recent Games]
        // [Controllers]
        // [Settings Hub]
    }

    // Render the Games Grid
    void RenderGamesGrid() {
        const auto& games = SnesEmuAiLibrary::GetInstance().GetGames();
        
        for (const auto& game : games) {
            // Logic to display a Card with:
            // 1. BoxArt (from game.boxArtPath)
            // 2. Title (from game.gameTitle)
            // 3. Click Handler -> SnesEmuAiBridge::GetInstance().LoadROM(game.fullPath);
        }
    }

    // Search Filter
    void SetSearchFilter(const std::wstring& query) {
        m_searchQuery = query;
        // Logic to filter the games vector in real-time
    }

private:
    SnesEmuAiLibraryUI() {}
    std::wstring m_searchQuery;
};
