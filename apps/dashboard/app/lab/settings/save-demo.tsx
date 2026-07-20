"use client";

import { useState } from "react";

import { Button } from "@mailtobills/ui/components/button";

/* Save feedback: a confirmation chip that prints (§8 thunk), postal blue —
   never violet (saving a setting is not certification). */
export function SaveDemo({ label = "Guardar" }: { label?: string }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <Button
        size="sm"
        onClick={() => {
          setSaved(false);
          requestAnimationFrame(() => setSaved(true));
          window.setTimeout(() => setSaved(false), 2200);
        }}
      >
        {label}
      </Button>
      {saved && (
        <span className="carimbo-thunk border border-primary px-2 py-1 font-mono text-[10px] font-bold tracking-[0.12em] text-primary uppercase">
          Guardado ✓
        </span>
      )}
    </div>
  );
}
