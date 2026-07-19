import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Archivo, Courier_Prime, Public_Sans } from "next/font/google";

import "./lab.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public",
});

const courier = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier",
});

export const metadata: Metadata = {
  robots: { index: false },
};

export default function LabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Dev-only specimen archive (deploy checklist Phase 0), like the dashboard labs.
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <div
      className={`carimbo-root ${archivo.variable} ${publicSans.variable} ${courier.variable}`}
    >
      {/* rubber-stamp ink irregularity for .carimbo (deterministic seed) */}
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
      {children}
    </div>
  );
}
