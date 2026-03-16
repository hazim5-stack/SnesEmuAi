# SNES Emu Ai
**AI-Powered Super Nintendo Emulator**

Version 1.0 Build 3 — March 2026
Based on the [Snes9x 1.63](https://github.com/snes9xgit/snes9x) emulation core.

---

## What is SNES Emu Ai?

SNES Emu Ai is a portable, freeware Super Nintendo Entertainment System (SNES) emulator that extends the proven Snes9x core with Cloud/AI-powered features. It lets you play SNES and Super Famicom games on Windows with modern conveniences that were never available on the original hardware.

## Cloud/AI Features

| Feature | Description |
|---------|-------------|
| **Game Recognizer** | Automatically identifies loaded ROMs via cloud API — displays game title, region, year and genre in the title bar. |
| **Cheat Cloud** | Fetches community cheat codes by CRC32 from an online cheat-index service. One-click apply. |
| **Cheat Coder** | Chat-style dialog with GPT-powered normalization. Accepts Game Genie, Pro Action Replay, raw and conditional formats. Streams responses via SSE. |
| **Achievements Engine** | Per-frame WRAM monitoring with condition-based triggers (EQ, GE, LE, INC, DEC). Persists to `snes9x_achievements.dat`. |
| **Auto-Save System** | Configurable interval (1–60 min). Rotates between slots 98/99 so manual saves are never overwritten. |
| **Performance HUD** | Real-time FPS and CPU speed overlay with built-in bitmap font. |
| **Library Engine** | Scans directories for SNES ROMs, tracks recent games, caches box art paths. |
| **Library UI** | Sidebar navigation with a games grid — boxart cards with click-to-load. |
| **BoxArt Scraper** | Automatically fetches game cover art from Libretro thumbnail repositories. |
| **Shader Preset Browser** | Tree-view dialog to browse, preview and apply shader presets — CRT, scanline, NTSC, VHS, handheld filters and 40+ categories with descriptions. |
| **Modern Shell** | Windows 11 Fluent design — rounded corners, immersive dark mode, Mica/Acrylic via DWM. |
| **Legacy Bridge** | Maps modern frontend commands to the classic Win32 emulator core via dedicated window messages. |
| **API Key Manager** | DPAPI-encrypted local storage for API keys with environment variable fallback. |

## Requirements

- Windows 10 or later (Windows 11 recommended for full visual effects)
- DirectX 9 runtime
- 64-bit (x64) processor
- Internet connection for Cloud/AI features (optional for offline play)

## Building from Source

### Prerequisites
- Visual Studio 2022 with C++ desktop development workload
- MSBuild (v143 toolset)

### Build Order
Rebuild dependency libraries first, then the main project:

```
1. win32/zlib/zlib.vcxproj
2. win32/libpng/libpng.vcxproj
3. win32/glslang/SPIRV/SPIRV.vcxproj  (also builds HLSL, OSDependent, glslang)
4. win32/snes9xw.vcxproj
```

Configuration: **Release Unicode | x64**

Or use the provided build script:
```
win32\build_main_release_x64.cmd
```

The build produces: `win32/SnesEmuAi-x64.exe`

## What's Emulated

- 65c816 main CPU with variable-length machine cycles
- 8-channel DMA and H-DMA
- H-IRQ, V-IRQ and NMI
- Sony SPC700 sound CPU and DSP (eight 16-bit stereo channels)
- All background modes (0–7), all screen resolutions
- Sub-screen blending, mosaic, Mode 7 rotation/scaling
- Dual graphic clip windows with all logic modes
- Super FX, SA-1, DSP-1/2/4, C4, S-DD1, SPC7110, OBC1, S-RTC
- SNES Mouse, Super Scope, Justifier, Multi Player 5
- Satellaview / BS-X (partial)
- MSU1 audio/data pack

## Credits

**SNES Emu Ai**
- Hazim Batwa — Cloud/AI integration, branding and modern shell design

**Snes9x Core**
- Gary Henderson and Jerremy Koot — original Snes9x project
- BearOso, OV2, zones — major contributors and maintainers
- byuu — timing research and technical findings
- Blargg — accurate sound emulation
- All other Snes9x contributors listed in the [LICENSE](LICENSE) file

## License

See [LICENSE](LICENSE) for the full Snes9x license terms.

---

*Nintendo is a trademark. Super NES, Super Famicom, Super Scope and Super FX are trademarks of Nintendo Co., Limited and its subsidiary companies.*
