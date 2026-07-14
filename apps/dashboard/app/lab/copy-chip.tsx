"use client";

import { useState } from "react";

export function CopyChip({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className="group flex min-w-0 items-center gap-2.5 border border-border bg-background px-3 py-1.5 transition-colors hover:border-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1400);
      }}
    >
      <span className="truncate font-mono text-[12px] font-bold">{value}</span>
      <span className="shrink-0 font-display text-[9.5px] font-bold tracking-[0.14em] text-primary uppercase [font-stretch:88%]">
        {copied ? "Copiado" : "Copiar"}
      </span>
    </button>
  );
}
