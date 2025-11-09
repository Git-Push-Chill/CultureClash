import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const toastStyles: Record<ToastType, string> = {
  success: "bg-green-500/90 border-green-400",
  error: "bg-red-500/90 border-red-400",
  warning: "bg-yellow-500/90 border-yellow-400",
  info: "bg-blue-500/90 border-blue-400",
};

export function Toast({
  id,
  type,
  title,
  description,
  duration = 5000,
  onClose,
}: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border-2 shadow-lg text-white animate-slide-in-right min-w-[300px] max-w-[400px]",
        toastStyles[type]
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex-1">
        <p className="font-semibold">{title}</p>
        {description && (
          <p className="text-sm opacity-90 mt-1">{description}</p>
        )}
      </div>
      <button
        onClick={() => onClose(id)}
        className="shrink-0 hover:opacity-70 transition-opacity"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export function ToastContainer({
  toasts,
  onClose,
}: {
  toasts: Array<ToastProps>;
  onClose: (id: string) => void;
}) {
  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  );
}
