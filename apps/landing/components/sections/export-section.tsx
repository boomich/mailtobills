import { getTranslations } from "next-intl/server";

import { Postmark } from "@mailtobills/ui/components/postmark";

/* The Handover, demoted from hero C (DESIGN.md §12): the deliverable itself —
   one sealed month, shown proudly (§7: the manifest is not hidden). */
const MANIFEST_ROWS = [
  ["001", "acme-receipt-2026-06.pdf"],
  ["002", "invoice-A81F42-0033.pdf"],
  ["003", "fatura-eletricidade-julho.pdf"],
  ["004", "figma-invoice-jul-2026.pdf"],
] as const;

export async function ExportSection() {
  const t = await getTranslations("ExportSection");
  const bullets = ["zip", "primary", "manifest", "nologin"] as const;

  return (
    <section
      id="export"
      className="scroll-mt-16 border-b border-border bg-secondary"
    >
      <div className="mx-auto grid max-w-5xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-[0.11em] uppercase [font-stretch:86%] sm:text-[27px]">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-[48ch] text-lg text-muted-foreground">
            {t("description")}
          </p>
          <ul className="mt-8 grid gap-0 border-t-2 border-foreground">
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-baseline gap-4 border-b border-border py-3.5"
              >
                <span className="font-mono text-[11px] font-bold text-primary">
                  ✓
                </span>
                <span className="text-[15px] leading-relaxed">
                  {t(`bullets.${bullet}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative mx-auto w-full max-w-[440px]">
          <div
            className="relative grid gap-3 border-[1.5px] border-foreground bg-kraft p-6 shadow-[6px_6px_0_0_oklch(0.27_0.025_268/0.13)] sm:p-7"
            aria-hidden
          >
            <span className="font-display text-[11.5px] font-semibold tracking-[0.16em] text-foreground/70 uppercase [font-stretch:80%]">
              ACCOUNTANT EXPORT
            </span>
            <span className="font-display text-3xl font-extrabold [font-stretch:108%]">
              JULHO 2026
            </span>
            <table className="w-full border-collapse border border-border bg-background font-mono">
              <tbody>
                {MANIFEST_ROWS.map((row) => (
                  <tr key={row[0]} className="border-b border-border last:border-b-0">
                    <td className="w-11 px-3 py-1.5 text-[11px] whitespace-nowrap text-muted-foreground">
                      {row[0]}
                    </td>
                    <td className="px-3 py-1.5 text-[11px] break-all">
                      {row[1]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <span className="font-mono text-[10px] tracking-[0.12em] text-foreground/70">
              12 PDFS · MANIFEST.CSV · ONE ZIP
            </span>
            <div className="absolute -top-6 -right-1 text-stamp mix-blend-multiply [filter:url(#ink-rough)] sm:-top-8 sm:-right-6">
              <Postmark
                withWaves={false}
                date="JUL 26"
                className="h-[104px] w-[104px]"
                label=""
              />
            </div>
          </div>
          <figcaption className="mt-4 text-center font-mono text-[10.5px] tracking-[0.12em] text-muted-foreground uppercase">
            {t("caption")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
