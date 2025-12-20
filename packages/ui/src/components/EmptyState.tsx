import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Card } from "./Card";

export type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export const EmptyState = ({
  title,
  description,
  action,
  className,
}: EmptyStateProps) => {
  return (
    <Card className={cn("flex flex-col items-center gap-3 p-8 text-center", className)}>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {description ? (
          <p className="text-sm text-slate-600">{description}</p>
        ) : null}
      </div>
      {action ? <div className="flex items-center gap-2">{action}</div> : null}
    </Card>
  );
};
