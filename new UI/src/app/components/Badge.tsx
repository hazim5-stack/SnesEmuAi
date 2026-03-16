import { LucideIcon } from "lucide-react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "success" | "warning" | "error";
  icon?: LucideIcon;
}

export function Badge({ children, variant = "default", icon: Icon }: BadgeProps) {
  const variants = {
    default: "bg-[#2e3150] text-white",
    primary: "bg-[#5865f2] text-white",
    success: "bg-[#10b981] text-white",
    warning: "bg-[#f59e0b] text-white",
    error: "bg-[#ef4444] text-white",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${variants[variant]}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
}
