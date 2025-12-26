import { Card, CardContent } from "@mailtobills/ui";

export type DashboardSummaryBarProps = {
  total: number;
  missingFile: number;
  needsReview: number;
  isLoading?: boolean;
};

const SummaryItem = ({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "primary" | "warning" | "neutral";
}) => {
  const toneClasses =
    tone === "warning"
      ? "text-amber-600"
      : tone === "neutral"
        ? "text-slate-600"
        : "text-brand-600";

  return (
    <div className="flex items-center gap-3">
      <span className={`text-sm font-semibold ${toneClasses}`}>{value}</span>
      <span className="text-sm text-slate-600">{label}</span>
    </div>
  );
};

export const DashboardSummaryBar = ({
  total,
  missingFile,
  needsReview,
  isLoading,
}: DashboardSummaryBarProps) => {
  const reviewed = Math.max(total - missingFile - needsReview, 0);

  return (
    <Card className="bg-slate-50">
      <CardContent className="flex flex-wrap items-center gap-4 py-4">
        <SummaryItem
          label="invoices"
          value={isLoading ? "--" : String(total)}
          tone="primary"
        />
        <div className="h-4 w-px bg-slate-200" />
        <SummaryItem
          label="missing files"
          value={isLoading ? "--" : String(missingFile)}
          tone="warning"
        />
        <div className="h-4 w-px bg-slate-200" />
        <SummaryItem
          label="needs review"
          value={isLoading ? "--" : String(needsReview)}
          tone="neutral"
        />
        <div className="h-4 w-px bg-slate-200" />
        <SummaryItem
          label="reviewed"
          value={isLoading ? "--" : String(reviewed)}
          tone="primary"
        />
      </CardContent>
    </Card>
  );
};
