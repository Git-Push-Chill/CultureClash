import { useState, useCallback } from "react";
import type { ToastType } from "@/components/ui/toast";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

let toastCount = 0;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (
      type: ToastType,
      title: string,
      description?: string,
      duration?: number
    ) => {
      const id = `toast-${toastCount++}`;
      const toast: Toast = { id, type, title, description, duration };
      setToasts((prev) => [...prev, toast]);
      return id;
    },
    []
  );

  const closeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (title: string, description?: string) =>
      showToast("success", title, description),
    [showToast]
  );

  const error = useCallback(
    (title: string, description?: string) =>
      showToast("error", title, description),
    [showToast]
  );

  const warning = useCallback(
    (title: string, description?: string) =>
      showToast("warning", title, description),
    [showToast]
  );

  const info = useCallback(
    (title: string, description?: string) =>
      showToast("info", title, description),
    [showToast]
  );

  return {
    toasts,
    showToast,
    closeToast,
    success,
    error,
    warning,
    info,
  };
}
