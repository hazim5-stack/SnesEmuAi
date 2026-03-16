#pragma once
#include <windows.h>
#include <string>
#include <vector>
#include <filesystem>
#include <algorithm>
#include <sstream>
#include <iomanip>

namespace fs = std::filesystem;

/**
 * SNES Emu Ai - BoxArt Scraper Engine
 * Implements the Libretro-style thumbnail resolution logic.
 */

class SnesEmuAiScraper {
public:
    static SnesEmuAiScraper& GetInstance() {
        static SnesEmuAiScraper instance;
        return instance;
    }

    // Sanitize a game title for Libretro thumbnail URL compatibility
    // Rule: Replace & * / : < > ? \ | with _
    std::wstring SanitizeTitle(const std::wstring& title) {
        std::wstring sanitized = title;
        const std::wstring illegalChars = L"&* /:<>?\\|";
        
        for (auto& c : sanitized) {
            if (illegalChars.find(c) != std::wstring::npos) {
                c = L'_';
            }
        }
        return sanitized;
    }

    // Construct the Libretro thumbnail URL for a given game title
    std::wstring GetBoxArtUrl(const std::wstring& gameTitle) {
        std::wstring sanitized = SanitizeTitle(gameTitle);
        
        // URL Encoding (Basic Space-to-%20 for the system name part)
        std::wstring baseUrl = L"https://thumbnails.libretro.com/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/Named_Boxarts/";
        
        // Final Path Construction
        return baseUrl + sanitized + L".png";
    }

    // Calculate CRC32 for a file (Placeholder for Phase 3.3)
    // This will be used to match against the No-Intro database
    uint32_t CalculateCRC32(const std::wstring& filePath) {
        // Implementation will use Snes9x's internal CRC32 logic
        return 0; 
    }

private:
    SnesEmuAiScraper() {}
};
