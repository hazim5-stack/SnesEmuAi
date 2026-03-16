import { Save, Clock, Star, Trash2, Edit, Download } from "lucide-react";

export function SaveStates() {
  const saves = [
    {
      id: 1,
      game: "Super Mario World",
      name: "Quick Save 1",
      timestamp: "2 hours ago",
      date: "Mar 14, 2026 14:30",
      location: "World 3-2",
      pinned: true,
    },
    {
      id: 2,
      game: "Super Mario World",
      name: "Before Boss Fight",
      timestamp: "Yesterday",
      date: "Mar 13, 2026 18:45",
      location: "World 4-8",
      pinned: false,
    },
    {
      id: 3,
      game: "The Legend of Zelda",
      name: "Auto Save",
      timestamp: "3 days ago",
      date: "Mar 11, 2026 20:15",
      location: "Hyrule Castle",
      pinned: true,
    },
    {
      id: 4,
      game: "Super Metroid",
      name: "Quick Save 2",
      timestamp: "1 week ago",
      date: "Mar 7, 2026 16:20",
      location: "Brinstar",
      pinned: false,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Save States</h1>
          <p className="text-[#9ca0b8]">{saves.length} save states across your games</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg bg-[#12132b] border border-[rgba(88,101,242,0.15)] text-white hover:border-[#5865f2] transition-all">
            Filter by Game
          </button>
          <button className="px-4 py-2 rounded-lg bg-[#5865f2] text-white hover:bg-[#4752c4] transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" />
            Create New Save
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-4">
          <p className="text-sm text-[#9ca0b8] mb-1">Total Saves</p>
          <p className="text-2xl font-bold text-white">48</p>
        </div>
        <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-4">
          <p className="text-sm text-[#9ca0b8] mb-1">Pinned</p>
          <p className="text-2xl font-bold text-white">12</p>
        </div>
        <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-4">
          <p className="text-sm text-[#9ca0b8] mb-1">Games</p>
          <p className="text-2xl font-bold text-white">8</p>
        </div>
        <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-4">
          <p className="text-sm text-[#9ca0b8] mb-1">Storage Used</p>
          <p className="text-2xl font-bold text-white">2.4 MB</p>
        </div>
      </div>

      {/* Save States Grid */}
      <div className="grid grid-cols-3 gap-4">
        {saves.map((save) => (
          <div
            key={save.id}
            className="group bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl overflow-hidden hover:border-[#5865f2] transition-all"
          >
            {/* Preview Image */}
            <div className="aspect-video bg-gradient-to-br from-[#1a1b3a] to-[#2e3150] relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Save className="w-12 h-12 text-[#5865f2]/30" />
              </div>
              {save.pinned && (
                <div className="absolute top-2 right-2">
                  <Star className="w-5 h-5 text-[#fbbf24] fill-current" />
                </div>
              )}
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button className="w-10 h-10 rounded-lg bg-[#5865f2] text-white flex items-center justify-center hover:bg-[#4752c4] transition-colors">
                  <Download className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-lg bg-[#12132b] text-white flex items-center justify-center hover:bg-[#1a1b3a] transition-colors">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-lg bg-[#ef4444] text-white flex items-center justify-center hover:bg-[#dc2626] transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{save.name}</h3>
                  <p className="text-sm text-[#9ca0b8]">{save.game}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#9ca0b8]">
                  <Clock className="w-3 h-3" />
                  <span>{save.timestamp}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#9ca0b8]">{save.location}</span>
                  <span className="text-[#9ca0b8]">{save.date}</span>
                </div>
              </div>
              <button className="w-full mt-3 py-2 rounded-lg bg-[#5865f2] text-white text-sm font-medium hover:bg-[#4752c4] transition-colors opacity-0 group-hover:opacity-100">
                Load Save
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-[#5865f2]/10 to-[#7c3aed]/10 border border-[#5865f2]/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Backup All Saves</h3>
          <p className="text-sm text-[#9ca0b8] mb-4">Export all save states to a backup file</p>
          <button className="px-4 py-2 rounded-lg bg-[#5865f2] text-white hover:bg-[#4752c4] transition-colors">
            Export Backup
          </button>
        </div>
        <div className="bg-gradient-to-br from-[#10b981]/10 to-[#06b6d4]/10 border border-[#10b981]/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Restore from Backup</h3>
          <p className="text-sm text-[#9ca0b8] mb-4">Import previously exported save states</p>
          <button className="px-4 py-2 rounded-lg bg-[#10b981] text-white hover:bg-[#059669] transition-colors">
            Import Backup
          </button>
        </div>
      </div>
    </div>
  );
}
