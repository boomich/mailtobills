import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CarimboDefs } from "@mailtobills/ui/components/carimbo";
import { Button } from "@mailtobills/ui/components/button";
import { PostmarkMini } from "@mailtobills/ui/components/postmark";

import { CopyChip } from "./copy-chip";

/*
 * DASHBOARD LAB — the dossier shell prototype (mock data, dev only).
 * The dashboard IS the open month dossier: months as kraft tabs, the
 * active Collection Month as the sheet, the export as its closing ritual.
 * Not a product surface; approved composition gets wired to real
 * read-models afterwards.
 */

export const metadata: Metadata = {
  title: "LAB — dossier shell",
  robots: { index: false },
};

const MONTHS = [
  { label: "ARQUIVO", archive: true },
  { label: "ABR", count: 14 },
  { label: "MAI", count: 19 },
  { label: "JUN", count: 11 },
  { label: "JUL", count: 8, active: true },
] as const;

const DOCUMENTS = [
  { n: "008", date: "12 JUL", sender: "Figma", email: "receipts@figma.com", subject: "Fwd: Your Figma invoice", file: "figma-invoice-jul-2026.pdf", size: "182 KB", attachments: 1 },
  { n: "007", date: "11 JUL", sender: "EDP Comercial", email: "faturacao@edp.pt", subject: "Fwd: Fatura eletricidade — julho", file: "fatura-eletricidade-julho.pdf", size: "312 KB", attachments: 2 },
  { n: "006", date: "09 JUL", sender: "OpenAI", email: "no-reply@openai.com", subject: "Fwd: Your OpenAI invoice is ready", file: "invoice-A81F42-0033.pdf", size: "96 KB", attachments: 1 },
  { n: "005", date: "08 JUL", sender: "Booking.com", email: "noreply@booking.com", subject: "Fwd: Booking confirmation and receipt", file: "hotel-receipt-porto.pdf", size: "421 KB", attachments: 3 },
  { n: "004", date: "05 JUL", sender: "Acme Hosting", email: "billing@acmehosting.com", subject: "Fwd: Your receipt from Acme Hosting", file: "acme-receipt-2026-06.pdf", size: "184 KB", attachments: 1 },
  { n: "003", date: "04 JUL", sender: "Adobe", email: "mail@adobe.com", subject: "Fwd: Adobe invoice July", file: "adobe-invoice-jul.pdf", size: "154 KB", attachments: 2 },
  { n: "002", date: "02 JUL", sender: "Vodafone", email: "faturas@vodafone.pt", subject: "Fwd: A sua fatura Vodafone", file: "vodafone-julho-2026.pdf", size: "233 KB", attachments: 1 },
  { n: "001", date: "01 JUL", sender: "AWS", email: "aws-receivables@amazon.com", subject: "Fwd: Amazon Web Services invoice", file: "aws-invoice-2026-07.pdf", size: "78 KB", attachments: 1 },
] as const;

export default function DashboardLabPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <div className="min-h-svh bg-secondary text-foreground">
      <CarimboDefs />

      {/* counter bar */}
      <header className="border-b border-foreground bg-background">
        <div className="mx-auto flex h-14 max-w-[1160px] items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <PostmarkMini className="size-6 text-foreground" />
            <span className="font-display text-[15px] font-bold [font-stretch:105%] max-sm:hidden">
              MailToBills
            </span>
          </div>
          <div className="flex min-w-0 items-center gap-3">
            <span className="font-display text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase [font-stretch:80%] max-md:hidden">
              Endereço de recolha
            </span>
            <CopyChip value="vitor.4f2a@in.mailtobills.com" />
          </div>
          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="sm">
              Definições
            </Button>
            <span className="grid size-8 place-items-center border-[1.5px] border-foreground font-mono text-[11px] font-bold">
              VS
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1160px] px-2.5 pt-8 pb-14 sm:px-6">
        {/* month tabs — the dossier drawer */}
        <nav
          aria-label="Meses de recolha"
          className="flex items-end gap-1.5 overflow-x-auto pl-3"
        >
          {MONTHS.map((month) =>
            "archive" in month && month.archive ? (
              <button
                key="archive"
                type="button"
                className="relative top-px mr-2 flex shrink-0 items-baseline gap-2 border border-dashed border-foreground/50 bg-transparent px-4 py-2 font-display text-[11.5px] font-semibold tracking-[0.12em] text-muted-foreground uppercase [font-stretch:86%] transition-colors hover:border-foreground hover:text-foreground"
              >
                {month.label}
                <span aria-hidden className="text-[9px]">
                  ▾
                </span>
              </button>
            ) : (
              <button
                key={month.label}
                type="button"
                aria-current={"active" in month && month.active ? "page" : undefined}
                className={
                  "relative shrink-0 items-baseline gap-2.5 border border-b-0 border-foreground px-5 pt-2.5 pb-2 font-display text-[13px] font-bold tracking-[0.12em] uppercase [font-stretch:86%] [clip-path:polygon(8px_0,calc(100%-8px)_0,100%_100%,0_100%)] " +
                  ("active" in month && month.active
                    ? "top-px z-10 flex bg-background"
                    : "top-px flex bg-kraft text-foreground/70 transition-[translate] hover:-translate-y-0.5 motion-reduce:hover:translate-0")
                }
              >
                {month.label}
                <span className="font-mono text-[10px] font-normal">
                  {"count" in month ? month.count : ""}
                </span>
              </button>
            ),
          )}
        </nav>

        {/* the open month sheet */}
        <section className="relative border border-foreground bg-background shadow-[8px_8px_0_0_oklch(0.27_0.025_268/0.12)]">
          <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5 border-b-2 border-foreground px-5 pt-7 pb-6 sm:px-8">
            <div>
              <div
                className="mb-1.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase"
                aria-hidden
              >
                MÊS DE RECOLHA · M/2026-07 · ABERTO
              </div>
              <h1 className="font-display text-4xl font-extrabold tracking-[-0.01em] [font-stretch:112%] sm:text-5xl">
                Julho 2026
              </h1>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex flex-wrap gap-2.5">
                <Button variant="outline">Descarregar ZIP</Button>
                <Button>Enviar ao contabilista</Button>
              </div>
              <span className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase">
                Envio automático: dia 2 · próximo a 02 AGO
              </span>
            </div>
          </header>

          {/* summary rule — the form's totals line */}
          <div className="flex flex-wrap gap-x-7 gap-y-1 border-b border-border px-5 py-3 font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase sm:px-8">
            <span>
              <span className="font-bold text-foreground">8</span> documentos
            </span>
            <span>
              <span className="font-bold text-foreground">12</span> anexos
            </span>
            <span>
              <span className="font-bold text-foreground">8</span> PDF principais
            </span>
            <span className="ml-auto">VS JUN · −27%</span>
          </div>

          {/* the manifest */}
          <table className="w-full border-collapse max-md:hidden">
            <thead>
              <tr className="border-b border-border">
                <th className="w-16 py-3 pl-8 text-left font-display text-[10.5px] font-semibold tracking-[0.16em] text-muted-foreground uppercase [font-stretch:80%]">
                  Nº
                </th>
                <th className="w-24 px-3 py-3 text-left font-display text-[10.5px] font-semibold tracking-[0.16em] text-muted-foreground uppercase [font-stretch:80%]">
                  Recebido
                </th>
                <th className="px-3 py-3 text-left font-display text-[10.5px] font-semibold tracking-[0.16em] text-muted-foreground uppercase [font-stretch:80%]">
                  Remetente
                </th>
                <th className="px-3 py-3 text-left font-display text-[10.5px] font-semibold tracking-[0.16em] text-muted-foreground uppercase [font-stretch:80%]">
                  Documento principal
                </th>
                <th className="w-24 px-3 py-3 text-right font-display text-[10.5px] font-semibold tracking-[0.16em] text-muted-foreground uppercase [font-stretch:80%]">
                  Anexos
                </th>
                <th className="w-12 pr-8" aria-hidden />
              </tr>
            </thead>
            <tbody>
              {DOCUMENTS.map((doc) => (
                <tr
                  key={doc.n}
                  className="group cursor-pointer border-b border-border transition-colors last:border-b-0 hover:bg-secondary/60"
                >
                  <td className="py-4 pl-8 align-top font-mono text-[12px] font-bold text-stamp">
                    {doc.n}
                  </td>
                  <td className="px-3 py-4 align-top font-mono text-[12px] whitespace-nowrap text-muted-foreground">
                    {doc.date}
                  </td>
                  <td className="px-3 py-4 align-top">
                    <div className="text-[14px] leading-tight font-semibold">
                      {doc.sender}
                    </div>
                    <div className="mt-1 font-mono text-[11px] text-muted-foreground">
                      {doc.email}
                    </div>
                  </td>
                  <td className="px-3 py-4 align-top">
                    <div className="font-mono text-[12.5px] leading-tight font-bold break-all">
                      {doc.file}
                    </div>
                    <div className="mt-1 text-[12px] text-muted-foreground">
                      {doc.subject} · <span className="font-mono text-[11px]">{doc.size}</span>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-right align-top font-mono text-[12px] text-muted-foreground">
                    {doc.attachments}
                  </td>
                  <td className="py-4 pr-8 text-right align-top">
                    <span
                      aria-hidden
                      className="inline-block font-mono text-[13px] text-muted-foreground transition-[translate] group-hover:translate-x-0.5 group-hover:text-foreground motion-reduce:group-hover:translate-0"
                    >
                      →
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* mobile manifest */}
          <ul className="md:hidden">
            {DOCUMENTS.map((doc) => (
              <li
                key={doc.n}
                className="flex items-baseline gap-3 border-b border-border px-5 py-4 last:border-b-0"
              >
                <span className="font-mono text-[11px] font-bold text-stamp">
                  {doc.n}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-mono text-[12px] font-bold">
                    {doc.file}
                  </div>
                  <div className="mt-0.5 truncate text-[12px] text-muted-foreground">
                    {doc.sender} · {doc.date}
                  </div>
                </div>
                <span aria-hidden className="font-mono text-[12px] text-muted-foreground">
                  →
                </span>
              </li>
            ))}
          </ul>

          {/* sheet foot — the handover line */}
          <footer className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-foreground px-5 py-4 sm:px-8">
            <span className="font-mono text-[10.5px] tracking-[0.1em] text-muted-foreground uppercase">
              Exportação: 8 PDF principais + manifest.csv
            </span>
            <Button variant="outline" size="sm">
              Pré-visualizar manifesto
            </Button>
          </footer>
        </section>

        <p className="mt-6 text-center font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
          LAB · PROTÓTIPO COM DADOS FICTÍCIOS · NÃO É UMA SUPERFÍCIE DO PRODUTO
        </p>
      </main>
    </div>
  );
}
