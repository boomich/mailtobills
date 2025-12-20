import * as React from "react";
import { cn } from "../lib/cn";

export type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export const EmptyState = ({
  title,
  description,
  action,
  className,
}: EmptyStateProps) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white px-6 py-10 text-center shadow-sm",
      className
    )}
  >
    <h3 className="text-base font-semibold text-slate-900">{title}</h3>
    {description ? (
      <p className="mt-1 text-sm text-slate-600">{description}</p>
    ) : null}
    {action ? <div className="mt-4">{action}</div> : null}
  </div>
);
