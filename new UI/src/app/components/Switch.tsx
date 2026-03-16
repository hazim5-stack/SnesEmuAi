interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
}

export function Switch({ checked = false, onChange, label, description }: SwitchProps) {
  return (
    <div className="flex items-center justify-between">
      {(label || description) && (
        <div>
          {label && <p className="text-white mb-1">{label}</p>}
          {description && <p className="text-sm text-[#9ca0b8]">{description}</p>}
        </div>
      )}
      <button
        onClick={() => onChange?.(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked ? "bg-[#5865f2]" : "bg-[#2e3150]"
        }`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
            checked ? "left-5" : "left-0.5"
          }`}
        ></span>
      </button>
    </div>
  );
}
