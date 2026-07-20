import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@mailtobills/ui/lib/utils";

const statGroupVariants = cva("", {
  variants: {
    variant: {
      grid: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
      row: "divide-border bg-card grid grid-cols-1 divide-y overflow-hidden border sm:grid-cols-3 sm:divide-x sm:divide-y-0",
    },
  },
  defaultVariants: {
    variant: "grid",
  },
});

function StatGroup({
  className,
  variant = "grid",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof statGroupVariants>) {
  return (
    <div
      data-slot="stat-group"
      data-variant={variant}
      className={cn(statGroupVariants({ variant, className }))}
      {...props}
    />
  );
}

function Stat({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat"
      className={cn("flex min-w-0 items-center gap-3", className)}
      {...props}
    />
  );
}

const statIconVariants = cva(
  "flex size-10 shrink-0 items-center justify-center border [&>svg]:size-5",
  {
    variants: {
      tone: {
        neutral: "bg-background text-foreground",
        success: "border-primary/20 bg-primary/10 text-primary",
        warning: "border-foreground/20 bg-secondary text-secondary-foreground",
        info: "border-primary/20 bg-primary/10 text-primary",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);

function StatIcon({
  className,
  tone = "neutral",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof statIconVariants>) {
  return (
    <div
      data-slot="stat-icon"
      data-tone={tone}
      className={cn(statIconVariants({ tone, className }))}
      {...props}
    />
  );
}

function StatContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-content"
      className={cn("min-w-0 space-y-1", className)}
      {...props}
    />
  );
}

function StatLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-label"
      className={cn(
        "text-muted-foreground truncate font-mono text-[11px] font-medium tracking-[0.08em] uppercase",
        className,
      )}
      {...props}
    />
  );
}

function StatValue({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-value"
      className={cn(
        "text-2xl leading-none font-semibold tracking-tight tabular-nums",
        className,
      )}
      {...props}
    />
  );
}

/* Aster-style tile, used inside StatGroup variant="row" */
function StatTile({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-tile"
      className={cn("flex min-w-0 flex-col gap-3 p-4 md:p-5", className)}
      {...props}
    />
  );
}

function StatTileHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-tile-header"
      className={cn(
        "text-muted-foreground flex items-center justify-between gap-2 [&>svg]:size-3.5 [&>svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function StatTileFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-tile-footer"
      className={cn(
        "mt-auto flex items-center justify-between gap-2",
        className,
      )}
      {...props}
    />
  );
}

function StatTilePeriod({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="stat-tile-period"
      className={cn(
        "text-muted-foreground border px-1.5 py-0.5 font-mono text-[10px] font-medium tracking-[0.08em] whitespace-nowrap uppercase",
        className,
      )}
      {...props}
    />
  );
}

export {
  StatGroup,
  Stat,
  StatIcon,
  StatContent,
  StatLabel,
  StatValue,
  StatTile,
  StatTileHeader,
  StatTileFooter,
  StatTilePeriod,
};
