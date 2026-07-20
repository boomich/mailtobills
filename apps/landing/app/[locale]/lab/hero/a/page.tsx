import type { Metadata } from "next";

import { Carimbo } from "../../stamp-demo";
import { HeroSwitch } from "../hero-switch";

import "../hero.css";

export const metadata: Metadata = {
  title: "HERO A — The Franking Line",
};

export default function HeroAPage() {
  return (
    <main className="hero hero-a">
      <HeroSwitch current="a" />

      <div className="ha__copy">
        <h1 className="ha__headline">
          Forward it.
          <br />
          We stamp it.
          <br />
          Your accountant gets the file.
        </h1>
        <p className="ha__sub">
          Every expense email you forward is certified into its Collection
          Month. At month end: one clean ZIP, one typed manifest, zero digging.
        </p>
        <div className="ha__cta">
          <a className="btn btn--postal btn--big" href="#start">
            Start free — first month on us
          </a>
          <a className="btn btn--ghost btn--big" href="#how">
            See how it works
          </a>
        </div>
        <p className="ha__note mono">
          NO OCR · NO AI GUESSING YOUR VAT · YOUR DOCUMENTS, ORGANIZED
        </p>
      </div>

      {/* The franking line: envelope arrives → thunk → filed to the month.
          Seamless 5s loop, keyframe %s computed in hero.css comments (§8/§10).
          Reduced motion renders the stamped tableau. */}
      <div className="line-stage" aria-hidden>
        <div className="line-stage__track" />

        <div className="stamphead">
          <div className="stamphead__handle" />
          <div className="stamphead__neck" />
          <div className="stamphead__base" />
        </div>

        <div className="envelope">
          <div className="envelope__flap" />
          <div className="envelope__address">
            <span className="mono">FWD: YOUR RECEIPT — ACME HOSTING</span>
            <span className="envelope__rule" />
            <span className="envelope__rule envelope__rule--short" />
          </div>
          <div className="envelope__stamp">
            <Carimbo
              id="hero-a-envelope"
              date="14 JUL 2026"
              ref_="M/2026-07"
              angle={1.4}
            />
          </div>
        </div>

        <div className="dossier-slot">
          <span className="dossier-slot__tab">JUL 2026</span>
          <div className="dossier-slot__folder">
            <span className="mono dossier-slot__count">27 DOCUMENTS</span>
          </div>
        </div>
      </div>
    </main>
  );
}
