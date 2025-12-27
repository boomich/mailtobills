"use client";

import { useState } from "react";
import { Button, Input, cn } from "@mailtobills/ui";

export type CopyFieldProps = {
  value: string;
  helperText?: string;
  className?: string;
};

export const CopyField = ({ value, helperText, className }: CopyFieldProps) => {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 2000);
    } catch (error) {
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 2000);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <Input value={value} readOnly className="flex-1 bg-slate-50" />
        <Button onClick={handleCopy} variant="secondary">
          {status === "copied" ? "Copied" : "Copy"}
        </Button>
      </div>
      {helperText ? <p className="text-sm text-slate-500">{helperText}</p> : null}
      {status === "error" ? (
        <p className="text-sm text-red-500">Unable to copy right now.</p>
      ) : null}
    </div>
  );
};
