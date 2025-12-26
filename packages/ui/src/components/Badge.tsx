import * as React from "react";
import { cn } from "../lib/cn";

export type BadgeVariant = "success" | "warning" | "neutral";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  neutral: "bg-slate-100 text-slate-700",
};

export const Badge = ({
  className,
  variant = "neutral",
  ...props
}: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
      variantClasses[variant],
      className
    )}
    {...props}
  />
);
