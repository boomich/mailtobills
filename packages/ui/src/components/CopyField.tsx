"use client";

import * as React from "react";
import { cn } from "../lib/cn";
import { Input } from "./Input";
import { Button } from "./Button";

interface CopyFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onCopy?: () => void;
}

export const CopyField = React.forwardRef<HTMLInputElement, CopyFieldProps>(
  ({ className, value, onCopy, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(value);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="relative flex w-full max-w-md items-center">
        <Input
          ref={ref}
          value={value}
          readOnly
          className={cn("pr-20 font-mono text-sm", className)}
          {...props}
        />
        <div className="absolute right-1 top-1 bottom-1 flex items-center">
             <Button
                type="button"
                onClick={handleCopy}
                variant="primary"
                className={cn(
                    "h-full px-3 text-xs font-medium transition-all",
                    copied ? "bg-emerald-600 hover:bg-emerald-700" : ""
                )}
                >
                {copied ? "Copied" : "Copy"}
            </Button>
        </div>
      </div>
    );
  }
);

CopyField.displayName = "CopyField";
