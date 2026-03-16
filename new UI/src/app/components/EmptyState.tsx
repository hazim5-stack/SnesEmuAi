import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#5865f2]/10 to-[#7c3aed]/10 border border-[rgba(88,101,242,0.2)] flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-[#5865f2]" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-[#9ca0b8] max-w-md mb-6">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 rounded-lg bg-[#5865f2] text-white font-medium hover:bg-[#4752c4] transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
