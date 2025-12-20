import * as React from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export type ButtonVariant = "primary" | "secondary";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const getVariantClasses = (variant: ButtonVariant) => {
  if (variant === "secondary") {
    return "border border-slate-300 bg-white text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-slate-400";
  }

  return "bg-brand-600 text-white shadow hover:bg-brand-700 focus-visible:outline-brand-600";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, type = "button", ...props }, ref) => {
    const classes = cn(baseClasses, getVariantClasses(variant), className);

    return <button ref={ref} type={type} className={classes} {...props} />;
  },
);

Button.displayName = "Button";
