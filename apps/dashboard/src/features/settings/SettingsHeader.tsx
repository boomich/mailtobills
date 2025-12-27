import type { ReactNode } from "react";

import { cn } from "@mailtobills/ui";

export type SettingsHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
};

export const SettingsHeader = ({
  title,
  subtitle,
  actions,
  className,
}: SettingsHeaderProps) => (
  <div className={cn("flex flex-wrap items-start justify-between gap-4", className)}>
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
      {subtitle ? <p className="text-sm text-slate-600">{subtitle}</p> : null}
    </div>
    {actions ? <div className="shrink-0">{actions}</div> : null}
  </div>
);
