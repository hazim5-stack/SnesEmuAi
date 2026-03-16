/*****************************************************************************\
     Snes9x - Portable Super Nintendo Entertainment System (TM) emulator.
                This file is licensed under the Snes9x License.
   For further information, consult the LICENSE file in the root directory.
\*****************************************************************************/

#include "CShaderPresetDlg.h"
#include "wsnes9x.h"
#include "SnesEmuAiPaths.h"
#include "rsrc/resource.h"
#include <shellapi.h>
#include <shlwapi.h>
#include <algorithm>
#include <shlobj.h>

#pragma comment(lib, "shlwapi.lib")

extern sGUI GUI;

// Shader category descriptions for the info panel
static const struct {
    const wchar_t* category;
    const wchar_t* description;
} categoryDescriptions[] = {
    { L"anti-aliasing", L"Anti-aliasing filters to smooth jagged edges in the image." },
    { L"auto-box", L"Automatic box-scaling shaders for clean integer scaling." },
    { L"bezel", L"Bezel overlay shaders that add decorative frames around the image." },
    { L"blurs", L"Various blur effects for softening the image." },
    { L"borders", L"Border and frame effects around the game image." },
    { L"cel", L"Cel-shading effects that give a cartoon/anime look." },
    { L"crt", L"CRT monitor simulation shaders - scanlines, phosphor glow, curvature, and more." },
    { L"cubic", L"Cubic interpolation filters for smooth scaling." },
    { L"cut", L"CUT (Color-based Upscaling Technique) shaders for pixel-art upscaling." },
    { L"ddt", L"DDT (Data-Dependent Triangulation) interpolation for smooth scaling." },
    { L"deblur", L"Deblurring shaders to sharpen the original signal." },
    { L"denoisers", L"Noise reduction filters to clean up the image." },
    { L"dithering", L"Dithering-aware shaders that reconstruct colors from dithered patterns." },
    { L"eagle", L"Eagle pixel-art scaling algorithm." },
    { L"film", L"Film grain and cinema-style effects." },
    { L"fsr", L"AMD FidelityFX Super Resolution for high-quality upscaling." },
    { L"gpu", L"GPU-specific shader effects (PowerVR, etc.)." },
    { L"handheld", L"Handheld console screen simulation (Game Boy, GBA, etc.)." },
    { L"hqx", L"hqx (high quality magnification) pixel-art scaling filters." },
    { L"interpolation", L"Various interpolation methods for smooth image scaling." },
    { L"linear", L"Linear filtering and bandlimited pixel shaders." },
    { L"misc", L"Miscellaneous shaders - image adjustments, color correction, etc." },
    { L"motionblur", L"Motion blur effects for simulating persistence of vision." },
    { L"nedi", L"NEDI (New Edge-Directed Interpolation) upscaling." },
    { L"nes_raw_palette", L"NES raw palette shaders for authentic NES color reproduction." },
    { L"nnedi3", L"NNEDI3 neural network-based upscaling." },
    { L"ntsc", L"NTSC signal simulation - composite, S-Video, and RF artifacts." },
    { L"omniscale", L"Omniscale pixel-art upscaling algorithm." },
    { L"pal", L"PAL signal simulation and color correction." },
    { L"pixel-art-scaling", L"Various pixel-art upscaling algorithms." },
    { L"presets", L"Combined preset configurations using multiple shader passes." },
    { L"procedural", L"Procedural and artistic effect shaders." },
    { L"reshade", L"ReShade-ported post-processing effects." },
    { L"sabr", L"SABR (Smooth Accurate Bold Realization) pixel-art scaling." },
    { L"scalefx", L"ScaleFX pixel-art scaling algorithm." },
    { L"scalehq", L"ScaleHQ high-quality scaling filters." },
    { L"scalenx", L"ScaleNx pixel-art scaling (Scale2x, Scale3x, etc.)." },
    { L"scanlines", L"Scanline overlay effects for retro monitor simulation." },
    { L"sharpen", L"Sharpening filters to enhance image detail." },
    { L"stereoscopic-3d", L"Stereoscopic 3D effect shaders." },
    { L"vhs", L"VHS tape simulation with tracking lines and color bleeding." },
    { L"windowed", L"Windowed sinc and other resampling filters." },
    { L"xbr", L"xBR (pixel-art scaling) high-quality upscaling filters." },
    { L"xbrz", L"xBRZ optimized pixel-art scaling filters." },
    { L"xsal", L"xSAL scaling filters with smooth interpolation." },
    { L"xsoft", L"xSoft smooth scaling filters." },
};

CShaderPresetDlg::CShaderPresetDlg(TCHAR* shaderFilePath)
    : outputShaderFile(shaderFilePath)
{
}

CShaderPresetDlg::~CShaderPresetDlg()
{
}

std::wstring CShaderPresetDlg::getShaderPackDir()
{
    // Prefer user-writable AppData shaders; fall back to install dir
    std::wstring userDir = SnesEmuAiPaths::ShadersDir() + L"\\glsl-shaders";
    if (GetFileAttributesW(userDir.c_str()) != INVALID_FILE_ATTRIBUTES)
        return userDir;

    TCHAR exePath[MAX_PATH];
    GetModuleFileName(NULL, exePath, MAX_PATH);
    PathRemoveFileSpec(exePath);
    std::wstring dir(exePath);
    dir += L"\\shaders\\glsl-shaders";
    return dir;
}

std::wstring CShaderPresetDlg::getDescriptionForCategory(const std::wstring& category)
{
    // Match category by checking if it starts with any known category prefix
    std::wstring lowerCat = category;
    std::transform(lowerCat.begin(), lowerCat.end(), lowerCat.begin(), ::towlower);

    for (const auto& desc : categoryDescriptions) {
        if (lowerCat.find(desc.category) == 0) {
            return desc.description;
        }
    }
    return L"GLSL shader preset.";
}

void CShaderPresetDlg::scanShaderDirectory(const std::wstring& baseDir)
{
    presets.clear();
    categorizedPresets.clear();

    // Scan for .glslp files recursively
    std::vector<std::wstring> dirsToScan;
    dirsToScan.push_back(baseDir);

    while (!dirsToScan.empty()) {
        std::wstring currentDir = dirsToScan.back();
        dirsToScan.pop_back();

        WIN32_FIND_DATA fd;
        std::wstring searchPattern = currentDir + L"\\*";
        HANDLE hFind = FindFirstFile(searchPattern.c_str(), &fd);

        if (hFind == INVALID_HANDLE_VALUE)
            continue;

        do {
            std::wstring name(fd.cFileName);
            if (name == L"." || name == L"..")
                continue;

            std::wstring fullPath = currentDir + L"\\" + name;

            if (fd.dwFileAttributes & FILE_ATTRIBUTE_DIRECTORY) {
                dirsToScan.push_back(fullPath);
            }
            else {
                // Check for .glslp extension
                size_t dotPos = name.rfind(L'.');
                if (dotPos != std::wstring::npos) {
                    std::wstring ext = name.substr(dotPos);
                    std::transform(ext.begin(), ext.end(), ext.begin(), ::towlower);
                    if (ext == L".glslp" || ext == L".slangp") {
                        ShaderPresetEntry entry;
                        entry.fullPath = fullPath;

                        // Extract category from relative path
                        std::wstring relPath = fullPath.substr(baseDir.length() + 1);
                        size_t slashPos = relPath.find(L'\\');
                        if (slashPos == std::wstring::npos)
                            slashPos = relPath.find(L'/');

                        if (slashPos != std::wstring::npos) {
                            entry.category = relPath.substr(0, slashPos);
                        }
                        else {
                            entry.category = L"Root";
                        }

                        // Shader name is filename without extension
                        entry.name = name.substr(0, dotPos);
                        entry.description = getDescriptionForCategory(entry.category);

                        size_t idx = presets.size();
                        presets.push_back(entry);
                        categorizedPresets[entry.category].push_back(idx);
                    }
                }
            }
        } while (FindNextFile(hFind, &fd));

        FindClose(hFind);
    }

    // Sort presets within each category
    for (auto& pair : categorizedPresets) {
        std::sort(pair.second.begin(), pair.second.end(),
            [this](size_t a, size_t b) {
                return presets[a].name < presets[b].name;
            });
    }
}

void CShaderPresetDlg::populateTree(HWND hDlg)
{
    HWND hTree = GetDlgItem(hDlg, IDC_SHADER_PRESET_TREE);
    if (!hTree) return;

    TreeView_DeleteAllItems(hTree);

    TVINSERTSTRUCT tvis;
    tvis.hInsertAfter = TVI_SORT;

    for (const auto& pair : categorizedPresets) {
        // Insert category node
        tvis.hParent = TVI_ROOT;
        tvis.item.mask = TVIF_TEXT | TVIF_PARAM;
        std::wstring catName = pair.first;
        tvis.item.pszText = (LPWSTR)catName.c_str();
        tvis.item.lParam = (LPARAM)-1; // -1 = category node
        HTREEITEM hCategory = TreeView_InsertItem(hTree, &tvis);

        // Insert preset entries under category
        for (size_t idx : pair.second) {
            tvis.hParent = hCategory;
            tvis.item.mask = TVIF_TEXT | TVIF_PARAM;
            tvis.item.pszText = (LPWSTR)presets[idx].name.c_str();
            tvis.item.lParam = (LPARAM)idx;
            TreeView_InsertItem(hTree, &tvis);
        }
    }
}

void CShaderPresetDlg::initDialog(HWND hDlg)
{
    std::wstring shaderDir = getShaderPackDir();

    // Check if shader pack exists
    if (GetFileAttributes(shaderDir.c_str()) == INVALID_FILE_ATTRIBUTES) {
        SetDlgItemText(hDlg, IDC_SHADER_PRESET_INFO,
            L"Shader pack not found.\n\n"
            L"Click \"Download Shader Pack\" to download the libretro GLSL shader collection.\n\n"
            L"The shaders will be downloaded to:\n"
            L"<exe_dir>\\shaders\\glsl-shaders\\");
        EnableWindow(GetDlgItem(hDlg, IDC_SHADER_PRESET_APPLY), FALSE);
        EnableWindow(GetDlgItem(hDlg, IDOK), FALSE);
        return;
    }

    scanShaderDirectory(shaderDir);

    if (presets.empty()) {
        SetDlgItemText(hDlg, IDC_SHADER_PRESET_INFO,
            L"No shader presets (.glslp) found in the shader directory.");
        EnableWindow(GetDlgItem(hDlg, IDC_SHADER_PRESET_APPLY), FALSE);
        EnableWindow(GetDlgItem(hDlg, IDOK), FALSE);
        return;
    }

    populateTree(hDlg);

    wchar_t infoText[256];
    _snwprintf(infoText, 256, L"Found %zu shader presets in %zu categories.\n\nSelect a shader from the tree to preview and apply.",
        presets.size(), categorizedPresets.size());
    SetDlgItemText(hDlg, IDC_SHADER_PRESET_INFO, infoText);

    // If there's a current shader loaded, try to select it
    if (outputShaderFile && outputShaderFile[0] != L'\0') {
        SetDlgItemText(hDlg, IDC_SHADER_PRESET_CURRENT, outputShaderFile);
    }
    else {
        SetDlgItemText(hDlg, IDC_SHADER_PRESET_CURRENT, L"(none)");
    }
}

void CShaderPresetDlg::onTreeSelectionChanged(HWND hDlg)
{
    HWND hTree = GetDlgItem(hDlg, IDC_SHADER_PRESET_TREE);
    HTREEITEM hSelected = TreeView_GetSelection(hTree);
    if (!hSelected)
        return;

    TVITEM tvi;
    tvi.hItem = hSelected;
    tvi.mask = TVIF_PARAM;
    TreeView_GetItem(hTree, &tvi);

    if (tvi.lParam == -1) {
        // Category node selected - show category description
        wchar_t catName[256];
        tvi.mask = TVIF_TEXT;
        tvi.pszText = catName;
        tvi.cchTextMax = 256;
        TreeView_GetItem(hTree, &tvi);

        std::wstring desc = getDescriptionForCategory(catName);
        SetDlgItemText(hDlg, IDC_SHADER_PRESET_INFO, desc.c_str());
        selectedPresetPath.clear();
        EnableWindow(GetDlgItem(hDlg, IDC_SHADER_PRESET_APPLY), FALSE);
        EnableWindow(GetDlgItem(hDlg, IDOK), FALSE);
    }
    else {
        // Preset node selected
        size_t idx = (size_t)tvi.lParam;
        if (idx < presets.size()) {
            selectedPresetPath = presets[idx].fullPath;

            std::wstring info = L"Shader: " + presets[idx].name + L"\n";
            info += L"Category: " + presets[idx].category + L"\n";
            info += L"File: " + presets[idx].fullPath + L"\n\n";
            info += presets[idx].description;

            SetDlgItemText(hDlg, IDC_SHADER_PRESET_INFO, info.c_str());
            EnableWindow(GetDlgItem(hDlg, IDC_SHADER_PRESET_APPLY), TRUE);
            EnableWindow(GetDlgItem(hDlg, IDOK), TRUE);
        }
    }
}

void CShaderPresetDlg::onApply(HWND hDlg)
{
    if (selectedPresetPath.empty())
        return;

    if (outputShaderFile) {
        lstrcpyn(outputShaderFile, selectedPresetPath.c_str(), MAX_PATH);
    }

    SetDlgItemText(hDlg, IDC_SHADER_PRESET_CURRENT, selectedPresetPath.c_str());
}

void CShaderPresetDlg::onDownloadShaders(HWND hDlg)
{
    std::wstring shadersDir = SnesEmuAiPaths::ShadersDir();
    CreateDirectory(shadersDir.c_str(), NULL);

    std::wstring targetDir = shadersDir + L"\\glsl-shaders";

    // Check if git is available
    if (GetFileAttributes(targetDir.c_str()) != INVALID_FILE_ATTRIBUTES) {
        int result = MessageBox(hDlg,
            L"The shader pack directory already exists.\n\n"
            L"Do you want to update it (pull latest changes)?",
            L"SNES Emu Ai - Shader Pack", MB_YESNOCANCEL | MB_ICONQUESTION);

        if (result == IDYES) {
            // Try git pull
            SetDlgItemText(hDlg, IDC_SHADER_PRESET_INFO, L"Updating shader pack...\nPlease wait...");

            SHELLEXECUTEINFO sei = { sizeof(sei) };
            sei.fMask = SEE_MASK_NOCLOSEPROCESS;
            sei.hwnd = hDlg;
            sei.lpVerb = L"open";
            sei.lpFile = L"git";
            sei.lpParameters = L"pull";
            sei.lpDirectory = targetDir.c_str();
            sei.nShow = SW_HIDE;

            if (ShellExecuteEx(&sei)) {
                WaitForSingleObject(sei.hProcess, 120000); // 2 minute timeout
                CloseHandle(sei.hProcess);
                // Refresh the tree
                initDialog(hDlg);
                MessageBox(hDlg, L"Shader pack updated successfully!",
                    L"SNES Emu Ai - Shader Pack", MB_OK | MB_ICONINFORMATION);
            }
            else {
                MessageBox(hDlg, L"Failed to run git. Make sure Git is installed and in PATH.",
                    L"SNES Emu Ai - Shader Pack", MB_OK | MB_ICONERROR);
            }
        }
        else if (result == IDNO) {
            // Just refresh
            initDialog(hDlg);
        }
        return;
    }

    int result = MessageBox(hDlg,
        L"This will download the libretro GLSL shader collection (~50MB).\n\n"
        L"Requires Git to be installed.\n\n"
        L"Continue?",
        L"SNES Emu Ai - Download Shader Pack", MB_YESNO | MB_ICONQUESTION);

    if (result != IDYES)
        return;

    SetDlgItemText(hDlg, IDC_SHADER_PRESET_INFO,
        L"Downloading shader pack...\nThis may take a few minutes.\nPlease wait...");
    UpdateWindow(hDlg);

    // Clone via git
    std::wstring gitArgs = L"clone --depth 1 https://github.com/libretro/glsl-shaders.git \"" + targetDir + L"\"";

    SHELLEXECUTEINFO sei = { sizeof(sei) };
    sei.fMask = SEE_MASK_NOCLOSEPROCESS;
    sei.hwnd = hDlg;
    sei.lpVerb = L"open";
    sei.lpFile = L"git";
    sei.lpParameters = gitArgs.c_str();
    sei.lpDirectory = shadersDir.c_str();
    sei.nShow = SW_HIDE;

    if (ShellExecuteEx(&sei)) {
        // Wait with a timeout
        DWORD waitResult = WaitForSingleObject(sei.hProcess, 300000); // 5 minute timeout
        CloseHandle(sei.hProcess);

        if (waitResult == WAIT_OBJECT_0 &&
            GetFileAttributes(targetDir.c_str()) != INVALID_FILE_ATTRIBUTES) {
            initDialog(hDlg);
            MessageBox(hDlg, L"Shader pack downloaded successfully!\n\nYou can now browse and select shader presets.",
                L"SNES Emu Ai - Shader Pack", MB_OK | MB_ICONINFORMATION);
        }
        else {
            SetDlgItemText(hDlg, IDC_SHADER_PRESET_INFO,
                L"Download timed out or failed.\n\n"
                L"You can manually download from:\n"
                L"https://github.com/libretro/glsl-shaders\n\n"
                L"Extract to:\n<exe_dir>\\shaders\\glsl-shaders\\");
        }
    }
    else {
        // Git not available - offer manual download info
        MessageBox(hDlg,
            L"Git is not installed or not in PATH.\n\n"
            L"To install shaders manually:\n"
            L"1. Download from: https://github.com/libretro/glsl-shaders\n"
            L"2. Extract to: <exe_dir>\\shaders\\glsl-shaders\\\n\n"
            L"Or install Git and try again.",
            L"SNES Emu Ai - Shader Pack", MB_OK | MB_ICONINFORMATION);
    }
}

void CShaderPresetDlg::onOpenShaderFolder(HWND hDlg)
{
    std::wstring shaderDir = getShaderPackDir();

    // If shader pack dir doesn't exist, open parent shaders dir or create it
    if (GetFileAttributes(shaderDir.c_str()) == INVALID_FILE_ATTRIBUTES) {
        shaderDir = SnesEmuAiPaths::ShadersDir();
        CreateDirectory(shaderDir.c_str(), NULL);
    }

    ShellExecute(hDlg, L"explore", shaderDir.c_str(), NULL, NULL, SW_SHOWNORMAL);
}

INT_PTR CALLBACK CShaderPresetDlg::DlgShaderPresets(HWND hDlg, UINT msg, WPARAM wParam, LPARAM lParam)
{
    CShaderPresetDlg* dlg = (CShaderPresetDlg*)GetWindowLongPtr(hDlg, GWLP_USERDATA);

    switch (msg) {
    case WM_INITDIALOG:
        SetWindowLongPtr(hDlg, GWLP_USERDATA, lParam);
        dlg = (CShaderPresetDlg*)lParam;
        dlg->initDialog(hDlg);
        return TRUE;

    case WM_COMMAND:
        switch (LOWORD(wParam)) {
        case IDCANCEL:
            if (HIWORD(wParam) == BN_CLICKED) {
                EndDialog(hDlg, IDCANCEL);
                return TRUE;
            }
            break;
        case IDOK:
            if (HIWORD(wParam) == BN_CLICKED) {
                dlg->onApply(hDlg);
                EndDialog(hDlg, IDOK);
                return TRUE;
            }
            break;
        case IDC_SHADER_PRESET_APPLY:
            if (HIWORD(wParam) == BN_CLICKED) {
                dlg->onApply(hDlg);
                return TRUE;
            }
            break;
        case IDC_SHADER_PRESET_DOWNLOAD:
            if (HIWORD(wParam) == BN_CLICKED) {
                dlg->onDownloadShaders(hDlg);
                return TRUE;
            }
            break;
        case IDC_SHADER_PRESET_OPENFOLDER:
            if (HIWORD(wParam) == BN_CLICKED) {
                dlg->onOpenShaderFolder(hDlg);
                return TRUE;
            }
            break;
        }
        break;

    case WM_NOTIFY:
    {
        NMHDR* nmhdr = (NMHDR*)lParam;
        if (nmhdr->idFrom == IDC_SHADER_PRESET_TREE &&
            nmhdr->code == TVN_SELCHANGED) {
            dlg->onTreeSelectionChanged(hDlg);
            return TRUE;
        }
    }
    break;

    case WM_SIZE:
    {
        // Simple resize - stretch tree and info
        RECT rc;
        GetClientRect(hDlg, &rc);
        int w = rc.right - rc.left;
        int h = rc.bottom - rc.top;

        HWND hTree = GetDlgItem(hDlg, IDC_SHADER_PRESET_TREE);
        if (hTree) {
            int treeWidth = (w - 20) * 45 / 100;
            MoveWindow(hTree, 7, 28, treeWidth, h - 80, TRUE);

            HWND hInfo = GetDlgItem(hDlg, IDC_SHADER_PRESET_INFO);
            if (hInfo) {
                MoveWindow(hInfo, treeWidth + 14, 28, w - treeWidth - 21, h - 120, TRUE);
            }
        }
    }
    return TRUE;
    }

    return FALSE;
}

bool CShaderPresetDlg::show()
{
    return DialogBoxParam(GUI.hInstance, MAKEINTRESOURCE(IDD_SHADER_PRESET_BROWSER),
        GUI.hWnd, DlgShaderPresets, (LPARAM)this) == IDOK;
}
