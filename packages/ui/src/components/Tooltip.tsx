"use client";

import * as React from "react";
import { cn } from "../lib/cn";

export type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactElement;
  className?: string;
};

export const Tooltip = ({ content, children, className }: TooltipProps) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            "absolute bottom-full left-1/2 z-50 mb-1.5 -translate-x-1/2 rounded-md bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg whitespace-nowrap",
            "before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-slate-900"
          )}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
};

