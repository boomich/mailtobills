import * as React from "react";
import { cn } from "../lib/cn";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = ({ className, ...props }: CardProps) => (
  <div
    className={cn(
      "rounded-lg border border-slate-200 bg-white shadow-sm",
      className
    )}
    {...props}
  />
);

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export const CardHeader = ({ className, ...props }: CardHeaderProps) => (
  <div className={cn("flex flex-col gap-1 p-4", className)} {...props} />
);

export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export const CardTitle = ({ className, ...props }: CardTitleProps) => (
  <h3 className={cn("text-lg font-semibold text-slate-900", className)} {...props} />
);

export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export const CardDescription = ({
  className,
  ...props
}: CardDescriptionProps) => (
  <p className={cn("text-sm text-slate-600", className)} {...props} />
);

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export const CardContent = ({ className, ...props }: CardContentProps) => (
  <div className={cn("p-4 pt-0", className)} {...props} />
);
