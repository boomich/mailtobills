import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Button } from "@mailtobills/ui/components/button";
import { Postmark } from "@mailtobills/ui/components/postmark";

/*
 * DASHBOARD LAB — the dispatch ritual (mock data, dev only).
 * Static mirror of components/send-to-accountant-dialog.tsx for
 * screenshot review (DESIGN.md §10.2): the registered-mail form state
 * and the dispatched state, side by side. Not a product surface.
 */

export const metadata: Metadata = {
  title: "LAB — dispatch ritual",
  robots: { index: false },
};

function SheetFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid w-full max-w-[520px] border bg-background shadow-[4px_4px_0_0_oklch(0.27_0.025_268_/_0.15)]">
      {children}
    </div>
  );
}

function SheetHeader() {
  return (
    <div className="grid gap-2 border-b-2 border-foreground px-6 pt-6 pb-4 text-left">
      <div className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
        M/2026-07 · CORREIO REGISTADO
      </div>
      <h2 className="font-display text-2xl font-extrabold tracking-[-0.01em] [font-stretch:110%]">
        Send July 2026 to your accountant
      </h2>
      <p className="text-[13.5px] text-muted-foreground">
        Confirm the addressee and dispatch this month&apos;s Accountant
        Export by email — every Primary PDF plus manifest.csv.
      </p>
    </div>
  );
}

export default function DispatchLabPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <div className="min-h-svh bg-secondary px-4 py-10 text-foreground sm:px-8">
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <defs>
          <filter id="ink-rough-dispatch">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.55"
              numOctaves="2"
              seed="11"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" />
          </filter>
        </defs>
      </svg>

      <p className="mx-auto mb-8 max-w-[1100px] font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
        LAB · The dispatch ritual — form state / dispatched state
      </p>

      <div className="mx-auto flex max-w-[1100px] flex-wrap items-start justify-center gap-10">
        <SheetFrame>
          <SheetHeader />
          <div className="grid gap-4 px-6 py-5">
            <div className="grid gap-1.5">
              <span className="font-display text-[11px] font-bold tracking-[0.12em] uppercase [font-stretch:86%]">
                Addressee
              </span>
              <span className="border-b border-foreground/25 pb-1.5 font-mono text-[13px] break-all">
                contabilista@escritorio.pt
              </span>
            </div>
            <div className="grid gap-1.5">
              <span className="font-display text-[11px] font-bold tracking-[0.12em] uppercase [font-stretch:86%]">
                Contents
              </span>
              <span className="border-b border-foreground/25 pb-1.5 font-mono text-[13px]">
                8 Primary PDFs + manifest.csv
              </span>
            </div>
          </div>
          <div className="border-t-2 border-dashed border-foreground/50 px-6 pt-4 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-display text-[12px] font-bold tracking-[0.12em] uppercase [font-stretch:88%]">
                Ready to dispatch
              </span>
              <div className="flex flex-wrap justify-end gap-2.5">
                <Button variant="outline">Cancel</Button>
                <Button>Send export</Button>
              </div>
            </div>
          </div>
        </SheetFrame>

        <SheetFrame>
          <SheetHeader />
          <div className="grid place-items-center gap-5 px-6 py-9 text-center">
            <div className="text-stamp mix-blend-multiply [filter:url(#ink-rough-dispatch)]">
              <Postmark
                date="JUL 26"
                className="h-[84px] w-auto rotate-[-2deg]"
                label="Dispatched"
              />
            </div>
            <p className="text-[14px] text-muted-foreground">
              Sent to contabilista@escritorio.pt
            </p>
            <Button variant="outline" className="mt-1">
              Close
            </Button>
          </div>
        </SheetFrame>
      </div>
    </div>
  );
}
