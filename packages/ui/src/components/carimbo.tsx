/*
 * The Carimbo — the reception-stamp component (DESIGN.md §7).
 * Certification color only (stamp violet) with an ink variant for neutral
 * ephemera. Jitter is deterministic: seeded from a stable id, or fixed via
 * `angle` for composed placements — never random at render (§10.5).
 * The thunk (§8) is opt-in via `animate`; reduced motion prints instantly
 * (see globals.css `carimbo-thunk`).
 */

import { cn } from "@mailtobills/ui/lib/utils";

function seededJitter(id: string): number {
  let hash = 0;
  for (const char of id) {
    hash = ((hash << 5) - hash + char.charCodeAt(0)) | 0;
  }
  // Map to [-2, 2] degrees (§7).
  return (Math.abs(hash) % 400) / 100 - 2;
}

export function Carimbo({
  id,
  word = "RECEBIDO",
  date,
  refLine,
  tone = "stamp",
  angle,
  animate = false,
  animationDelayMs,
  className,
}: {
  id: string;
  word?: string;
  date: string;
  refLine?: string;
  tone?: "stamp" | "ink";
  angle?: number;
  animate?: boolean;
  animationDelayMs?: number;
  className?: string;
}) {
  const jitter = angle ?? seededJitter(id);
  return (
    <div
      className={cn(
        "inline-flex flex-col items-center gap-px border-[2.5px] border-current bg-transparent px-4 pt-2 pb-2.5 mix-blend-multiply [filter:url(#ink-rough)]",
        tone === "stamp" ? "text-stamp" : "text-foreground",
        animate && "carimbo-thunk",
        className,
      )}
      style={{
        transform: `rotate(${jitter}deg)`,
        animationDelay:
          animate && animationDelayMs ? `${animationDelayMs}ms` : undefined,
      }}
    >
      <span className="font-display text-xl leading-[1.1] font-extrabold tracking-[0.18em] [font-stretch:88%]">
        {word}
      </span>
      <span className="font-mono text-[12.5px] font-bold tracking-[0.12em]">
        {date}
      </span>
      {refLine && (
        <span className="font-mono text-[9px] tracking-[0.1em] opacity-85">
          {refLine}
        </span>
      )}
    </div>
  );
}

/**
 * SVG filter giving stamps their pressed-ink irregularity. Render once per
 * page (any Carimbo on the page references filter id `ink-rough`).
 */
export function CarimboDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
      <defs>
        <filter id="ink-rough">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.55"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" />
        </filter>
      </defs>
    </svg>
  );
}
