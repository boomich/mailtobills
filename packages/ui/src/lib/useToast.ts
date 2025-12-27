"use client";

import { useCallback, useEffect, useState } from "react";

export type ToastTone = "success" | "error" | "info";

export type ToastState = {
  message: string;
  tone?: ToastTone;
};

export const useToast = (timeoutMs = 2200) => {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((message: string, tone?: ToastTone) => {
    setToast({ message, tone });
  }, []);

  const clearToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => {
      setToast(null);
    }, timeoutMs);

    return () => window.clearTimeout(timer);
  }, [toast, timeoutMs]);

  return { toast, showToast, clearToast };
};
