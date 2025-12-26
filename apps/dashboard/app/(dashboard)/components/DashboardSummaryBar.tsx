import { Card, cn } from "@mailtobills/ui";

export type SummaryItem = {
  label: string;
  value: string;
  tone?: "default" | "warning" | "success";
};

export type DashboardSummaryBarProps = {
  items: SummaryItem[];
};

export const DashboardSummaryBar = ({ items }: DashboardSummaryBarProps) => (
  <Card className="border-none bg-slate-50 shadow-none">
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center gap-2">
          <span
            className={cn(
              "font-semibold",
              item.tone === "success" && "text-emerald-600",
              item.tone === "warning" && "text-amber-600",
              item.tone === "default" && "text-slate-900",
              !item.tone && "text-slate-900"
            )}
          >
            {item.value}
          </span>
          <span className="text-slate-600">{item.label}</span>
          {index < items.length - 1 ? (
            <span className="mx-1 hidden h-4 w-px bg-slate-200 sm:inline-block" />
          ) : null}
        </div>
      ))}
    </div>
  </Card>
);
