import { Wrench, Database, FileCode, Terminal, Settings, Box, HardDrive, Bug } from "lucide-react";

export function LegacyTools() {
  const tools = [
    {
      category: "Memory Tools",
      items: [
        { name: "Memory Viewer", desc: "View and edit game memory in real-time", icon: Database },
        { name: "Cheat Search", desc: "Advanced cheat code search engine", icon: FileCode },
        { name: "Memory Scanner", desc: "Scan memory for specific values", icon: HardDrive },
      ],
    },
    {
      category: "Development",
      items: [
        { name: "Debug Console", desc: "Low-level debugging interface", icon: Terminal },
        { name: "CPU Monitor", desc: "Monitor CPU usage and cycles", icon: Bug },
        { name: "ROM Info Tool", desc: "View detailed ROM information", icon: Box },
      ],
    },
    {
      category: "Advanced Settings",
      items: [
        { name: "Core Configuration", desc: "Configure emulator core settings", icon: Settings },
        { name: "Compatibility Mode", desc: "Legacy compatibility options", icon: Wrench },
      ],
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Legacy Tools</h1>
        <p className="text-[#9ca0b8]">Advanced tools and utilities for power users</p>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-[#f59e0b]/10 to-[#ef4444]/10 border border-[#f59e0b]/30 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#f59e0b] flex items-center justify-center flex-shrink-0">
            <Wrench className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">About Legacy Tools</h3>
            <p className="text-[#9ca0b8] mb-4">
              This section provides access to advanced features and utilities from previous versions of the emulator. 
              These tools are designed for power users and developers who need low-level access to emulator functions. 
              Use these tools with caution as they can affect emulator stability.
            </p>
            <p className="text-sm text-[#f59e0b]">
              ⚠️ Advanced users only - Improper use may cause issues
            </p>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      {tools.map((category, i) => (
        <div key={i} className="space-y-4">
          <h2 className="text-xl font-semibold text-white">{category.category}</h2>
          <div className="grid grid-cols-3 gap-4">
            {category.items.map((tool, j) => (
              <button
                key={j}
                className="group bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6 hover:border-[#5865f2] transition-all hover:shadow-xl hover:shadow-[#5865f2]/10 text-left"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#5865f2] to-[#7c3aed] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{tool.name}</h3>
                    <p className="text-sm text-[#9ca0b8]">{tool.desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#9ca0b8]">Click to open</span>
                  <span className="text-xs px-2 py-1 rounded bg-[#1a1b3a] text-[#5865f2]">Legacy</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Additional Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Compatibility Notes</h3>
          <ul className="space-y-2 text-sm text-[#9ca0b8]">
            <li className="flex gap-2">
              <span className="text-[#5865f2]">•</span>
              <span>These tools use legacy interfaces from older versions</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#5865f2]">•</span>
              <span>Some features may not be fully integrated with new UI</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#5865f2]">•</span>
              <span>Changes made here may not sync with main interface</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Documentation</h3>
          <p className="text-sm text-[#9ca0b8] mb-4">
            For detailed information about each legacy tool, please refer to the documentation.
          </p>
          <button className="px-4 py-2 rounded-lg bg-[#5865f2] text-white hover:bg-[#4752c4] transition-colors">
            View Documentation
          </button>
        </div>
      </div>
    </div>
  );
}
