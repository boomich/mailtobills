import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export type SectionProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export const Section = ({
  title,
  description,
  actions,
  children,
  className,
}: SectionProps) => (
  <section className={cn("space-y-4", className)}>
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        {description ? (
          <p className="text-sm text-slate-600">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
    <div className="space-y-4">{children}</div>
  </section>
);
