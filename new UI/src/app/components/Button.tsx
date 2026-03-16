import { LucideIcon } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  onClick,
  disabled = false,
  className = "",
}: ButtonProps) {
  const variants = {
    primary: "bg-[#5865f2] text-white hover:bg-[#4752c4]",
    secondary: "bg-[#2e3150] text-white hover:bg-[#3a3d5c]",
    outline: "border border-[rgba(88,101,242,0.15)] text-white hover:border-[#5865f2] hover:bg-[#1a1b3a]",
    ghost: "text-[#9ca0b8] hover:text-white hover:bg-[#1a1b3a]",
    danger: "bg-[#ef4444] text-white hover:bg-[#dc2626]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-lg font-medium transition-all ${variants[variant]} ${sizes[size]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {Icon && iconPosition === "left" && <Icon className="w-4 h-4" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="w-4 h-4" />}
    </button>
  );
}
