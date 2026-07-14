import type { Metadata } from "next";

import { Postmark } from "../../postmark";
import { HeroSwitch } from "../hero-switch";

import "../hero.css";

export const metadata: Metadata = {
  title: "HERO C — The Handover",
};

const INBOX_ROWS = [
  { subject: "Fwd: Your receipt from Acme Hosting", tag: "PDF" },
  { subject: "Re: Re: fatura julho???", tag: null },
  { subject: "Your OpenAI invoice is ready", tag: "PDF" },
  { subject: "Fatura eletricidade — julho", tag: "PDF" },
  { subject: "Booking confirmation + receipt", tag: "PDF" },
  { subject: "Where is the Figma invoice", tag: null },
];

const MANIFEST_ROWS = [
  ["001", "acme-receipt-2026-06.pdf"],
  ["002", "invoice-A81F42-0033.pdf"],
  ["003", "fatura-eletricidade-julho.pdf"],
];

export default function HeroCPage() {
  return (
    <main className="hero hero-c">
      <HeroSwitch current="c" />

      <header className="hc__head">
        <h1 className="hc__headline">
          Your accountant gets one clean ZIP. Every month.
        </h1>
        <p className="hc__sub">
          You forward expense emails as they arrive — we file every PDF to its
          Collection Month and package the handover.
        </p>
      </header>

      <div className="hc__stage">
        <section className="hc__inbox" aria-label="Before: your inbox">
          <span className="field-label">Your inbox · July</span>
          <ul className="hc__pile">
            {INBOX_ROWS.map((row, index) => (
              <li
                key={row.subject}
                className="hc__pile-row"
                style={{ "--tilt": `${index % 2 ? 0.9 : -1.1}deg` } as React.CSSProperties}
              >
                <span className="hc__pile-subject mono">{row.subject}</span>
                {row.tag && <span className="hc__pile-tag mono">{row.tag}</span>}
              </li>
            ))}
          </ul>
          <p className="hc__caption mono">30–90 MIN OF DIGGING, EVERY MONTH</p>
        </section>

        <div className="hc__flow" aria-hidden>
          <span className="hc__flow-label mono">YOU FORWARD</span>
          <span className="hc__flow-arrow" />
          <span className="hc__flow-label mono">WE FILE &amp; PACK</span>
        </div>

        <section className="hc__package" aria-label="After: the accountant export">
          <div className="hc__parcel">
            <span className="field-label">Accountant export</span>
            <span className="hc__parcel-month">JULHO 2026</span>
            <table className="hc__manifest mono">
              <tbody>
                {MANIFEST_ROWS.map((row) => (
                  <tr key={row[0]}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <span className="hc__parcel-meta mono">
              12 PDFS · MANIFEST.CSV · ONE ZIP
            </span>
            <div className="hc__seal" aria-hidden>
              <Postmark withWaves={false} date="JUL 26" className="hc__seal-mark" />
            </div>
          </div>
          <p className="hc__caption mono">30 SECONDS, ONCE A MONTH</p>
        </section>
      </div>

      <div className="hc__cta">
        <a className="btn btn--postal btn--big" href="#start">
          Start free — first month on us
        </a>
        <a className="btn btn--ghost btn--big" href="#how">
          See what&apos;s in the export
        </a>
        <p className="hc__note mono">
          NO OCR · NO AI GUESSING YOUR VAT · YOUR DOCUMENTS, ORGANIZED
        </p>
      </div>
    </main>
  );
}
