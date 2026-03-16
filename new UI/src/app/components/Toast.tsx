import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";

interface ToastProps {
  type?: "success" | "error" | "warning" | "info";
  message: string;
  onClose: () => void;
}

export function Toast({ type = "info", message, onClose }: ToastProps) {
  const config = {
    success: {
      icon: CheckCircle,
      bg: "from-[#10b981]/10 to-[#059669]/10",
      border: "border-[#10b981]/30",
      iconColor: "text-[#10b981]",
    },
    error: {
      icon: XCircle,
      bg: "from-[#ef4444]/10 to-[#dc2626]/10",
      border: "border-[#ef4444]/30",
      iconColor: "text-[#ef4444]",
    },
    warning: {
      icon: AlertCircle,
      bg: "from-[#f59e0b]/10 to-[#d97706]/10",
      border: "border-[#f59e0b]/30",
      iconColor: "text-[#f59e0b]",
    },
    info: {
      icon: Info,
      bg: "from-[#5865f2]/10 to-[#4752c4]/10",
      border: "border-[#5865f2]/30",
      iconColor: "text-[#5865f2]",
    },
  };

  const { icon: Icon, bg, border, iconColor } = config[type];

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r ${bg} border ${border} shadow-lg`}>
      <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0`} />
      <p className="text-sm text-white flex-1">{message}</p>
      <button
        onClick={onClose}
        className="w-6 h-6 rounded flex items-center justify-center text-[#9ca0b8] hover:text-white hover:bg-[#1a1b3a] transition-all"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export function ToastContainer({ children }: { children: React.ReactNode }) {
  return <div className="fixed bottom-6 right-6 z-50 space-y-3 max-w-md">{children}</div>;
}
