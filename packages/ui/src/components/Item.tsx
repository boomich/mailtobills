import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const itemVariants = cva(
  "flex items-center gap-3 rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
  {
    variants: {
      variant: {
        default: "bg-slate-50 border border-slate-200",
        outline: "border border-slate-200 bg-transparent hover:bg-slate-50",
        muted: "bg-slate-100/50",
      },
      size: {
        default: "p-4",
        sm: "p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof itemVariants> {
  asChild?: boolean;
}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(itemVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Item.displayName = "Item";

const ItemGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1", className)}
    {...props}
  />
));
ItemGroup.displayName = "ItemGroup";

const ItemSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("h-px bg-slate-200", className)}
    {...props}
  />
));
ItemSeparator.displayName = "ItemSeparator";

const itemMediaVariants = cva("flex-shrink-0", {
  variants: {
    variant: {
      default: "",
      icon: "flex items-center justify-center",
      image: "overflow-hidden rounded",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ItemMediaProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof itemMediaVariants> {}

const ItemMedia = React.forwardRef<HTMLDivElement, ItemMediaProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(itemMediaVariants({ variant }), className)}
      {...props}
    />
  )
);
ItemMedia.displayName = "ItemMedia";

const ItemContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-1 flex-col gap-1 min-w-0", className)}
    {...props}
  />
));
ItemContent.displayName = "ItemContent";

const ItemTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm font-medium text-slate-900 leading-none", className)}
    {...props}
  />
));
ItemTitle.displayName = "ItemTitle";

const ItemDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-slate-600 leading-relaxed", className)}
    {...props}
  />
));
ItemDescription.displayName = "ItemDescription";

const ItemActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2 flex-shrink-0", className)}
    {...props}
  />
));
ItemActions.displayName = "ItemActions";

const ItemHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1", className)}
    {...props}
  />
));
ItemHeader.displayName = "ItemHeader";

const ItemFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1 mt-2", className)}
    {...props}
  />
));
ItemFooter.displayName = "ItemFooter";

export {
  Item,
  ItemGroup,
  ItemSeparator,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemHeader,
  ItemFooter,
};

