import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader2 className="w-12 h-12 text-[#5865f2] animate-spin mb-4" />
      <p className="text-[#9ca0b8]">{message}</p>
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-[#1a1b3a] rounded-lg w-1/3"></div>
      <div className="grid grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="aspect-[3/4] bg-[#1a1b3a] rounded-xl"></div>
        ))}
      </div>
    </div>
  );
}
