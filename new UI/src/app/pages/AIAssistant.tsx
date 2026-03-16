import { Sparkles, Send, Code, Lightbulb, HelpCircle, Zap } from "lucide-react";

export function AIAssistant() {
  const suggestions = [
    { icon: Code, title: "Find Cheats", desc: "Search for cheats for current game", color: "from-[#7c3aed] to-[#ec4899]" },
    { icon: Lightbulb, title: "Game Tips", desc: "Get tips and strategies", color: "from-[#f59e0b] to-[#ef4444]" },
    { icon: HelpCircle, title: "Troubleshooting", desc: "Fix common issues", color: "from-[#10b981] to-[#06b6d4]" },
    { icon: Zap, title: "Optimize Settings", desc: "Best settings for your system", color: "from-[#5865f2] to-[#7c3aed]" },
  ];

  const recentActions = [
    { action: "Found 8 new cheats for Super Mario World", time: "2 hours ago" },
    { action: "Suggested optimal graphics settings", time: "Yesterday" },
    { action: "Provided walkthrough tips for Zelda", time: "3 days ago" },
  ];

  const conversation = [
    {
      role: "assistant",
      message: "Hello! I'm your AI assistant for SNES Emu Ai. I can help you find cheats, optimize settings, troubleshoot issues, and provide game tips. What would you like help with today?",
    },
    {
      role: "user",
      message: "Find cheats for infinite lives in Super Mario World",
    },
    {
      role: "assistant",
      message: "I found several cheats for infinite lives in Super Mario World:\n\n1. **Infinite Lives** (Game Genie)\n   Code: 7E0DBE63\n   Verified by 5 sources\n\n2. **99 Lives** (Action Replay)\n   Code: 7E0DBE63\n   Verified by 3 sources\n\nWould you like me to enable these cheats for you?",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#ec4899] flex items-center justify-center">
          <Sparkles className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">AI Assistant</h1>
          <p className="text-[#9ca0b8]">Your intelligent gaming companion</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Chat Panel */}
        <div className="col-span-2 space-y-4">
          {/* Chat Messages */}
          <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6 h-[600px] flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {conversation.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-xl p-4 ${
                      msg.role === "user"
                        ? "bg-[#5865f2] text-white"
                        : "bg-[#1a1b3a] border border-[rgba(88,101,242,0.1)] text-white"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-[#7c3aed]" />
                        <span className="text-sm font-medium text-[#7c3aed]">AI Assistant</span>
                      </div>
                    )}
                    <p className="whitespace-pre-line text-sm leading-relaxed">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask me anything about games, cheats, or settings..."
                className="flex-1 h-12 px-4 bg-[#1a1b3a] border border-[rgba(88,101,242,0.15)] rounded-lg text-white placeholder:text-[#9ca0b8] focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
              />
              <button className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#ec4899] text-white flex items-center justify-center hover:shadow-lg hover:shadow-[#7c3aed]/30 transition-all">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {suggestions.map((item, i) => (
                <button
                  key={i}
                  className="group bg-[#1a1b3a] border border-[rgba(88,101,242,0.1)] rounded-lg p-4 hover:border-[#5865f2] transition-all text-center"
                >
                  <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs font-medium text-white mb-1">{item.title}</p>
                  <p className="text-xs text-[#9ca0b8]">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Actions */}
          <div className="bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Actions</h3>
            <div className="space-y-3">
              {recentActions.map((action, i) => (
                <div key={i} className="bg-[#1a1b3a] border border-[rgba(88,101,242,0.1)] rounded-lg p-3">
                  <p className="text-sm text-white mb-1">{action.action}</p>
                  <p className="text-xs text-[#9ca0b8]">{action.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Info */}
          <div className="bg-gradient-to-br from-[#7c3aed]/10 to-[#ec4899]/10 border border-[#7c3aed]/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">About AI Assistant</h3>
            <p className="text-sm text-[#9ca0b8] mb-4">
              The AI assistant uses advanced language models to help you with game cheats, optimization, troubleshooting, and tips.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#10b981]">
              <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
              <span>AI Model Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
