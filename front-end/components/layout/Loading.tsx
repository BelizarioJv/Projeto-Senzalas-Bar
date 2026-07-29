import { Loader2 } from "lucide-react";

interface LoadingProps {
  message?: string;
}

export function Loading({ message = "Carregando..." }: LoadingProps) {
  return (
    <div
      className="flex items-center justify-center gap-2"
      role="status"
      aria-live="polite">
      <Loader2 className="h-5 w-5 animate-spin text-gray-600" />
      <span>{message}</span>
    </div>
  );
}
