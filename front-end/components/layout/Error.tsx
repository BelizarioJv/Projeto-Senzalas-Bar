import { AlertCircle } from "lucide-react";

interface ErrorProps {
  message?: string;
}

export function Error({ message }: ErrorProps) {
  return (
    <div
      className="flex items-center justify-center gap-2 text-red-600"
      role="alert"
      aria-live="assertive">
      <AlertCircle className="h-5 w-5" />
      <span>{message}</span>
    </div>
  );
}
