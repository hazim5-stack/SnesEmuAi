import { useState } from "react";
import { Grid, List, SlidersHorizontal, FolderPlus, RefreshCw, Star } from "lucide-react";
import { GameCard } from "../components/GameCard";

export function Library() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState("all");

  const games = [
    { id: "1", title: "Super Mario World", region: "USA", favorite: true, hasCheats: true, saveCount: 5, lastPlayed: "2 hours ago" },
    { id: "2", title: "The Legend of Zelda: A Link to the Past", region: "USA", favorite: true, hasCheats: true, saveCount: 3, lastPlayed: "Yesterday" },
    { id: "3", title: "Super Metroid", region: "USA", favorite: false, hasCheats: true, saveCount: 8, lastPlayed: "3 days ago" },
    { id: "4", title: "Chrono Trigger", region: "USA", favorite: true, hasCheats: true, saveCount: 12, lastPlayed: "1 week ago" },
    { id: "5", title: "Final Fantasy VI", region: "USA", favorite: false, hasCheats: false, saveCount: 2, lastPlayed: "2 weeks ago" },
    { id: "6", title: "Donkey Kong Country", region: "USA", favorite: false, hasCheats: true, saveCount: 0, lastPlayed: "Never" },
    { id: "7", title: "Street Fighter II Turbo", region: "USA", favorite: false, hasCheats: true, saveCount: 1, lastPlayed: "1 month ago" },
    { id: "8", title: "Mega Man X", region: "USA", favorite: true, hasCheats: true, saveCount: 4, lastPlayed: "5 days ago" },
  ];

  const filteredGames = games.filter((game) => {
    if (filter === "favorites") return game.favorite;
    if (filter === "cheats") return game.hasCheats;
    if (filter === "saves") return game.saveCount > 0;
    return true;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Game Library</h1>
          <p className="text-[#9ca0b8]">{games.length} games in your collection</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg bg-[#12132b] border border-[rgba(88,101,242,0.15)] text-white hover:border-[#5865f2] transition-all flex items-center gap-2">
            <FolderPlus className="w-4 h-4" />
            Scan Folders
          </button>
          <button className="px-4 py-2 rounded-lg bg-[#5865f2] text-white hover:bg-[#4752c4] transition-colors flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh Library
          </button>
        </div>
      </div>

      {/* Filters & View */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === "all"
                ? "bg-[#5865f2] text-white"
                : "bg-[#12132b] border border-[rgba(88,101,242,0.15)] text-[#9ca0b8] hover:text-white hover:border-[#5865f2]"
            }`}
          >
            All Games
          </button>
          <button
            onClick={() => setFilter("favorites")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              filter === "favorites"
                ? "bg-[#5865f2] text-white"
                : "bg-[#12132b] border border-[rgba(88,101,242,0.15)] text-[#9ca0b8] hover:text-white hover:border-[#5865f2]"
            }`}
          >
            <Star className="w-4 h-4" />
            Favorites
          </button>
          <button
            onClick={() => setFilter("cheats")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === "cheats"
                ? "bg-[#5865f2] text-white"
                : "bg-[#12132b] border border-[rgba(88,101,242,0.15)] text-[#9ca0b8] hover:text-white hover:border-[#5865f2]"
            }`}
          >
            With Cheats
          </button>
          <button
            onClick={() => setFilter("saves")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === "saves"
                ? "bg-[#5865f2] text-white"
                : "bg-[#12132b] border border-[rgba(88,101,242,0.15)] text-[#9ca0b8] hover:text-white hover:border-[#5865f2]"
            }`}
          >
            With Saves
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-lg bg-[#12132b] border border-[rgba(88,101,242,0.15)] text-[#9ca0b8] hover:text-white hover:border-[#5865f2] transition-all flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Sort
          </button>
          <div className="flex items-center gap-1 bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-lg p-1">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded transition-all ${
                view === "grid" ? "bg-[#5865f2] text-white" : "text-[#9ca0b8] hover:text-white"
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded transition-all ${
                view === "list" ? "bg-[#5865f2] text-white" : "text-[#9ca0b8] hover:text-white"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      {view === "grid" ? (
        <div className="grid grid-cols-4 gap-4">
          {filteredGames.map((game) => (
            <GameCard key={game.id} {...game} />
          ))}
        </div>
      ) : (
        <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#1a1b3a] border-b border-[rgba(88,101,242,0.15)]">
              <tr className="text-left text-sm text-[#9ca0b8]">
                <th className="p-4 font-medium">Game Title</th>
                <th className="p-4 font-medium">Region</th>
                <th className="p-4 font-medium">Last Played</th>
                <th className="p-4 font-medium">Saves</th>
                <th className="p-4 font-medium">Cheats</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGames.map((game, i) => (
                <tr
                  key={game.id}
                  className={`text-white hover:bg-[#1a1b3a] transition-colors ${
                    i !== filteredGames.length - 1 ? "border-b border-[rgba(88,101,242,0.1)]" : ""
                  }`}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {game.favorite && <Star className="w-4 h-4 text-[#fbbf24] fill-current" />}
                      <span>{game.title}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-md bg-[#1a1b3a] text-xs">{game.region}</span>
                  </td>
                  <td className="p-4 text-[#9ca0b8]">{game.lastPlayed}</td>
                  <td className="p-4">
                    <span className={game.saveCount > 0 ? "text-[#10b981]" : "text-[#9ca0b8]"}>
                      {game.saveCount}
                    </span>
                  </td>
                  <td className="p-4">
                    {game.hasCheats ? (
                      <span className="px-2 py-1 rounded-md bg-[#7c3aed] text-white text-xs">Available</span>
                    ) : (
                      <span className="text-[#9ca0b8] text-xs">None</span>
                    )}
                  </td>
                  <td className="p-4">
                    <button className="px-3 py-1.5 rounded-lg bg-[#5865f2] text-white text-sm hover:bg-[#4752c4] transition-colors">
                      Play
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
