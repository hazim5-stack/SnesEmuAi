import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Gamepad2, Loader2 } from "lucide-react";

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading, then redirect to home
    const timer = setTimeout(() => {
      navigate("/");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-[#0a0b1e] via-[#12132b] to-[#1a1b3a] flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5865f2]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7c3aed]/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#5865f2] to-[#7c3aed] flex items-center justify-center shadow-2xl shadow-[#5865f2]/30 animate-bounce">
            <Gamepad2 className="w-14 h-14 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">
          SNES Emu Ai
        </h1>
        <p className="text-lg text-[#9ca0b8] mb-12">Premium Edition</p>

        {/* Loading indicator */}
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-[#5865f2] animate-spin" />
          <p className="text-sm text-[#9ca0b8]">Initializing emulator core...</p>
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-64 mx-auto">
          <div className="h-1 bg-[#1a1b3a] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#5865f2] to-[#7c3aed] rounded-full animate-[loading_2s_ease-in-out]"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
