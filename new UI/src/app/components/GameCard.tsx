import { Play, Star, Code, Save } from "lucide-react";
import { Link } from "react-router";

interface GameCardProps {
  id: string;
  title: string;
  region?: string;
  favorite?: boolean;
  hasCheats?: boolean;
  saveCount?: number;
  coverUrl?: string;
  lastPlayed?: string;
}

export function GameCard({
  id,
  title,
  region = "USA",
  favorite = false,
  hasCheats = false,
  saveCount = 0,
  coverUrl,
  lastPlayed,
}: GameCardProps) {
  return (
    <Link
      to={`/library/${id}`}
      className="group relative bg-[#12132b] rounded-xl border border-[rgba(88,101,242,0.15)] overflow-hidden hover:border-[#5865f2] transition-all hover:shadow-xl hover:shadow-[#5865f2]/10 hover:-translate-y-1"
    >
      {/* Cover Image */}
      <div className="aspect-[3/4] bg-gradient-to-br from-[#1a1b3a] to-[#2e3150] relative overflow-hidden">
        {coverUrl ? (
          <img src={coverUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-[#5865f2]/10 flex items-center justify-center">
                <Play className="w-8 h-8 text-[#5865f2]" />
              </div>
              <p className="text-xs text-[#9ca0b8]">No Cover</p>
            </div>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <button className="w-full py-2 rounded-lg bg-[#5865f2] text-white font-medium flex items-center justify-center gap-2 hover:bg-[#4752c4] transition-colors">
            <Play className="w-4 h-4" />
            Play Now
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {favorite && (
            <span className="px-2 py-1 rounded-md bg-[#fbbf24] text-[#0a0b1e] text-xs font-medium flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
            </span>
          )}
          {hasCheats && (
            <span className="px-2 py-1 rounded-md bg-[#7c3aed] text-white text-xs font-medium flex items-center gap-1">
              <Code className="w-3 h-3" />
            </span>
          )}
        </div>

        {/* Region Badge */}
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 rounded-md bg-[#1a1b3a]/90 backdrop-blur-sm border border-[rgba(88,101,242,0.2)] text-white text-xs font-medium">
            {region}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-medium text-white truncate mb-1">{title}</h3>
        <div className="flex items-center justify-between text-xs text-[#9ca0b8]">
          <span>{lastPlayed || "Never played"}</span>
          {saveCount > 0 && (
            <span className="flex items-center gap-1">
              <Save className="w-3 h-3" />
              {saveCount}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
