import { Monitor, Maximize, Zap, Image as ImageIcon, RotateCcw } from "lucide-react";
import { invokeBridge } from "../lib/nativeBridge";

export function Graphics() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Graphics Settings</h1>
          <p className="text-[#9ca0b8]">Configure display and rendering options</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => invokeBridge("ApplyGraphicsSettingsFromNewUI")}
            className="px-4 py-2 rounded-lg bg-[#5865f2] text-white hover:bg-[#4752c4] transition-colors"
          >
            Apply in Emulator
          </button>
          <button className="px-4 py-2 rounded-lg bg-[#ef4444] text-white hover:bg-[#dc2626] transition-colors flex items-center gap-2"
            onClick={() => invokeBridge("OpenGraphicsSettings")}
          >
          <RotateCcw className="w-4 h-4" />
          Restore Defaults
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Settings Panel */}
        <div className="col-span-2 space-y-6">
          {/* Display Mode */}
          <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Monitor className="w-5 h-5 text-[#5865f2]" />
              <h2 className="text-lg font-semibold text-white">Display Mode</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#9ca0b8] mb-2">Window Mode</label>
                <select
                  className="w-full h-10 px-3 bg-[#1a1b3a] border border-[rgba(88,101,242,0.15)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
                  onChange={(e) => {
                    if (e.target.value === "Fullscreen" || e.target.value === "Borderless Fullscreen") {
                      invokeBridge("ToggleFullscreen");
                    }
                  }}
                >
                  <option>Windowed</option>
                  <option>Fullscreen</option>
                  <option>Borderless Fullscreen</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-[#9ca0b8] mb-2">Resolution</label>
                <select className="w-full h-10 px-3 bg-[#1a1b3a] border border-[rgba(88,101,242,0.15)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#5865f2]">
                  <option>1920 × 1080</option>
                  <option>2560 × 1440</option>
                  <option>3840 × 2160</option>
                  <option>Native</option>
                </select>
              </div>
            </div>
          </div>

          {/* Scaling & Aspect Ratio */}
          <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Maximize className="w-5 h-5 text-[#5865f2]" />
              <h2 className="text-lg font-semibold text-white">Scaling & Aspect Ratio</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#9ca0b8] mb-2">Scaling Mode</label>
                <select className="w-full h-10 px-3 bg-[#1a1b3a] border border-[rgba(88,101,242,0.15)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#5865f2]">
                  <option>Integer Scaling</option>
                  <option>Stretch to Fill</option>
                  <option>Maintain Aspect Ratio</option>
                  <option>Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-[#9ca0b8] mb-2">Aspect Ratio</label>
                <select className="w-full h-10 px-3 bg-[#1a1b3a] border border-[rgba(88,101,242,0.15)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#5865f2]">
                  <option>4:3 (Original)</option>
                  <option>16:9 (Widescreen)</option>
                  <option>16:10</option>
                  <option>Auto</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filters & Shaders */}
          <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <ImageIcon className="w-5 h-5 text-[#5865f2]" />
              <h2 className="text-lg font-semibold text-white">Filters & Shaders</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#9ca0b8] mb-2">Video Filter</label>
                <select className="w-full h-10 px-3 bg-[#1a1b3a] border border-[rgba(88,101,242,0.15)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#5865f2]">
                  <option>None (Pixel Perfect)</option>
                  <option>Bilinear</option>
                  <option>Sharp Bilinear</option>
                  <option>Scanlines</option>
                  <option>CRT Simulation</option>
                  <option>LCD Simulation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-[#9ca0b8] mb-2">Shader Preset</label>
                <select className="w-full h-10 px-3 bg-[#1a1b3a] border border-[rgba(88,101,242,0.15)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#5865f2]">
                  <option>Default</option>
                  <option>Retro CRT</option>
                  <option>CRT Royale</option>
                  <option>Phosphor Glow</option>
                  <option>Custom</option>
                </select>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-[#5865f2]" />
              <h2 className="text-lg font-semibold text-white">Performance</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white mb-1">V-Sync</p>
                  <p className="text-sm text-[#9ca0b8]">Synchronize with display refresh rate</p>
                </div>
                <button className="relative w-11 h-6 rounded-full bg-[#5865f2]">
                  <span className="absolute top-0.5 left-5 w-5 h-5 rounded-full bg-white"></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white mb-1">Frame Skip</p>
                  <p className="text-sm text-[#9ca0b8]">Skip frames for better performance</p>
                </div>
                <button className="relative w-11 h-6 rounded-full bg-[#2e3150]">
                  <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white"></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white mb-1">Show FPS</p>
                  <p className="text-sm text-[#9ca0b8]">Display frames per second counter</p>
                </div>
                <button className="relative w-11 h-6 rounded-full bg-[#5865f2]">
                  <span className="absolute top-0.5 left-5 w-5 h-5 rounded-full bg-white"></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="space-y-4">
          <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Preview</h3>
            <div className="aspect-video bg-gradient-to-br from-[#1a1b3a] to-[#2e3150] rounded-lg border border-[rgba(88,101,242,0.1)] flex items-center justify-center mb-4">
              <div className="text-center">
                <Monitor className="w-12 h-12 text-[#5865f2] mx-auto mb-2" />
                <p className="text-sm text-[#9ca0b8]">Preview Area</p>
              </div>
            </div>
            <p className="text-xs text-[#9ca0b8] text-center">
              Changes will be applied when you start or resume a game
            </p>
          </div>

          {/* Quick Presets */}
          <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Presets</h3>
            <div className="space-y-2">
              <button
                onClick={() => invokeBridge("ApplyGraphicsSettingsFromNewUI")}
                className="w-full px-4 py-3 rounded-lg bg-[#5865f2] text-white text-left hover:bg-[#4752c4] transition-colors"
              >
                <p className="font-medium mb-1">Balanced</p>
                <p className="text-xs opacity-80">Good quality & performance</p>
              </button>
              <button
                onClick={() => invokeBridge("ApplyGraphicsSettingsFromNewUI")}
                className="w-full px-4 py-3 rounded-lg bg-[#1a1b3a] text-white text-left hover:bg-[#2e3150] transition-colors"
              >
                <p className="font-medium mb-1">Performance</p>
                <p className="text-xs text-[#9ca0b8]">Maximum speed</p>
              </button>
              <button
                onClick={() => invokeBridge("ApplyGraphicsSettingsFromNewUI")}
                className="w-full px-4 py-3 rounded-lg bg-[#1a1b3a] text-white text-left hover:bg-[#2e3150] transition-colors"
              >
                <p className="font-medium mb-1">Quality</p>
                <p className="text-xs text-[#9ca0b8]">Best visual quality</p>
              </button>
              <button
                onClick={() => invokeBridge("ApplyGraphicsSettingsFromNewUI")}
                className="w-full px-4 py-3 rounded-lg bg-[#1a1b3a] text-white text-left hover:bg-[#2e3150] transition-colors"
              >
                <p className="font-medium mb-1">Retro CRT</p>
                <p className="text-xs text-[#9ca0b8]">Authentic CRT look</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
