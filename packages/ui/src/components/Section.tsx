import * as React from "react";
import { cn } from "../lib/cn";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./Card";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ className, title, description, children, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn("overflow-hidden", className)} {...props}>
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-3">
          <CardTitle className="text-base font-medium text-slate-700">
            {title}
          </CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="p-6 pt-6">{children}</CardContent>
      </Card>
    );
  }
);

Section.displayName = "Section";
