import { Search, Bell, User } from "lucide-react";

export function TopBar() {
  return (
    <header className="h-16 border-b border-[rgba(88,101,242,0.15)] bg-[#0a0b1e]/80 backdrop-blur-xl sticky top-0 z-10">
      <div className="h-full px-6 flex items-center gap-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca0b8]" />
            <input
              type="text"
              placeholder="Search games, cheats, or settings..."
              className="w-full h-10 pl-10 pr-4 bg-[#1a1b3a] border border-[rgba(88,101,242,0.15)] rounded-lg text-white placeholder:text-[#9ca0b8] focus:outline-none focus:ring-2 focus:ring-[#5865f2] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-lg bg-[#1a1b3a] hover:bg-[#2e3150] border border-[rgba(88,101,242,0.15)] flex items-center justify-center text-[#9ca0b8] hover:text-white transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#ef4444] rounded-full border-2 border-[#0a0b1e]"></span>
          </button>
          <button className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#5865f2] to-[#7c3aed] flex items-center justify-center text-white hover:shadow-lg hover:shadow-[#5865f2]/30 transition-all">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
