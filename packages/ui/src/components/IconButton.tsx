import * as React from "react";
import { cn } from "../lib/cn";

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

const baseClasses =
  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300";

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ asChild, className, children, ...props }, ref) => {
    const classes = cn(baseClasses, className);

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: cn(classes, children.props.className),
        ...props,
      });
    }

    return (
      <button ref={ref} className={classes} type="button" {...props}>
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
