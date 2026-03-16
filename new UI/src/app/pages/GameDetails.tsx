import { useParams, Link } from "react-router";
import { Play, Star, Code, Save, Clock, Info, Settings, ArrowLeft } from "lucide-react";

export function GameDetails() {
  const { gameId } = useParams();

  const game = {
    id: gameId,
    title: "Super Mario World",
    region: "USA",
    platform: "Super Nintendo (SNES)",
    version: "v1.0",
    size: "512 KB",
    hash: "CRC32: A31BEAD4",
    lastPlayed: "2 hours ago",
    playtime: "24 hours",
    favorite: true,
  };

  const saveStates = [
    { id: 1, name: "Quick Save 1", timestamp: "2 hours ago", level: "World 3-2" },
    { id: 2, name: "Before Boss", timestamp: "Yesterday", level: "World 4-8" },
    { id: 3, name: "Auto Save", timestamp: "3 days ago", level: "World 2-5" },
  ];

  const activeCheats = [
    { id: 1, name: "Infinite Lives", enabled: true },
    { id: 2, name: "All Power-ups", enabled: true },
    { id: 3, name: "Unlock All Levels", enabled: false },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <Link
        to="/library"
        className="inline-flex items-center gap-2 text-[#9ca0b8] hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Library
      </Link>

      {/* Game Header */}
      <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl overflow-hidden">
        <div className="flex">
          {/* Cover */}
          <div className="w-80 h-96 bg-gradient-to-br from-red-500 to-orange-500 flex-shrink-0"></div>

          {/* Info */}
          <div className="flex-1 p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">{game.title}</h1>
                  <button className="text-[#fbbf24] hover:scale-110 transition-transform">
                    <Star className={`w-6 h-6 ${game.favorite ? "fill-current" : ""}`} />
                  </button>
                </div>
                <p className="text-[#9ca0b8]">{game.platform}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 rounded-lg bg-[#12132b] border border-[rgba(88,101,242,0.15)] text-white hover:border-[#5865f2] transition-all flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Options
                </button>
                <Link
                  to={`/play/${game.id}`}
                  className="px-6 py-2 rounded-lg bg-[#5865f2] text-white hover:bg-[#4752c4] transition-colors flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Play Now
                </Link>
              </div>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-[#1a1b3a] rounded-lg p-3 border border-[rgba(88,101,242,0.1)]">
                <p className="text-xs text-[#9ca0b8] mb-1">Region / Version</p>
                <p className="text-white">{game.region} • {game.version}</p>
              </div>
              <div className="bg-[#1a1b3a] rounded-lg p-3 border border-[rgba(88,101,242,0.1)]">
                <p className="text-xs text-[#9ca0b8] mb-1">Last Played</p>
                <p className="text-white flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {game.lastPlayed}
                </p>
              </div>
              <div className="bg-[#1a1b3a] rounded-lg p-3 border border-[rgba(88,101,242,0.1)]">
                <p className="text-xs text-[#9ca0b8] mb-1">Total Playtime</p>
                <p className="text-white">{game.playtime}</p>
              </div>
            </div>

            {/* ROM Info */}
            <div className="bg-[#1a1b3a] rounded-lg p-4 border border-[rgba(88,101,242,0.1)]">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-[#5865f2]" />
                <h3 className="font-semibold text-white">ROM Information</h3>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#9ca0b8]">File Size:</span>
                  <span className="text-white">{game.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9ca0b8]">Hash:</span>
                  <span className="text-white font-mono text-xs">{game.hash}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Save States */}
        <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Save className="w-5 h-5 text-[#10b981]" />
              Save States
            </h2>
            <Link to="/save-states" className="text-sm text-[#5865f2] hover:text-[#7c3aed]">
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {saveStates.map((save) => (
              <div
                key={save.id}
                className="bg-[#1a1b3a] border border-[rgba(88,101,242,0.1)] rounded-lg p-3 hover:border-[#5865f2] transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-white">{save.name}</h3>
                  <span className="text-xs text-[#9ca0b8]">{save.timestamp}</span>
                </div>
                <p className="text-sm text-[#9ca0b8]">{save.level}</p>
              </div>
            ))}
            <button className="w-full py-2 rounded-lg border-2 border-dashed border-[rgba(88,101,242,0.2)] text-[#9ca0b8] hover:border-[#5865f2] hover:text-white transition-all">
              + Create New Save
            </button>
          </div>
        </div>

        {/* Cheats */}
        <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-[#7c3aed]" />
              Active Cheats
            </h2>
            <Link to="/cheats" className="text-sm text-[#5865f2] hover:text-[#7c3aed]">
              Manage →
            </Link>
          </div>
          <div className="space-y-3">
            {activeCheats.map((cheat) => (
              <div
                key={cheat.id}
                className="flex items-center justify-between bg-[#1a1b3a] border border-[rgba(88,101,242,0.1)] rounded-lg p-3"
              >
                <span className="text-white">{cheat.name}</span>
                <button
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    cheat.enabled ? "bg-[#5865f2]" : "bg-[#2e3150]"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                      cheat.enabled ? "left-5" : "left-0.5"
                    }`}
                  ></span>
                </button>
              </div>
            ))}
            <button className="w-full py-2 rounded-lg border-2 border-dashed border-[rgba(88,101,242,0.2)] text-[#9ca0b8] hover:border-[#5865f2] hover:text-white transition-all">
              + Add Cheat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
