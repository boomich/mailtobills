"use client";

/*
 * CARIMBO lab — live stamp demo. Encodes DESIGN.md §7 (the Carimbo) and
 * §8 (the thunk). Jitter is deterministic, seeded from the document id
 * (DESIGN.md §10.5) — never Math.random() at render.
 */

import { useState } from "react";

function seededJitter(id: string): number {
  let hash = 0;
  for (const char of id) {
    hash = ((hash << 5) - hash + char.charCodeAt(0)) | 0;
  }
  // Map to [-2, 2] degrees, DESIGN.md §7.
  return (Math.abs(hash) % 400) / 100 - 2;
}

export function Carimbo({
  id,
  date,
  ref_,
  animate = false,
  tone = "stamp",
  angle,
}: {
  id: string;
  date: string;
  ref_: string;
  animate?: boolean;
  tone?: "stamp" | "signal" | "ink";
  /** Composed placements may fix the angle deliberately (still ±2°, §7). */
  angle?: number;
}) {
  const jitter = angle ?? seededJitter(id);
  return (
    <div
      className={`carimbo carimbo--${tone}${animate ? " carimbo--thunk" : ""}`}
      style={{ "--jitter": `${jitter}deg` } as React.CSSProperties}
    >
      <span className="carimbo__word">RECEBIDO</span>
      <span className="carimbo__date">{date}</span>
      <span className="carimbo__ref">{ref_}</span>
    </div>
  );
}

export function StampDemo() {
  const [collected, setCollected] = useState(false);

  return (
    <div className="stamp-demo">
      <div className="sheet" aria-live="polite">
        <div className="sheet__meta">
          <span className="field-label">From</span>
          <span className="mono">billing@acmehosting.com</span>
          <span className="field-label">Subject</span>
          <span className="mono">Fwd: Your receipt from Acme Hosting</span>
          <span className="field-label">Attachment</span>
          <span className="mono">acme-receipt-2026-06.pdf · 184 KB</span>
        </div>
        <div className="sheet__stamp-area">
          {collected && (
            <Carimbo
              id="demo-001"
              date="14 JUL 2026"
              ref_="M/2026-07 · Nº 027"
              animate
            />
          )}
        </div>
        <p className="sheet__status mono">
          {collected
            ? "Collected — filed to July 2026."
            : "Awaiting collection."}
        </p>
      </div>
      <div className="stamp-demo__side">
        <div className="stamp-demo__controls">
          <button
            type="button"
            className="btn btn--postal"
            onClick={() => setCollected(true)}
            disabled={collected}
          >
            Collect document
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => setCollected(false)}
            disabled={!collected}
          >
            Reset
          </button>
        </div>
        <dl className="spec-notes mono">
          <div>
            <dt>THUNK</dt>
            <dd>210ms · cubic-bezier(.2,.7,.3,1) · scale 1.22 → 0.965 → 1</dd>
          </div>
          <div>
            <dt>JITTER</dt>
            <dd>±2° seeded from document id — identical on every render</dd>
          </div>
          <div>
            <dt>REDUCED MOTION</dt>
            <dd>no animation; the stamp prints instantly</dd>
          </div>
          <div>
            <dt>INK</dt>
            <dd>feTurbulence displacement, fixed seed · multiply blend</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export function CopyField({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="copy-field">
      <span className="copy-field__value mono">{value}</span>
      <button
        type="button"
        className="btn btn--postal btn--small"
        onClick={async () => {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1400);
        }}
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
