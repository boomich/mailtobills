import * as React from "react";
import { cn } from "../lib/cn";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = ({ className, ...props }: LabelProps) => {
  return (
    <label
      className={cn("block text-sm font-medium text-slate-800", className)}
      {...props}
    />
  );
};
