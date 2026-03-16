import { useParams } from "react-router";
import { Play as PlayIcon, Pause, Settings, Code, Save, Camera, X, Maximize2 } from "lucide-react";

export function Play() {
  const { gameId } = useParams();

  return (
    <div className="p-6 space-y-6">
      {/* Game Launch Setup */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Launch Game</h1>
        <p className="text-[#9ca0b8]">Configure settings before starting</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Panel */}
        <div className="col-span-2 space-y-4">
          {/* Game Card */}
          <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl overflow-hidden">
            <div className="flex">
              <div className="w-64 h-80 bg-gradient-to-br from-red-500 to-orange-500"></div>
              <div className="flex-1 p-6">
                <h2 className="text-2xl font-bold text-white mb-2">Super Mario World</h2>
                <p className="text-[#9ca0b8] mb-6">Super Nintendo (SNES) • USA</p>
                
                <div className="space-y-4">
                  <div className="bg-[#1a1b3a] rounded-lg p-4 border border-[rgba(88,101,242,0.1)]">
                    <h3 className="text-sm font-medium text-[#9ca0b8] mb-2">Last Session</h3>
                    <p className="text-white">World 3-2 • 2 hours ago</p>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 px-6 py-3 rounded-lg bg-[#5865f2] text-white font-medium hover:bg-[#4752c4] transition-colors flex items-center justify-center gap-2">
                      <PlayIcon className="w-5 h-5" />
                      Resume Game
                    </button>
                    <button className="px-6 py-3 rounded-lg border border-[rgba(88,101,242,0.15)] text-white hover:border-[#5865f2] transition-all">
                      New Game
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Settings */}
          <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#9ca0b8] mb-2">Video Preset</label>
                <select className="w-full h-10 px-3 bg-[#1a1b3a] border border-[rgba(88,101,242,0.15)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#5865f2]">
                  <option>Balanced</option>
                  <option>Performance</option>
                  <option>Quality</option>
                  <option>Retro CRT</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-[#9ca0b8] mb-2">Controller Profile</label>
                <select className="w-full h-10 px-3 bg-[#1a1b3a] border border-[rgba(88,101,242,0.15)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#5865f2]">
                  <option>Default</option>
                  <option>Xbox Layout</option>
                  <option>PlayStation Layout</option>
                  <option>Custom</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Enable Cheats */}
          <div className="bg-gradient-to-br from-[#7c3aed]/10 to-[#ec4899]/10 border border-[#7c3aed]/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#ec4899] flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-white">Enable Cheats</h3>
            </div>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3 bg-[#12132b] rounded-lg cursor-pointer hover:bg-[#1a1b3a] transition-colors">
                <span className="text-sm text-white">Infinite Lives</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#5865f2] focus:ring-[#5865f2]" />
              </label>
              <label className="flex items-center justify-between p-3 bg-[#12132b] rounded-lg cursor-pointer hover:bg-[#1a1b3a] transition-colors">
                <span className="text-sm text-white">All Power-ups</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#5865f2] focus:ring-[#5865f2]" />
              </label>
              <label className="flex items-center justify-between p-3 bg-[#12132b] rounded-lg cursor-pointer hover:bg-[#1a1b3a] transition-colors">
                <span className="text-sm text-white">Unlock Levels</span>
                <input type="checkbox" className="w-4 h-4 rounded text-[#5865f2] focus:ring-[#5865f2]" />
              </label>
            </div>
          </div>

          {/* Save Slot Preview */}
          <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Save className="w-5 h-5 text-[#10b981]" />
              <h3 className="font-semibold text-white">Save Slot</h3>
            </div>
            <div className="space-y-2">
              <button className="w-full p-3 rounded-lg bg-[#1a1b3a] border border-[#5865f2] text-left hover:bg-[#2e3150] transition-colors">
                <p className="text-sm font-medium text-white mb-1">Quick Save 1</p>
                <p className="text-xs text-[#9ca0b8]">World 3-2 • 2 hours ago</p>
              </button>
              <button className="w-full p-3 rounded-lg bg-[#1a1b3a] text-left hover:bg-[#2e3150] transition-colors">
                <p className="text-sm font-medium text-white mb-1">Auto Save</p>
                <p className="text-xs text-[#9ca0b8]">World 2-5 • Yesterday</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* In-Game Overlay Reference */}
      <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">In-Game Overlay Controls</h3>
        <div className="grid grid-cols-6 gap-3">
          {[
            { icon: Save, label: "Quick Save", key: "F5" },
            { icon: PlayIcon, label: "Quick Load", key: "F6" },
            { icon: Code, label: "Toggle Cheats", key: "F7" },
            { icon: Camera, label: "Screenshot", key: "F8" },
            { icon: Settings, label: "Settings", key: "F9" },
            { icon: X, label: "Exit", key: "ESC" },
          ].map((control, i) => (
            <div key={i} className="bg-[#1a1b3a] rounded-lg p-4 text-center">
              <control.icon className="w-6 h-6 text-[#5865f2] mx-auto mb-2" />
              <p className="text-xs text-white mb-1">{control.label}</p>
              <code className="text-xs text-[#9ca0b8] bg-[#12132b] px-2 py-0.5 rounded">{control.key}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
