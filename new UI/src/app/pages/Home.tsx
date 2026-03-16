import { Play, Clock, Star, Code, Save, Sparkles, TrendingUp, RotateCcw, Zap, Ban, Bookmark, MessageSquare } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Home() {
  const recentGames = [
    { 
      id: "1", 
      title: "Super Mario World", 
      image: "https://images.unsplash.com/photo-1758862493283-51f1e23b8883?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
    },
    { 
      id: "2", 
      title: "Chrono Trigger", 
      image: "https://images.unsplash.com/photo-1587653666447-8a232c92e881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
    },
    { 
      id: "3", 
      title: "Super Metroid", 
      image: "https://images.unsplash.com/photo-1566577134669-e1e944d0ae11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
    },
    { 
      id: "4", 
      title: "Final Fantasy VI", 
      image: "https://images.unsplash.com/photo-1599548291260-8a88e3d3b095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
    },
  ];

  const currentGame = {
    id: "1",
    title: "Super Mario World",
    subtitle: "Just play Mario World",
    image: "https://images.unsplash.com/photo-1758862493283-51f1e23b8883?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    progress: 65,
    lastPlayed: "3 minutes ago"
  };

  const quickActions = [
    { icon: Bookmark, label: "Load State", color: "from-[#5865f2] to-[#7c3aed]" },
    { icon: Save, label: "Save State", color: "from-[#7c3aed] to-[#a855f7]" },
    { icon: RotateCcw, label: "Reset", color: "from-[#6366f1] to-[#8b5cf6]" },
    { icon: Zap, label: "Enable Cheats", color: "from-[#8b5cf6] to-[#a855f7]" },
  ];

  const recentSaves = [
    { id: "1", name: "Yoshi's Island 1", game: "Final Fantasy", time: "21:34", image: "https://images.unsplash.com/photo-1599548291260-8a88e3d3b095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100" },
    { id: "2", name: "Donut Ghost House", game: "Final Fantasy", time: "21:30", image: "https://images.unsplash.com/photo-1566577134669-e1e944d0ae11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100" },
  ];

  const cheats = [
    { name: "All Levels Completed", status: "Enable Level" },
    { name: "Infinite Lives", status: "Yanille Level" },
    { name: "Always Keep Fire Flower", status: "" },
    { name: "Max Coin Count [99]", status: "" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0b1e]">
      {/* Stars background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="stars-bg"></div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Welcome back</h1>
        </div>

        {/* Recently Played */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Recently Played</h2>
          <div className="grid grid-cols-4 gap-4">
            {recentGames.map((game) => (
              <Link
                key={game.id}
                to={`/play/${game.id}`}
                className="group relative rounded-xl overflow-hidden hover:ring-2 hover:ring-[#5865f2] transition-all"
              >
                <div className="aspect-square">
                  <ImageWithFallback
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <p className="text-white text-sm font-semibold">{game.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Continue Playing */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Continue Playing</h2>
          <div className="bg-[#1a1b3a] border border-[rgba(88,101,242,0.2)] rounded-xl p-4 flex items-center gap-4">
            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
              <ImageWithFallback
                src={currentGame.image}
                alt={currentGame.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">{currentGame.title}</h3>
              <p className="text-sm text-[#9ca0b8] mb-3">{currentGame.subtitle}</p>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-[#0a0b1e] rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#5865f2] to-[#7c3aed]"
                    style={{ width: `${currentGame.progress}%` }}
                  />
                </div>
                <p className="text-xs text-[#9ca0b8] whitespace-nowrap">Last play {currentGame.lastPlayed}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-lg bg-[#5865f2]/10 hover:bg-[#5865f2]/20 flex items-center justify-center text-[#5865f2] transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-lg bg-[#5865f2]/10 hover:bg-[#5865f2]/20 flex items-center justify-center text-[#5865f2] transition-colors">
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="flex gap-3">
            {quickActions.map((action, i) => (
              <button
                key={i}
                className={`flex-1 bg-gradient-to-br ${action.color} rounded-lg px-4 py-3 text-white font-medium hover:shadow-lg hover:shadow-[#5865f2]/20 transition-all flex items-center justify-center gap-2`}
              >
                <action.icon className="w-5 h-5" />
                {action.label}
              </button>
            ))}
            <button className="bg-[#1a1b3a] border border-[rgba(88,101,242,0.2)] rounded-lg px-6 py-3 text-[#9ca0b8] hover:text-white hover:border-[#5865f2] transition-all flex items-center justify-center gap-2">
              <Ban className="w-5 h-5" />
              Disable All
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-[#0d0e22] border-l border-[rgba(88,101,242,0.2)] overflow-y-auto p-4 space-y-4 relative z-10">
        {/* Welcome Card */}
        <div className="bg-gradient-to-br from-[#5865f2]/20 to-[#7c3aed]/20 border border-[#5865f2]/30 rounded-xl overflow-hidden">
          <div className="bg-[#ef4444] text-white text-xs px-3 py-1 flex items-center justify-between">
            <span>Welcome back</span>
            <div className="flex items-center gap-2">
              <button className="w-5 h-5 rounded bg-white/20 hover:bg-white/30 flex items-center justify-center">
                <span className="text-xs">🏠</span>
              </button>
              <button className="w-5 h-5 rounded bg-white/20 hover:bg-white/30 flex items-center justify-center">
                <span className="text-xs">☰</span>
              </button>
            </div>
          </div>
          <div className="p-3">
            <div className="rounded-lg overflow-hidden mb-2">
              <ImageWithFallback
                src={currentGame.image}
                alt="Super Mario World"
                className="w-full h-32 object-cover"
              />
            </div>
            <h3 className="text-white font-semibold">Super Mario World</h3>
            <p className="text-xs text-[#9ca0b8]">Super Mario World (USA), 1991 - Nintendo</p>
          </div>
        </div>

        {/* Recent Save States */}
        <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-4">
          <h3 className="text-white font-semibold mb-3">Recent Save States</h3>
          <div className="space-y-2">
            {recentSaves.map((save) => (
              <div key={save.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1a1b3a] transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={save.image}
                    alt={save.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate">{save.name}</p>
                  <p className="text-xs text-[#9ca0b8]">{save.game}</p>
                </div>
                <span className="text-xs text-[#9ca0b8]">{save.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cheats for this Game */}
        <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold">Cheats for this Game</h3>
            <div className="flex items-center gap-1">
              <button className="text-xs text-[#5865f2] hover:text-[#7c3aed]">SNES AI Cheats</button>
              <button className="text-xs text-[#5865f2] hover:text-[#7c3aed]">Disable All</button>
              <button className="w-5 h-5 rounded bg-[#1a1b3a] hover:bg-[#5865f2]/20 flex items-center justify-center">
                <span className="text-xs text-[#9ca0b8]">☰</span>
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {cheats.map((cheat, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-[#1a1b3a] last:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-[#9ca0b8] text-sm">▸</span>
                  <span className="text-sm text-white">{cheat.name}</span>
                </div>
                {cheat.status && (
                  <span className="text-xs text-[#9ca0b8]">{cheat.status}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI Assistant */}
        <div className="bg-gradient-to-br from-[#5865f2]/10 to-[#7c3aed]/10 border border-[#5865f2]/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#5865f2] to-[#7c3aed] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">Ready to help!</p>
              <p className="text-xs text-[#9ca0b8]">How can I assist you?</p>
            </div>
            <button className="w-8 h-8 rounded-lg bg-[#5865f2] hover:bg-[#7c3aed] flex items-center justify-center text-white transition-colors">
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .stars-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 60px 70px, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 50px 50px, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 130px 80px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 90px 10px, #fff, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          opacity: 0.3;
          animation: stars-move 100s linear infinite;
        }
        @keyframes stars-move {
          from { transform: translateY(0); }
          to { transform: translateY(-200px); }
        }
      `}</style>
    </div>
  );
}