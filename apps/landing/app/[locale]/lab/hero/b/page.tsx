import type { Metadata } from "next";

import { Postmark } from "../../postmark";
import { Carimbo, CopyField } from "../../stamp-demo";
import { HeroSwitch } from "../hero-switch";

import "../hero.css";

export const metadata: Metadata = {
  title: "HERO B — The Stamped Letter",
};

export default function HeroBPage() {
  return (
    <main className="hero hero-b">
      <HeroSwitch current="b" />
      <section className="letter">
        <header className="letter__head">
          <Postmark className="letter__mark" withWaves={false} date="JUL 26" />
          <span className="letter__place mono">
            REGISTADO · Nº 027 · LISBOA
          </span>
        </header>

        <div className="letter__body">
          <h1 className="letter__headline">
            Stop digging through your inbox for invoices.
          </h1>
          <div className="letter__stamp" aria-hidden>
            <Carimbo
              id="hero-b"
              date="14 JUL 2026"
              ref_="M/2026-07 · Nº 027"
              angle={-2}
              animate
            />
          </div>
        </div>

        <p className="letter__sub">
          Forward expense emails as they arrive. At month end, your accountant
          gets one clean ZIP — every PDF filed to its month, with a typed
          manifest.
        </p>

        <div className="letter__cta">
          <a className="btn btn--postal btn--big" href="#start">
            Start free — first month on us
          </a>
          <a className="btn btn--ghost btn--big" href="#how">
            See how it works
          </a>
        </div>

        <p className="letter__note mono">
          NO OCR · NO AI GUESSING YOUR VAT · YOUR DOCUMENTS, ORGANIZED
        </p>

        <div className="letter__fold" role="presentation" />

        <div className="letter__address">
          <span className="field-label">Your collection address</span>
          <CopyField value="you.4f2a@in.mailtobills.com" />
          <p className="letter__address-hint">
            Forward any invoice, receipt, or fatura here. That is the whole
            setup.
          </p>
        </div>
      </section>
    </main>
  );
}
