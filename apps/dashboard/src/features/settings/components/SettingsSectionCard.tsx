import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@mailtobills/ui";

export type SettingsSectionCardProps = {
  id: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export const SettingsSectionCard = ({
  id,
  title,
  description,
  actions,
  children,
}: SettingsSectionCardProps) => {
  return (
    <Card id={id} className="scroll-mt-24">
      <CardHeader className="border-b border-slate-200 bg-slate-50">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <CardTitle>{title}</CardTitle>
            {description ? (
              <p className="text-sm text-slate-600">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">{children}</CardContent>
    </Card>
  );
};
