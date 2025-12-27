import * as React from "react";
import { cn } from "../lib/cn";

export type SwitchProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  onCheckedChange?: (checked: boolean) => void;
};

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, disabled, onCheckedChange, ...props }, ref) => {
    return (
      <label
        className={cn(
          "inline-flex items-center gap-2",
          disabled && "opacity-60"
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          className="sr-only"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onCheckedChange?.(event.target.checked)}
          {...props}
        />
        <span
          className={cn(
            "relative h-6 w-11 rounded-full border border-slate-300 bg-slate-200 transition",
            checked && "border-brand-600 bg-brand-600",
            disabled && "cursor-not-allowed",
            className
          )}
        >
          <span
            className={cn(
              "absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition",
              checked && "translate-x-5"
            )}
          />
        </span>
      </label>
    );
  }
);

Switch.displayName = "Switch";
