/*****************************************************************************\
     Snes9x - Portable Super Nintendo Entertainment System (TM) emulator.
                This file is licensed under the Snes9x License.
   For further information, consult the LICENSE file in the root directory.
\*****************************************************************************/

#pragma once
#include <windows.h>
#include <commctrl.h>
#include <string>
#include <vector>
#include <map>

struct ShaderPresetEntry {
    std::wstring name;
    std::wstring fullPath;
    std::wstring category;
    std::wstring description;
};

class CShaderPresetDlg
{
private:
    static INT_PTR CALLBACK DlgShaderPresets(HWND hDlg, UINT msg, WPARAM wParam, LPARAM lParam);

    void initDialog(HWND hDlg);
    void populateTree(HWND hDlg);
    void scanShaderDirectory(const std::wstring& baseDir);
    void onTreeSelectionChanged(HWND hDlg);
    void onApply(HWND hDlg);
    void onDownloadShaders(HWND hDlg);
    void onOpenShaderFolder(HWND hDlg);
    std::wstring getShaderPackDir();
    std::wstring getDescriptionForCategory(const std::wstring& category);

    std::vector<ShaderPresetEntry> presets;
    std::map<std::wstring, std::vector<size_t>> categorizedPresets;
    std::wstring selectedPresetPath;
    TCHAR* outputShaderFile;

public:
    CShaderPresetDlg(TCHAR* shaderFilePath);
    virtual ~CShaderPresetDlg();

    bool show();
    const std::wstring& getSelectedPath() const { return selectedPresetPath; }
};
