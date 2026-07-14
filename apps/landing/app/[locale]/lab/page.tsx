import type { Metadata } from "next";
import Link from "next/link";

import { Postmark } from "./postmark";
import { Carimbo, CopyField, StampDemo } from "./stamp-demo";

export const metadata: Metadata = {
  title: "CARIMBO — design specimen",
};

const PALETTE = [
  { name: "paper", value: "oklch(0.958 0.012 88)", role: "page ground" },
  { name: "paper-raised", value: "oklch(0.985 0.006 92)", role: "sheets" },
  { name: "kraft", value: "oklch(0.86 0.045 82)", role: "dossier surfaces" },
  { name: "ink", value: "oklch(0.27 0.025 268)", role: "text · rules" },
  { name: "ink-muted", value: "oklch(0.49 0.02 268)", role: "secondary text" },
  { name: "postal", value: "oklch(0.44 0.12 262)", role: "actions · links" },
  { name: "stamp", value: "oklch(0.45 0.16 302)", role: "certification only" },
  { name: "signal", value: "oklch(0.55 0.19 27)", role: "destructive only" },
];

const MANIFEST_ROWS = [
  ["001", "billing@acmehosting.com", "acme-receipt-2026-06.pdf", "02 JUL"],
  ["002", "no-reply@openai.com", "invoice-A81F42-0033.pdf", "05 JUL"],
  ["003", "faturacao@edp.pt", "fatura-eletricidade-julho.pdf", "09 JUL"],
  ["004", "receipts@figma.com", "figma-invoice-jul-2026.pdf", "11 JUL"],
];

const MONTHS = [
  { label: "ABR", count: 14 },
  { label: "MAI", count: 19 },
  { label: "JUN", count: 11 },
  { label: "JUL", count: 4, active: true },
];

function SectionHead({ n, title, note }: { n: string; title: string; note?: string }) {
  return (
    <header className="section-head">
      <span className="section-head__n">{n}</span>
      <h2 className="section-head__title">{title}</h2>
      {note && <span className="section-head__note mono">{note}</span>}
    </header>
  );
}

export default function LabPage() {
  return (
    <main className="lab">
      <nav className="lab-switch mono" aria-label="Design lab">
        <span className="lab-switch__current">SPECIMEN</span>
        <span className="lab-switch__sep">·</span>
        <span>BAKE-OFF:</span>
        <Link href="/lab/hero/a">HERO A</Link>
        <Link href="/lab/hero/b">HERO B</Link>
        <Link href="/lab/hero/c">HERO C</Link>
      </nav>
      <div className="lab__sheet">
        <header className="masthead">
          <Postmark className="masthead__mark" withWaves />
          <div className="masthead__id">
            <h1 className="masthead__title">Carimbo</h1>
            <p className="masthead__sub">MailToBills — design specimen</p>
            <p className="mono masthead__mod">
              MOD. C-01 · REDESIGN/CARIMBO · DESIGN.MD V1 · NOT A PRODUCT
              SURFACE
            </p>
          </div>
        </header>

        <section className="section">
          <SectionHead
            n="1"
            title="O Carimbo — certification"
            note="DESIGN.MD §7 · §8 — the thunk"
          />
          <p className="section__lede">
            A stamp does not read your document. It certifies it and files it.
            Press <em>Collect document</em> — certification is pressed, never
            faded.
          </p>
          <StampDemo />
          <div className="stamp-tones">
            <figure>
              <Carimbo id="tone-a" date="14 JUL 2026" ref_="M/2026-07" />
              <figcaption className="mono">
                stamp violet — certification (law)
              </figcaption>
            </figure>
            <figure>
              <Carimbo
                id="tone-b"
                date="14 JUL 2026"
                ref_="M/2026-07"
                tone="signal"
              />
              <figcaption className="mono">
                red — reserved for destruction, shown for comparison
              </figcaption>
            </figure>
            <figure>
              <Carimbo
                id="tone-c"
                date="14 JUL 2026"
                ref_="M/2026-07"
                tone="ink"
              />
              <figcaption className="mono">ink — neutral variant</figcaption>
            </figure>
          </div>
        </section>

        <section className="section">
          <SectionHead n="2" title="Palette" note="DESIGN.MD §4 — roles are law" />
          <div className="plates">
            {PALETTE.map((swatch) => (
              <figure className="plate" key={swatch.name}>
                <div
                  className="plate__color"
                  style={{ backgroundColor: swatch.value }}
                />
                <figcaption>
                  <span className="plate__name mono">--{swatch.name}</span>
                  <span className="plate__role">{swatch.role}</span>
                  <span className="plate__value mono">{swatch.value}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="section">
          <SectionHead n="3" title="Type — three registers" note="DESIGN.MD §5" />
          <div className="type-rows">
            <div className="type-row">
              <span className="type-row__tag mono">ARCHIVO · OFFICIAL</span>
              <p className="type-row__display">
                Stop digging through your inbox for invoices.
              </p>
            </div>
            <div className="type-row">
              <span className="type-row__tag mono">
                PUBLIC SANS · THE CLERK
              </span>
              <p className="type-row__body">
                Forward expense emails as they arrive. At month end, hand your
                accountant one clean ZIP — every PDF, filed to its Collection
                Month, with a typed manifest. No OCR, no AI guessing your VAT.
                Your documents, organized.
              </p>
            </div>
            <div className="type-row">
              <span className="type-row__tag mono">
                COURIER PRIME · DATA ON THE FORM
              </span>
              <p className="type-row__mono mono">
                fatura-eletricidade-julho.pdf · 312 KB
                <br />
                RECEIVED 2026-07-09 14:32 · faturacao@edp.pt
              </p>
            </div>
          </div>
          <div className="form-block">
            <span className="field-label">Collection address</span>
            <CopyField value="vitor.4f2a@in.mailtobills.com" />
            <p className="form-block__hint">
              Form values are typed (Courier); labels are official caps
              (Archivo); explanations are set by the clerk (Public Sans).
            </p>
          </div>
        </section>

        <section className="section">
          <SectionHead n="4" title="The manifest" note="DESIGN.MD §7 — shown proudly" />
          <div className="manifest-wrap">
            <table className="manifest">
            <thead>
              <tr>
                <th>Nº</th>
                <th>Sender</th>
                <th>Primary attachment</th>
                <th>Received</th>
              </tr>
            </thead>
            <tbody>
              {MANIFEST_ROWS.map((row) => (
                <tr key={row[0]}>
                  <td className="mono">{row[0]}</td>
                  <td className="mono">{row[1]}</td>
                  <td className="mono">{row[2]}</td>
                  <td className="mono">{row[3]}</td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </section>

        <section className="section">
          <SectionHead
            n="5"
            title="The dossier — month tabs"
            note="dashboard structure draft"
          />
          <div className="dossier">
            <div className="dossier__tabs" role="presentation">
              {MONTHS.map((month) => (
                <span
                  key={month.label}
                  className={`dossier__tab${month.active ? " dossier__tab--active" : ""}`}
                >
                  <span className="dossier__tab-month">{month.label}</span>
                  <span className="dossier__tab-count mono">{month.count}</span>
                </span>
              ))}
            </div>
            <div className="dossier__folder">
              <div className="dossier__folder-head">
                <span className="dossier__folder-title">Julho 2026</span>
                <span className="mono dossier__folder-meta">
                  4 DOCUMENTS · OPEN
                </span>
              </div>
              <p className="dossier__folder-hint">
                The active Collection Month is the open dossier. Export seals
                it and hands it over.
              </p>
            </div>
          </div>
        </section>

        <footer className="lab__footer">
          <span className="mono">
            SPECIMEN ONLY · GEOMETRY: tools/carimbo-geometry.mjs
          </span>
          <Postmark className="lab__footer-mark" withWaves={false} date="JUL 26" />
        </footer>
      </div>
    </main>
  );
}
