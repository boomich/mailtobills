"use client";

import * as React from "react";

import { cn } from "../lib/cn";

export type TooltipPosition = "top" | "bottom" | "left" | "right";

export type TooltipProps = {
  className?: string;
  content: React.ReactNode;
  children: React.ReactElement;
  position?: TooltipPosition;
};

export const Tooltip = ({
  content,
  children,
  className,
  position = "top",
}: TooltipProps) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return {
          tooltip: "bottom-full left-1/2 mb-1.5 -translate-x-1/2",
          arrow:
            "before:top-full before:left-1/2 before:-translate-x-1/2 before:border-t-slate-900",
        };
      case "bottom":
        return {
          tooltip: "top-full left-1/2 mt-1.5 -translate-x-1/2",
          arrow:
            "before:bottom-full before:left-1/2 before:-translate-x-1/2 before:border-b-slate-900",
        };
      case "left":
        return {
          tooltip: "right-full top-1/2 mr-1.5 -translate-y-1/2",
          arrow:
            "before:-right-0.5 before:top-1/2 before:-translate-y-1/2 before:translate-x-1.5 before:border-l-slate-900",
        };
      case "right":
        return {
          tooltip: "left-full top-1/2 ml-1.5 -translate-y-1/2",
          arrow:
            "before:-left-0.5 before:top-1/2 before:-translate-y-1/2 before:-translate-x-1.5 before:border-r-slate-900",
        };
    }
  };

  const positionClasses = getPositionClasses();

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
            "absolute z-50 rounded-md bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg whitespace-nowrap",
            positionClasses.tooltip,
            "before:absolute before:border-4 before:border-transparent",
            positionClasses.arrow
          )}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
};
