import { Gamepad2, Keyboard, RotateCcw, Download, Upload } from "lucide-react";
import { invokeBridge } from "../lib/nativeBridge";

export function Controls() {
  const controlMappings = [
    { button: "D-Pad Up", keyboard: "W", gamepad: "D-Pad Up" },
    { button: "D-Pad Down", keyboard: "S", gamepad: "D-Pad Down" },
    { button: "D-Pad Left", keyboard: "A", gamepad: "D-Pad Left" },
    { button: "D-Pad Right", keyboard: "D", gamepad: "D-Pad Right" },
    { button: "A Button", keyboard: "K", gamepad: "A" },
    { button: "B Button", keyboard: "J", gamepad: "B" },
    { button: "X Button", keyboard: "I", gamepad: "X" },
    { button: "Y Button", keyboard: "U", gamepad: "Y" },
    { button: "L Trigger", keyboard: "Q", gamepad: "LB" },
    { button: "R Trigger", keyboard: "E", gamepad: "RB" },
    { button: "Start", keyboard: "Enter", gamepad: "Start" },
    { button: "Select", keyboard: "Shift", gamepad: "Select" },
  ];

  const hotkeys = [
    { action: "Quick Save", key: "F5" },
    { action: "Quick Load", key: "F6" },
    { action: "Toggle Cheats", key: "F7" },
    { action: "Screenshot", key: "F8" },
    { action: "Settings", key: "F9" },
    { action: "Fast Forward", key: "Tab" },
    { action: "Slow Motion", key: "Backspace" },
    { action: "Pause/Resume", key: "P" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Controls & Mapping</h1>
          <p className="text-[#9ca0b8]">Configure your controller and keyboard mappings</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => invokeBridge("OpenControlsSettings")}
            className="px-4 py-2 rounded-lg bg-[#12132b] border border-[rgba(88,101,242,0.15)] text-white hover:border-[#5865f2] transition-all flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Import Profile
          </button>
          <button
            onClick={() => invokeBridge("OpenControlsSettings")}
            className="px-4 py-2 rounded-lg bg-[#12132b] border border-[rgba(88,101,242,0.15)] text-white hover:border-[#5865f2] transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Profile
          </button>
          <button
            onClick={() => invokeBridge("ApplyControlsSettingsFromNewUI")}
            className="px-4 py-2 rounded-lg bg-[#ef4444] text-white hover:bg-[#dc2626] transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Default
          </button>
        </div>
      </div>

      {/* Player Tabs */}
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4].map((player) => (
          <button
            key={player}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              player === 1
                ? "bg-[#5865f2] text-white"
                : "bg-[#12132b] border border-[rgba(88,101,242,0.15)] text-[#9ca0b8] hover:text-white hover:border-[#5865f2]"
            }`}
          >
            Player {player}
          </button>
        ))}
      </div>

      {/* Connected Devices */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-[#5865f2]/10 to-[#7c3aed]/10 border border-[#5865f2]/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#5865f2] to-[#7c3aed] flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Controller</h3>
              <p className="text-sm text-[#10b981]">Xbox Controller Connected</p>
            </div>
          </div>
          <button
            onClick={() => invokeBridge("OpenControlsSettings")}
            className="w-full py-2 rounded-lg bg-[#5865f2] text-white hover:bg-[#4752c4] transition-colors"
          >
            Test Controller
          </button>
        </div>

        <div className="bg-gradient-to-br from-[#10b981]/10 to-[#06b6d4]/10 border border-[#10b981]/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#10b981] to-[#06b6d4] flex items-center justify-center">
              <Keyboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Keyboard</h3>
              <p className="text-sm text-[#10b981]">Always Available</p>
            </div>
          </div>
          <button
            onClick={() => invokeBridge("OpenControlsSettings")}
            className="w-full py-2 rounded-lg bg-[#10b981] text-white hover:bg-[#059669] transition-colors"
          >
            Test Keyboard
          </button>
        </div>
      </div>

      {/* Control Mappings */}
      <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Button Mapping</h2>
        <div className="grid grid-cols-3 gap-4">
          {controlMappings.map((mapping, i) => (
            <div
              key={i}
              className="bg-[#1a1b3a] border border-[rgba(88,101,242,0.1)] rounded-lg p-4"
            >
              <p className="text-sm text-[#9ca0b8] mb-3">{mapping.button}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Keyboard className="w-4 h-4 text-[#5865f2]" />
                  <input
                    type="text"
                    value={mapping.keyboard}
                    readOnly
                    className="flex-1 px-3 py-1.5 bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded text-white text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-[#7c3aed]" />
                  <input
                    type="text"
                    value={mapping.gamepad}
                    readOnly
                    className="flex-1 px-3 py-1.5 bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded text-white text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hotkeys */}
      <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Hotkeys</h2>
        <div className="grid grid-cols-4 gap-4">
          {hotkeys.map((hotkey, i) => (
            <button
              key={i}
              onClick={() => {
                if (hotkey.action === "Quick Save") invokeBridge("QuickSave");
                if (hotkey.action === "Quick Load") invokeBridge("QuickLoad");
                if (hotkey.action === "Toggle Cheats") invokeBridge("ToggleCheats");
                if (hotkey.action === "Screenshot") invokeBridge("CaptureScreenshot");
                if (hotkey.action === "Settings") invokeBridge("OpenGeneralSettings");
              }}
              className="bg-[#1a1b3a] border border-[rgba(88,101,242,0.1)] rounded-lg p-4 flex flex-col items-center justify-center text-center"
            >
              <p className="text-sm text-[#9ca0b8] mb-2">{hotkey.action}</p>
              <code className="px-3 py-1.5 rounded bg-[#12132b] border border-[#5865f2]/30 text-[#5865f2] font-medium">
                {hotkey.key}
              </code>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
