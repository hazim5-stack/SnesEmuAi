import { useState } from "react";
import { Code, Search, Sparkles, Filter, Plus, Star, Shield, Info } from "lucide-react";

export function Cheats() {
  const [activeTab, setActiveTab] = useState<"browse" | "ai-finder">("browse");
  const [gameSearch, setGameSearch] = useState("");
  const [cheatSearch, setCheatSearch] = useState("");

  const cheats = [
    {
      id: 1,
      game: "Super Mario World",
      name: "Infinite Lives",
      code: "7E0DBE63",
      type: "Game Genie",
      trusted: true,
      enabled: true,
      sources: 5,
    },
    {
      id: 2,
      game: "Super Mario World",
      name: "All Power-ups",
      code: "7E0019FF",
      type: "Action Replay",
      trusted: true,
      enabled: true,
      sources: 3,
    },
    {
      id: 3,
      game: "The Legend of Zelda",
      name: "Infinite Health",
      code: "7EF36D14",
      type: "Game Genie",
      trusted: true,
      enabled: false,
      sources: 8,
    },
    {
      id: 4,
      game: "Super Metroid",
      name: "Infinite Missiles",
      code: "7E09C663",
      type: "Game Genie",
      trusted: false,
      enabled: false,
      sources: 2,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Cheat Management</h1>
        <p className="text-[#9ca0b8]">Discover and manage game cheats with AI assistance</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab("browse")}
          className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
            activeTab === "browse"
              ? "bg-[#5865f2] text-white shadow-lg shadow-[#5865f2]/20"
              : "bg-[#12132b] border border-[rgba(88,101,242,0.15)] text-[#9ca0b8] hover:text-white hover:border-[#5865f2]"
          }`}
        >
          <Code className="w-4 h-4" />
          Browse Cheats
        </button>
        <button
          onClick={() => setActiveTab("ai-finder")}
          className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
            activeTab === "ai-finder"
              ? "bg-gradient-to-r from-[#7c3aed] to-[#ec4899] text-white shadow-lg shadow-[#7c3aed]/20"
              : "bg-[#12132b] border border-[rgba(88,101,242,0.15)] text-[#9ca0b8] hover:text-white hover:border-[#5865f2]"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          AI Cheat Finder
        </button>
      </div>

      {activeTab === "browse" ? (
        <div className="space-y-6">
          {/* Search & Filters */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca0b8]" />
              <input
                type="text"
                placeholder="Search by game name..."
                value={gameSearch}
                onChange={(e) => setGameSearch(e.target.value)}
                className="w-full h-12 pl-10 pr-4 bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-lg text-white placeholder:text-[#9ca0b8] focus:outline-none focus:ring-2 focus:ring-[#5865f2] focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca0b8]" />
              <input
                type="text"
                placeholder="Search by cheat name..."
                value={cheatSearch}
                onChange={(e) => setCheatSearch(e.target.value)}
                className="w-full h-12 pl-10 pr-4 bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-lg text-white placeholder:text-[#9ca0b8] focus:outline-none focus:ring-2 focus:ring-[#5865f2] focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter & Actions Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 rounded-lg bg-[#12132b] border border-[rgba(88,101,242,0.15)] text-white hover:border-[#5865f2] transition-all flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <div className="h-6 w-px bg-[rgba(88,101,242,0.15)]"></div>
              <button className="px-3 py-2 rounded-lg text-sm text-[#9ca0b8] hover:text-white hover:bg-[#1a1b3a] transition-all">
                All
              </button>
              <button className="px-3 py-2 rounded-lg text-sm text-[#9ca0b8] hover:text-white hover:bg-[#1a1b3a] transition-all">
                Enabled
              </button>
              <button className="px-3 py-2 rounded-lg text-sm text-[#9ca0b8] hover:text-white hover:bg-[#1a1b3a] transition-all">
                Trusted
              </button>
              <button className="px-3 py-2 rounded-lg text-sm text-[#9ca0b8] hover:text-white hover:bg-[#1a1b3a] transition-all">
                Game Genie
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 rounded-lg bg-[#12132b] border border-[rgba(88,101,242,0.15)] text-[#9ca0b8] hover:text-white hover:border-[#5865f2] transition-all">
                Bulk Enable
              </button>
              <button className="px-4 py-2 rounded-lg bg-[#5865f2] text-white hover:bg-[#4752c4] transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Custom Cheat
              </button>
            </div>
          </div>

          {/* Cheats List */}
          <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#1a1b3a] border-b border-[rgba(88,101,242,0.15)]">
                <tr className="text-left text-sm text-[#9ca0b8]">
                  <th className="p-4 font-medium">Game</th>
                  <th className="p-4 font-medium">Cheat Name</th>
                  <th className="p-4 font-medium">Code</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium">Trust</th>
                  <th className="p-4 font-medium">Sources</th>
                  <th className="p-4 font-medium">Enabled</th>
                </tr>
              </thead>
              <tbody>
                {cheats.map((cheat, i) => (
                  <tr
                    key={cheat.id}
                    className={`text-white hover:bg-[#1a1b3a] transition-colors ${
                      i !== cheats.length - 1 ? "border-b border-[rgba(88,101,242,0.1)]" : ""
                    }`}
                  >
                    <td className="p-4">{cheat.game}</td>
                    <td className="p-4 font-medium">{cheat.name}</td>
                    <td className="p-4">
                      <code className="px-2 py-1 rounded bg-[#1a1b3a] text-sm font-mono text-[#5865f2]">
                        {cheat.code}
                      </code>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-md bg-[#2e3150] text-xs">{cheat.type}</span>
                    </td>
                    <td className="p-4">
                      {cheat.trusted ? (
                        <div className="flex items-center gap-1 text-[#10b981]">
                          <Shield className="w-4 h-4" />
                          <span className="text-sm">Verified</span>
                        </div>
                      ) : (
                        <span className="text-[#f59e0b] text-sm">Unverified</span>
                      )}
                    </td>
                    <td className="p-4 text-[#9ca0b8]">{cheat.sources}</td>
                    <td className="p-4">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* AI Finder Panel */}
          <div className="bg-gradient-to-br from-[#7c3aed]/10 to-[#ec4899]/10 border border-[#7c3aed]/30 rounded-xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#ec4899] flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">AI Cheat Discovery Assistant</h2>
                <p className="text-[#9ca0b8]">
                  Use AI to intelligently search for cheats by describing what you want. The AI will help you find the right keywords and aliases.
                </p>
              </div>
            </div>

            {/* Input Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Platform Preset</label>
                <select className="w-full h-12 px-4 bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#5865f2] focus:border-transparent">
                  <option>Super Nintendo (SNES)</option>
                  <option>Nintendo Entertainment System (NES)</option>
                  <option>Sega Genesis</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Game Name</label>
                <input
                  type="text"
                  placeholder="e.g., Super Mario World"
                  className="w-full h-12 px-4 bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-lg text-white placeholder:text-[#9ca0b8] focus:outline-none focus:ring-2 focus:ring-[#5865f2] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  What cheats are you looking for?
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Type and press Enter to add..."
                    className="flex-1 h-12 px-4 bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-lg text-white placeholder:text-[#9ca0b8] focus:outline-none focus:ring-2 focus:ring-[#5865f2] focus:border-transparent"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-[#5865f2] text-white text-sm flex items-center gap-2">
                    infinite lives
                    <button className="hover:text-[#ef4444]">×</button>
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-[#5865f2] text-white text-sm flex items-center gap-2">
                    invincibility
                    <button className="hover:text-[#ef4444]">×</button>
                  </span>
                </div>
              </div>

              <button className="w-full h-12 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#ec4899] text-white font-medium hover:shadow-lg hover:shadow-[#7c3aed]/30 transition-all flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Search with AI
              </button>
            </div>
          </div>

          {/* AI Results */}
          <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Info className="w-5 h-5 text-[#5865f2]" />
              <h3 className="text-lg font-semibold text-white">AI Suggestions</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-[#1a1b3a] border border-[rgba(88,101,242,0.1)] rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-white mb-1">Recommended Keywords</h4>
                    <p className="text-sm text-[#9ca0b8]">Based on your search, try these terms:</p>
                  </div>
                  <span className="px-2 py-1 rounded-md bg-[#10b981]/20 text-[#10b981] text-xs font-medium">
                    High Confidence
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <button className="px-3 py-1.5 rounded-lg bg-[#5865f2]/10 border border-[#5865f2]/30 text-[#5865f2] text-sm hover:bg-[#5865f2] hover:text-white transition-all">
                    unlimited lives
                  </button>
                  <button className="px-3 py-1.5 rounded-lg bg-[#5865f2]/10 border border-[#5865f2]/30 text-[#5865f2] text-sm hover:bg-[#5865f2] hover:text-white transition-all">
                    immortality
                  </button>
                  <button className="px-3 py-1.5 rounded-lg bg-[#5865f2]/10 border border-[#5865f2]/30 text-[#5865f2] text-sm hover:bg-[#5865f2] hover:text-white transition-all">
                    god mode
                  </button>
                  <button className="px-3 py-1.5 rounded-lg bg-[#5865f2]/10 border border-[#5865f2]/30 text-[#5865f2] text-sm hover:bg-[#5865f2] hover:text-white transition-all">
                    never die
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-3 rounded-lg bg-[#5865f2] text-white hover:bg-[#4752c4] transition-colors">
                  Search Internal Database
                </button>
                <button className="flex-1 px-4 py-3 rounded-lg border border-[rgba(88,101,242,0.15)] text-white hover:border-[#5865f2] transition-all">
                  Copy Keywords
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
