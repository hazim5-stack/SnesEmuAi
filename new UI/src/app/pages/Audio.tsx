import { Volume2, Music, Settings as SettingsIcon, RotateCcw } from "lucide-react";
import { invokeBridge } from "../lib/nativeBridge";

export function Audio() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Audio Settings</h1>
          <p className="text-[#9ca0b8]">Configure sound and audio output</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => invokeBridge("ApplyAudioSettingsFromNewUI")}
            className="px-4 py-2 rounded-lg bg-[#5865f2] text-white hover:bg-[#4752c4] transition-colors"
          >
            Apply in Emulator
          </button>
          <button className="px-4 py-2 rounded-lg bg-[#ef4444] text-white hover:bg-[#dc2626] transition-colors flex items-center gap-2"
            onClick={() => invokeBridge("OpenAudioSettings")}
          >
          <RotateCcw className="w-4 h-4" />
          Restore Defaults
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Settings Panel */}
        <div className="col-span-2 space-y-6">
          {/* Volume Controls */}
          <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Volume2 className="w-5 h-5 text-[#5865f2]" />
              <h2 className="text-lg font-semibold text-white">Volume Controls</h2>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white">Master Volume</label>
                  <span className="text-[#5865f2] font-medium">85%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="85"
                  className="w-full h-2 bg-[#1a1b3a] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#5865f2]"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white">Music Volume</label>
                  <span className="text-[#5865f2] font-medium">70%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="70"
                  className="w-full h-2 bg-[#1a1b3a] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#5865f2]"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white">Sound Effects</label>
                  <span className="text-[#5865f2] font-medium">90%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="90"
                  className="w-full h-2 bg-[#1a1b3a] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#5865f2]"
                />
              </div>
            </div>
          </div>

          {/* Audio Output */}
          <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <SettingsIcon className="w-5 h-5 text-[#5865f2]" />
              <h2 className="text-lg font-semibold text-white">Audio Output</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#9ca0b8] mb-2">Output Device</label>
                <select className="w-full h-10 px-3 bg-[#1a1b3a] border border-[rgba(88,101,242,0.15)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#5865f2]">
                  <option>Default System Output</option>
                  <option>Headphones (Realtek)</option>
                  <option>Speakers (USB Audio)</option>
                  <option>HDMI Audio</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-[#9ca0b8] mb-2">Sample Rate</label>
                <select className="w-full h-10 px-3 bg-[#1a1b3a] border border-[rgba(88,101,242,0.15)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#5865f2]">
                  <option>44100 Hz</option>
                  <option>48000 Hz</option>
                  <option>96000 Hz</option>
                </select>
              </div>
            </div>
          </div>

          {/* Latency & Buffer */}
          <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Music className="w-5 h-5 text-[#5865f2]" />
              <h2 className="text-lg font-semibold text-white">Latency & Synchronization</h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white">Audio Buffer Size</label>
                  <span className="text-[#5865f2] font-medium">512 samples</span>
                </div>
                <input
                  type="range"
                  min="128"
                  max="2048"
                  step="128"
                  defaultValue="512"
                  className="w-full h-2 bg-[#1a1b3a] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#5865f2]"
                />
                <p className="text-xs text-[#9ca0b8] mt-2">Lower values reduce latency but may cause crackling</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white mb-1">Audio Sync</p>
                  <p className="text-sm text-[#9ca0b8]">Synchronize audio with video</p>
                </div>
                <button className="relative w-11 h-6 rounded-full bg-[#5865f2]">
                  <span className="absolute top-0.5 left-5 w-5 h-5 rounded-full bg-white"></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white mb-1">Dynamic Rate Control</p>
                  <p className="text-sm text-[#9ca0b8]">Adjust audio rate to prevent desync</p>
                </div>
                <button className="relative w-11 h-6 rounded-full bg-[#5865f2]">
                  <span className="absolute top-0.5 left-5 w-5 h-5 rounded-full bg-white"></span>
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Advanced Options</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white mb-1">Audio Interpolation</p>
                  <p className="text-sm text-[#9ca0b8]">Smoother audio playback</p>
                </div>
                <button className="relative w-11 h-6 rounded-full bg-[#5865f2]">
                  <span className="absolute top-0.5 left-5 w-5 h-5 rounded-full bg-white"></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white mb-1">Echo Cancellation</p>
                  <p className="text-sm text-[#9ca0b8]">Reduce audio echo effects</p>
                </div>
                <button className="relative w-11 h-6 rounded-full bg-[#2e3150]">
                  <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white"></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white mb-1">Surround Sound</p>
                  <p className="text-sm text-[#9ca0b8]">Enable virtual surround audio</p>
                </div>
                <button className="relative w-11 h-6 rounded-full bg-[#2e3150]">
                  <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white"></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="space-y-4">
          {/* Current Status */}
          <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Audio Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#9ca0b8]">Status</span>
                <span className="text-sm text-[#10b981]">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#9ca0b8]">Latency</span>
                <span className="text-sm text-white">12 ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#9ca0b8]">Channels</span>
                <span className="text-sm text-white">Stereo</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#9ca0b8]">Buffer</span>
                <span className="text-sm text-white">512 samples</span>
              </div>
            </div>
          </div>

          {/* Test Audio */}
          <div className="bg-gradient-to-br from-[#5865f2]/10 to-[#7c3aed]/10 border border-[#5865f2]/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Test Audio</h3>
            <p className="text-sm text-[#9ca0b8] mb-4">
              Play a test sound to verify your audio configuration
            </p>
            <button
              onClick={() => invokeBridge("OpenAudioSettings")}
              className="w-full px-4 py-2 rounded-lg bg-[#5865f2] text-white hover:bg-[#4752c4] transition-colors"
            >
              Play Test Sound
            </button>
          </div>

          {/* Tips */}
          <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Tips</h3>
            <ul className="space-y-2 text-sm text-[#9ca0b8]">
              <li className="flex gap-2">
                <span className="text-[#5865f2]">•</span>
                <span>Lower buffer size for less latency</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#5865f2]">•</span>
                <span>Enable sync to prevent audio drift</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#5865f2]">•</span>
                <span>Use headphones for best experience</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
