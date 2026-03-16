#pragma once
#include <windows.h>
#include <wininet.h>
#include <string>
#include <vector>
#include <iostream>

#pragma comment(lib, "wininet.lib")

/**
 * SNES Emu Ai - Cheat Index Cloud Connector
 * Connects to https://cheat-index.replit.app/ to fetch cloud cheats.
 */

class SnesEmuAiCheatCloud {
public:
    static SnesEmuAiCheatCloud& GetInstance() {
        static SnesEmuAiCheatCloud instance;
        return instance;
    }

    // Initialize with API Key and Base URL
    void SetConfig(const std::string& apiKey, const std::string& baseUrl) {
        m_apiKey = apiKey;
        m_baseUrl = baseUrl;
    }

    // Fetch cheats for a specific game by CRC32
    std::string FetchCheats(const std::string& crc32) {
        std::string url = m_baseUrl + "/api/cheats/" + crc32;
        return HttpGet(url);
    }

    // Test connection to the Cheat Index API
    bool TestConnection() {
        std::string response = HttpGet(m_baseUrl + "/api/status");
        return !response.empty();
    }

private:
    SnesEmuAiCheatCloud() : m_baseUrl("https://cheat-index.replit.app") {
        const char *env_key = getenv("CHEATINDEX_API_KEY");
        if (env_key && *env_key) m_apiKey = env_key;
    }

    std::string HttpGet(const std::string& url) {
        std::string response;
        HINTERNET hInternet = InternetOpenA("SNES Emu Ai", INTERNET_OPEN_TYPE_DIRECT, NULL, NULL, 0);
        if (hInternet) {
            HINTERNET hConnect = InternetOpenUrlA(hInternet, url.c_str(), NULL, 0, INTERNET_FLAG_RELOAD, 0);
            if (hConnect) {
                char buffer[4096];
                DWORD bytesRead;
                while (InternetReadFile(hConnect, buffer, sizeof(buffer), &bytesRead) && bytesRead > 0) {
                    response.append(buffer, bytesRead);
                }
                InternetCloseHandle(hConnect);
            }
            InternetCloseHandle(hInternet);
        }
        return response;
    }

    std::string m_apiKey;
    std::string m_baseUrl;
};
