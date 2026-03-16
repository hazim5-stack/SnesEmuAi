import { Settings as SettingsIcon, Palette, FolderOpen, Monitor, Sparkles, Lock, Download, Zap } from "lucide-react";
import { invokeBridge } from "../lib/nativeBridge";

export function Settings() {
  const categories = [
    { id: "general", name: "General", icon: SettingsIcon },
    { id: "appearance", name: "Appearance", icon: Palette },
    { id: "library", name: "Library", icon: FolderOpen },
    { id: "emulator", name: "Emulator", icon: Monitor },
    { id: "ai", name: "AI Features", icon: Sparkles },
    { id: "privacy", name: "Privacy", icon: Lock },
    { id: "updates", name: "Updates", icon: Download },
    { id: "advanced", name: "Advanced", icon: Zap },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Settings</h1>
        <p className="text-[#9ca0b8]">Configure your emulator preferences</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => invokeBridge("OpenGeneralSettings")}
            className="px-3 py-2 rounded-lg bg-[#5865f2] text-white text-sm hover:bg-[#4752c4] transition-colors"
          >
            Open Native General
          </button>
          <button
            onClick={() => invokeBridge("OpenGraphicsSettings")}
            className="px-3 py-2 rounded-lg bg-[#12132b] border border-[rgba(88,101,242,0.2)] text-white text-sm hover:border-[#5865f2]"
          >
            Open Native Graphics
          </button>
          <button
            onClick={() => invokeBridge("OpenControlsSettings")}
            className="px-3 py-2 rounded-lg bg-[#12132b] border border-[rgba(88,101,242,0.2)] text-white text-sm hover:border-[#5865f2]"
          >
            Open Native Controls
          </button>
          <button
            onClick={() => invokeBridge("OpenAudioSettings")}
            className="px-3 py-2 rounded-lg bg-[#12132b] border border-[rgba(88,101,242,0.2)] text-white text-sm hover:border-[#5865f2]"
          >
            Open Native Audio
          </button>
          <button
            onClick={() => invokeBridge("OpenInterfaceSettings")}
            className="px-3 py-2 rounded-lg bg-[#12132b] border border-[rgba(88,101,242,0.2)] text-white text-sm hover:border-[#5865f2]"
          >
            Interface Mode
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                category.id === "general"
                  ? "bg-[#5865f2] text-white"
                  : "bg-[#12132b] border border-[rgba(88,101,242,0.15)] text-[#9ca0b8] hover:text-white hover:border-[#5865f2]"
              }`}
            >
              <category.icon className="w-5 h-5" />
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="col-span-3 space-y-6">
          {/* General Settings */}
          <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">General Settings</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white mb-1">Launch on Startup</p>
                  <p className="text-sm text-[#9ca0b8]">Start SNES Emu Ai when Windows starts</p>
                </div>
                <button className="relative w-11 h-6 rounded-full bg-[#2e3150]">
                  <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white"></span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white mb-1">Minimize to Tray</p>
                  <p className="text-sm text-[#9ca0b8]">Keep running in system tray when closed</p>
                </div>
                <button className="relative w-11 h-6 rounded-full bg-[#5865f2]">
                  <span className="absolute top-0.5 left-5 w-5 h-5 rounded-full bg-white"></span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white mb-1">Show Notifications</p>
                  <p className="text-sm text-[#9ca0b8]">Display desktop notifications</p>
                </div>
                <button className="relative w-11 h-6 rounded-full bg-[#5865f2]">
                  <span className="absolute top-0.5 left-5 w-5 h-5 rounded-full bg-white"></span>
                </button>
              </div>

              <div>
                <label className="block text-white mb-2">Language</label>
                <select className="w-full h-10 px-3 bg-[#1a1b3a] border border-[rgba(88,101,242,0.15)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#5865f2]">
                  <option>English</option>
                  <option>العربية (Arabic)</option>
                  <option>Español</option>
                  <option>Français</option>
                  <option>日本語</option>
                </select>
              </div>

              <div>
                <label className="block text-white mb-2">Default Start Page</label>
                <select className="w-full h-10 px-3 bg-[#1a1b3a] border border-[rgba(88,101,242,0.15)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#5865f2]">
                  <option>Home Dashboard</option>
                  <option>Library</option>
                  <option>Recent Games</option>
                  <option>Last Viewed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Appearance</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-white mb-2">Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  <button className="p-4 rounded-lg bg-gradient-to-br from-[#5865f2] to-[#7c3aed] border-2 border-[#5865f2] text-white">
                    <div className="w-full h-16 rounded-md bg-[#0a0b1e] mb-2"></div>
                    <p className="text-sm font-medium">Dark Cosmic</p>
                  </button>
                  <button className="p-4 rounded-lg bg-[#1a1b3a] border-2 border-transparent hover:border-[#5865f2] transition-all text-white">
                    <div className="w-full h-16 rounded-md bg-[#1f2937] mb-2"></div>
                    <p className="text-sm font-medium">Dark Gray</p>
                  </button>
                  <button className="p-4 rounded-lg bg-[#1a1b3a] border-2 border-transparent hover:border-[#5865f2] transition-all text-white">
                    <div className="w-full h-16 rounded-md bg-gradient-to-br from-purple-900 to-pink-900 mb-2"></div>
                    <p className="text-sm font-medium">Purple Dream</p>
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white">UI Scale</label>
                  <span className="text-[#5865f2] font-medium">100%</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="150"
                  step="10"
                  defaultValue="100"
                  className="w-full h-2 bg-[#1a1b3a] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#5865f2]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white mb-1">Animations</p>
                  <p className="text-sm text-[#9ca0b8]">Enable smooth transitions and effects</p>
                </div>
                <button className="relative w-11 h-6 rounded-full bg-[#5865f2]">
                  <span className="absolute top-0.5 left-5 w-5 h-5 rounded-full bg-white"></span>
                </button>
              </div>
            </div>
          </div>

          {/* Library Settings */}
          <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Library Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-white mb-2">ROM Folders</label>
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 p-3 bg-[#1a1b3a] rounded-lg">
                    <FolderOpen className="w-4 h-4 text-[#5865f2]" />
                    <span className="flex-1 text-sm text-white">C:\Games\SNES\ROMs</span>
                    <button className="text-[#ef4444] hover:text-[#dc2626] text-sm">Remove</button>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-[#1a1b3a] rounded-lg">
                    <FolderOpen className="w-4 h-4 text-[#5865f2]" />
                    <span className="flex-1 text-sm text-white">D:\Retro\SNES</span>
                    <button className="text-[#ef4444] hover:text-[#dc2626] text-sm">Remove</button>
                  </div>
                </div>
                <button className="w-full py-2 rounded-lg border-2 border-dashed border-[rgba(88,101,242,0.2)] text-[#9ca0b8] hover:border-[#5865f2] hover:text-white transition-all">
                  + Add Folder
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white mb-1">Auto-Scan on Startup</p>
                  <p className="text-sm text-[#9ca0b8]">Automatically scan for new ROMs</p>
                </div>
                <button className="relative w-11 h-6 rounded-full bg-[#5865f2]">
                  <span className="absolute top-0.5 left-5 w-5 h-5 rounded-full bg-white"></span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white mb-1">Download Cover Art</p>
                  <p className="text-sm text-[#9ca0b8]">Automatically fetch game covers</p>
                </div>
                <button className="relative w-11 h-6 rounded-full bg-[#5865f2]">
                  <span className="absolute top-0.5 left-5 w-5 h-5 rounded-full bg-white"></span>
                </button>
              </div>
            </div>
          </div>

          {/* AI Features */}
          <div className="bg-gradient-to-br from-[#7c3aed]/10 to-[#ec4899]/10 border border-[#7c3aed]/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-[#7c3aed]" />
              <h2 className="text-xl font-semibold text-white">AI Features</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-white mb-1">AI Assistant</p>
                  <p className="text-sm text-[#9ca0b8]">Removed because there is no backend implementation in Win32.</p>
                </div>
                <button
                  onClick={() => invokeBridge("OpenAIAssistantRemoved")}
                  className="px-3 py-2 rounded-lg bg-[#1a1b3a] border border-[#7c3aed]/40 text-white text-sm hover:bg-[#262750]"
                >
                  Log Removed Feature
                </button>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-white mb-1">Smart Cheat Suggestions</p>
                  <p className="text-sm text-[#9ca0b8]">Cheat browsing remains available through the Cheats page and native dialogs.</p>
                </div>
                <button
                  onClick={() => invokeBridge("OpenEmulatorSettings")}
                  className="px-3 py-2 rounded-lg bg-[#1a1b3a] border border-[#5865f2]/30 text-white text-sm hover:bg-[#262750]"
                >
                  Open Cheat Settings
                </button>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-white mb-1">Screenshot Editing</p>
                  <p className="text-sm text-[#9ca0b8]">Removed because there is no backend implementation in Win32.</p>
                </div>
                <button
                  onClick={() => invokeBridge("EditScreenshotRemoved")}
                  className="px-3 py-2 rounded-lg bg-[#1a1b3a] border border-[#7c3aed]/40 text-white text-sm hover:bg-[#262750]"
                >
                  Log Removed Feature
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
