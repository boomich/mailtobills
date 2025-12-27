"use client";

import { useState } from "react";

import { Button, Input, Toast, cn, useToast } from "@mailtobills/ui";

export type CopyFieldProps = {
  label?: string;
  value: string;
  className?: string;
};

export const CopyField = ({ label, value, className }: CopyFieldProps) => {
  const [isCopying, setIsCopying] = useState(false);
  const { toast, showToast } = useToast();

  const handleCopy = async () => {
    if (isCopying) return;
    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(value);
      showToast("Copied to clipboard", "success");
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Unable to copy right now.",
        "error"
      );
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label ? (
        <p className="text-sm font-medium text-slate-700">{label}</p>
      ) : null}
      <div className="flex flex-wrap items-center gap-2">
        <Input value={value} readOnly />
        <Button onClick={handleCopy} disabled={isCopying}>
          {isCopying ? "Copying..." : "Copy"}
        </Button>
      </div>
      {toast ? (
        <Toast message={toast.message} tone={toast.tone ?? "info"} />
      ) : null}
    </div>
  );
};
