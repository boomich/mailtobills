import type { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./Card";

export type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export const EmptyState = ({ title, description, action }: EmptyStateProps) => (
  <Card className="border-dashed text-center">
    <CardHeader>
      <CardTitle className="text-base">{title}</CardTitle>
      {description ? <CardDescription>{description}</CardDescription> : null}
    </CardHeader>
    {action ? <CardContent className="flex justify-center">{action}</CardContent> : null}
  </Card>
);
