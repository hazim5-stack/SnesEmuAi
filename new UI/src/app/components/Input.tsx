import { LucideIcon } from "lucide-react";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  className?: string;
}

export function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  icon: Icon,
  iconPosition = "left",
  className = "",
}: InputProps) {
  return (
    <div className="relative">
      {Icon && iconPosition === "left" && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca0b8]" />
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full h-12 ${Icon && iconPosition === "left" ? "pl-10" : "pl-4"} ${
          Icon && iconPosition === "right" ? "pr-10" : "pr-4"
        } bg-[#1a1b3a] border border-[rgba(88,101,242,0.15)] rounded-lg text-white placeholder:text-[#9ca0b8] focus:outline-none focus:ring-2 focus:ring-[#5865f2] focus:border-transparent transition-all ${className}`}
      />
      {Icon && iconPosition === "right" && (
        <Icon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca0b8]" />
      )}
    </div>
  );
}
