#pragma once
/*  SnesEmuAiPaths.h — centralised per-user directory helpers
 *  ──────────────────────────────────────────────────────────
 *  Layout:
 *    %AppData%\SnesEmuAi          config, cheats, patches, BIOS, shaders
 *    %LocalAppData%\SnesEmuAi     saves, savestates, screenshots, logs,
 *                                 SPCs, movies, SatData, cache
 *    Documents\SnesEmuAi\Roms     ROM browser default
 *
 *  Every getter auto-creates the folder on first call.
 */

#include <windows.h>
#include <shlobj.h>           // SHGetFolderPathW
#include <shlwapi.h>          // PathAppendW
#include <string>

#pragma comment(lib, "shlwapi.lib")

namespace SnesEmuAiPaths {

// ── internal helpers ────────────────────────────────────────────
inline std::wstring GetShellFolder(int csidl)
{
    wchar_t buf[MAX_PATH]{};
    SHGetFolderPathW(NULL, csidl | CSIDL_FLAG_CREATE, NULL, 0, buf);
    return buf;
}

inline void EnsureDir(const std::wstring& dir)
{
    // Create nested directories; ignore ERROR_ALREADY_EXISTS
    CreateDirectoryW(dir.c_str(), NULL);
}

inline std::wstring MakeSub(int csidl, const wchar_t* sub)
{
    std::wstring base = GetShellFolder(csidl);
    base += L"\\SnesEmuAi";
    EnsureDir(base);
    if (sub && sub[0]) {
        base += L"\\";
        base += sub;
        EnsureDir(base);
    }
    return base;
}

// ── Roaming  (%AppData%\SnesEmuAi) ─────────────────────────────
inline std::wstring Roaming(const wchar_t* sub = L"")
{   return MakeSub(CSIDL_APPDATA, sub); }

// ── Local  (%LocalAppData%\SnesEmuAi) ──────────────────────────
inline std::wstring Local(const wchar_t* sub = L"")
{   return MakeSub(CSIDL_LOCAL_APPDATA, sub); }

// ── Documents\SnesEmuAi  ──────────────────────────────────────
inline std::wstring Documents(const wchar_t* sub = L"")
{   return MakeSub(CSIDL_PERSONAL, sub); }

// ── Concrete paths used by the emulator ────────────────────────
// Config / settings
inline std::wstring ConfigDir()      { return Roaming();               }
// Cheats
inline std::wstring CheatsDir()      { return Roaming(L"Cheats");      }
// Patches (IPS / BPS / UPS)
inline std::wstring PatchesDir()     { return Roaming(L"Patches");     }
// BIOS files
inline std::wstring BiosDir()        { return Roaming(L"BIOS");        }
// Shader presets & custom params
inline std::wstring ShadersDir()     { return Roaming(L"Shaders");     }

// SRAM saves
inline std::wstring SavesDir()       { return Local(L"Saves");         }
// Savestates (freeze files)
inline std::wstring StatesDir()      { return Local(L"Saves");         }
// Screenshots
inline std::wstring ScreenshotsDir() { return Local(L"Screenshots");   }
// SPC exports
inline std::wstring SPCDir()         { return Local(L"SPCs");          }
// Recorded movies
inline std::wstring MoviesDir()      { return Local(L"Movies");        }
// Satellaview data
inline std::wstring SatDataDir()     { return Local(L"SatData");       }
// Logs (autosave.log, stdout, stderr, debug)
inline std::wstring LogsDir()        { return Local(L"Logs");          }

// ROM default browse directory  (Documents)
inline std::wstring RomsDir()        { return Documents(L"Roms");      }

// ── Narrow-string convenience wrappers ─────────────────────────
inline std::string ToNarrow(const std::wstring& w)
{
    if (w.empty()) return {};
    int n = WideCharToMultiByte(CP_ACP, 0, w.c_str(), -1, NULL, 0, NULL, NULL);
    std::string s(n - 1, '\0');
    WideCharToMultiByte(CP_ACP, 0, w.c_str(), -1, &s[0], n, NULL, NULL);
    return s;
}

inline std::string ConfigDirA()      { return ToNarrow(ConfigDir());      }
inline std::string LogsDirA()        { return ToNarrow(LogsDir());        }
inline std::string ShadersDirA()     { return ToNarrow(ShadersDir());     }

} // namespace SnesEmuAiPaths
