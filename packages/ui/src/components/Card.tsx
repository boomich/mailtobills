import * as React from "react";
import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export type CardProps = HTMLAttributes<HTMLDivElement>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    const classes = cn(
      "rounded-lg border border-slate-200 bg-white text-slate-900 shadow-sm",
      className,
    );

    return <div ref={ref} className={classes} {...props} />;
  },
);

Card.displayName = "Card";

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    const classes = cn("flex flex-col gap-1 p-4", className);
    return <div ref={ref} className={classes} {...props} />;
  },
);

CardHeader.displayName = "CardHeader";

export type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    const classes = cn("text-lg font-semibold leading-tight", className);
    return <h3 ref={ref} className={classes} {...props} />;
  },
);

CardTitle.displayName = "CardTitle";

export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => {
  const classes = cn("text-sm text-slate-600", className);
  return <p ref={ref} className={classes} {...props} />;
});

CardDescription.displayName = "CardDescription";

export type CardContentProps = HTMLAttributes<HTMLDivElement>;

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    const classes = cn("p-4 pt-0", className);
    return <div ref={ref} className={classes} {...props} />;
  },
);

CardContent.displayName = "CardContent";
