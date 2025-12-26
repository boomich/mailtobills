import * as React from "react";
import { cn } from "../lib/cn";
import { Button, ButtonProps } from "./Button";

export interface IconButtonProps extends ButtonProps {
  icon?: React.ReactNode;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        className={cn("h-8 w-8", className)}
        {...props}
      >
        {icon || children}
      </Button>
    );
  }
);
IconButton.displayName = "IconButton";

export { IconButton };
