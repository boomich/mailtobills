import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  cn,
} from "@mailtobills/ui";

export type SettingsCardProps = {
  id: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export const SettingsCard = ({
  id,
  title,
  description,
  actions,
  children,
  className,
}: SettingsCardProps) => (
  <Card id={id} className={cn("scroll-mt-24", className)}>
    <CardHeader className="border-b border-slate-200 bg-slate-50">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          {description ? (
            <p className="text-sm text-slate-600">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
    </CardHeader>
    <CardContent className="pt-4">{children}</CardContent>
  </Card>
);
