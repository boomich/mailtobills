import * as React from "react";
import type { LabelHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    const classes = cn("block text-sm font-medium text-slate-700", className);

    return <label ref={ref} className={classes} {...props} />;
  },
);

Label.displayName = "Label";
