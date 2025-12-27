import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import type { ToastTone } from "../lib/useToast";

export type ToastProps = {
  message: ReactNode;
  tone?: ToastTone;
  className?: string;
};

const toneStyles: Record<ToastTone, string> = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  error: "border-red-200 bg-red-50 text-red-700",
  info: "border-slate-200 bg-slate-50 text-slate-700",
};

export const Toast = ({ message, tone = "info", className }: ToastProps) => (
  <div
    className={cn(
      "inline-flex items-center rounded-md border px-3 py-2 text-xs font-medium",
      toneStyles[tone],
      className
    )}
    role="status"
    aria-live="polite"
  >
    {message}
  </div>
);
