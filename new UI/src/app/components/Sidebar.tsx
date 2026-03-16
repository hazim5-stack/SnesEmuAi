import { NavLink } from "react-router";
import {
  Home,
  Library,
  Play,
  Code,
  Save,
  Gamepad2,
  Monitor,
  Volume2,
  Sparkles,
  Settings,
  Wrench,
  HelpCircle,
} from "lucide-react";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/library", label: "Library", icon: Library },
  { path: "/play", label: "Play", icon: Play },
  { path: "/cheats", label: "Cheats", icon: Code },
  { path: "/save-states", label: "Save States", icon: Save },
  { path: "/controls", label: "Controls", icon: Gamepad2 },
  { path: "/graphics", label: "Graphics", icon: Monitor },
  { path: "/audio", label: "Audio", icon: Volume2 },
  { path: "/ai-assistant", label: "AI Assistant", icon: Sparkles },
  { path: "/settings", label: "Settings", icon: Settings },
  { path: "/legacy-tools", label: "Legacy Tools", icon: Wrench },
];

export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-[#0d0e22] border-r border-[rgba(88,101,242,0.2)] flex flex-col">
      {/* Logo Header */}
      <div className="p-5 border-b border-[rgba(88,101,242,0.2)]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#ef4444] via-[#f59e0b] to-[#fbbf24] flex items-center justify-center shadow-lg shadow-[#ef4444]/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
            <Gamepad2 className="w-7 h-7 text-white relative z-10" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white leading-tight">SNES</h1>
            <h2 className="text-base font-bold bg-gradient-to-r from-[#5865f2] to-[#7c3aed] bg-clip-text text-transparent leading-tight">Emu AI</h2>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-3">
        <ul className="space-y-0.5">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                    isActive
                      ? "bg-[#5865f2] text-white shadow-md"
                      : "text-[#9ca0b8] hover:bg-[#1a1b3a] hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="flex-1 text-sm">{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-[rgba(88,101,242,0.2)] flex items-center justify-center gap-3">
        <button className="w-10 h-10 rounded-lg bg-[#1a1b3a] hover:bg-[#5865f2] text-[#9ca0b8] hover:text-white transition-all flex items-center justify-center">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 rounded-lg bg-[#1a1b3a] hover:bg-[#5865f2] text-[#9ca0b8] hover:text-white transition-all flex items-center justify-center">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
}