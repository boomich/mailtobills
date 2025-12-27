import { Card, CardContent, CardHeader, Skeleton } from "@mailtobills/ui";

export const SettingsSkeleton = () => {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <Card key={`skeleton-${index}`}>
          <CardHeader className="border-b border-slate-200 bg-slate-50">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-56" />
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-4 w-28" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
