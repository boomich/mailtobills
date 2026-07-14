import { getTranslations } from "next-intl/server";

import { Button } from "@mailtobills/ui/components/button";

import { SectionHead } from "@/components/letter/section-head";
import { signUpUrl } from "@/lib/links";

/* The rate card — pricing as a printed counter tariff, not SaaS cards.
   Plan truths from CONTEXT.md: the Free Plan collects UNLIMITED documents. */
const ROWS = [
  { key: "address", free: true, pro: true },
  { key: "unlimited", free: true, pro: true },
  { key: "dashboards", free: true, pro: true },
  { key: "manualExport", free: true, pro: true },
  { key: "directSend", free: false, pro: true },
  { key: "schedule", free: false, pro: true },
  { key: "addresses", free: false, pro: true },
] as const;

function Mark({ included }: { included: boolean }) {
  return included ? (
    <span className="font-mono text-[13px] font-bold text-primary">✓</span>
  ) : (
    <span className="font-mono text-[13px] text-muted-foreground/50">—</span>
  );
}

export async function Pricing() {
  const t = await getTranslations("Pricing");

  return (
    <section
      id="pricing"
      className="scroll-mt-20 border-b border-border px-5 py-12 sm:px-10 sm:py-14 lg:px-14"
    >
      <SectionHead n="3" title={t("title")} note="EUR · IVA EXCL." />
      <p className="mb-8 max-w-[52ch] text-lg text-muted-foreground">
        {t("description")}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse">
          <thead>
            <tr className="border-b-2 border-foreground">
              <th className="w-[42%] pb-4 align-bottom" aria-hidden />
              <th className="px-4 pb-4 text-left align-bottom" scope="col">
                <span className="font-display text-[13px] font-bold tracking-[0.12em] uppercase [font-stretch:88%]">
                  {t("free.name")}
                </span>
                <span className="mt-2 flex items-baseline gap-1.5">
                  <span className="font-mono text-3xl font-bold tabular-nums">
                    {t("free.price")}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {t("free.period")}
                  </span>
                </span>
              </th>
              <th
                className="border-x-[1.5px] border-t-[1.5px] border-foreground bg-secondary px-4 pt-3 pb-4 text-left align-bottom"
                scope="col"
              >
                <span className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-display text-[13px] font-bold tracking-[0.12em] uppercase [font-stretch:88%]">
                    {t("pro.name")}
                  </span>
                  <span className="font-mono text-[9.5px] tracking-[0.1em] text-muted-foreground uppercase">
                    {t("highlight")}
                  </span>
                </span>
                <span className="mt-2 flex items-baseline gap-1.5">
                  <span className="font-mono text-3xl font-bold tabular-nums">
                    {t("pro.price")}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {t("pro.period")}
                  </span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.key} className="border-b border-border">
                <th
                  scope="row"
                  className="py-3 pr-4 text-left text-[14px] leading-snug font-normal"
                >
                  {t(`rows.${row.key}`)}
                </th>
                <td className="px-4 py-3">
                  <Mark included={row.free} />
                </td>
                <td className="border-x-[1.5px] border-foreground bg-secondary px-4 py-3">
                  <Mark included={row.pro} />
                </td>
              </tr>
            ))}
            <tr>
              <td aria-hidden />
              <td className="px-4 py-5 align-top">
                <Button asChild variant="outline" className="w-full">
                  <a href={signUpUrl}>{t("free.cta")}</a>
                </Button>
              </td>
              <td className="border-x-[1.5px] border-b-[1.5px] border-foreground bg-secondary px-4 py-5 align-top">
                <Button asChild className="w-full">
                  <a href={signUpUrl}>{t("pro.cta")}</a>
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-5 font-mono text-[11px] tracking-[0.08em] text-muted-foreground">
        {t("note")}
      </p>
    </section>
  );
}
