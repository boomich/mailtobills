import { getTranslations } from "next-intl/server";

import { Carimbo } from "@mailtobills/ui/components/carimbo";

/* The franking line, frozen (DESIGN.md §12: physical objects stay static in
   CSS — the mechanism is a diagram here, not animated theater). */
function FrankingDiagram() {
  return (
    <div
      className="relative mx-auto mt-14 hidden h-[236px] max-w-3xl md:block"
      aria-hidden
    >
      <div className="absolute top-0 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center">
        <div className="h-7 w-6 rounded-t-[13px] rounded-b-[4px] bg-foreground" />
        <div className="h-3.5 w-3 bg-foreground" />
        <div className="h-5 w-28 bg-foreground" />
      </div>

      <div className="absolute bottom-[46px] left-1/2 h-[132px] w-[240px] -translate-x-1/2 border-[1.5px] border-foreground bg-kraft">
        <div className="absolute inset-x-0 top-0 h-[52px] overflow-hidden">
          <div className="absolute -top-[136px] left-1/2 h-[170px] w-[170px] -translate-x-1/2 rotate-45 border-[1.5px] border-foreground bg-[color-mix(in_oklab,var(--kraft)_92%,var(--foreground))]" />
        </div>
        {/* stamp lands on the address label, not bare kraft — AA contrast (§10.7) */}
        <div className="absolute top-7 right-2 origin-top-right scale-[0.58] border border-border bg-background px-2.5 py-2">
          <Carimbo
            id="diagram"
            date="14 JUL 2026"
            refLine="M/2026-07"
            angle={1.4}
          />
        </div>
        <div className="absolute bottom-3.5 left-4 grid w-3/5 gap-1.5">
          <span className="font-mono text-[8.5px] tracking-[0.06em]">
            FWD: FATURA — EDP JULHO
          </span>
          <span className="block h-[1.5px] bg-foreground/55" />
          <span className="block h-[1.5px] w-3/5 bg-foreground/55" />
        </div>
      </div>

      <div className="absolute right-0 bottom-[34px]">
        <span className="relative top-[1.5px] inline-block border-[1.5px] border-b-0 border-foreground bg-kraft px-5 py-1.5 font-display text-[12px] font-bold tracking-[0.12em] [font-stretch:86%] [clip-path:polygon(8px_0,calc(100%-8px)_0,100%_100%,0_100%)]">
          JUL 2026
        </span>
        <div className="relative h-[118px] w-[218px] overflow-hidden border-[1.5px] border-foreground bg-kraft">
          {/* collected sheets peeking out of the open dossier */}
          <div className="absolute top-2 left-3 h-2.5 w-[74%] border border-border bg-background" />
          <div className="absolute top-5 left-6 h-2.5 w-[68%] border border-border bg-background" />
          <div className="absolute top-8 left-4 h-2.5 w-[71%] border border-border bg-background" />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-[34px] -z-10 border-b-[1.5px] border-foreground" />
    </div>
  );
}

export async function HowItWorks() {
  const t = await getTranslations("HowItWorks");
  const steps = ["forward", "file", "export"] as const;

  return (
    <section
      id="how-it-works"
      className="scroll-mt-16 border-b border-border bg-background"
    >
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-bold tracking-[0.11em] uppercase [font-stretch:86%] sm:text-[27px]">
            {t("title")}
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            {t("description")}
          </p>
        </div>

        <ol className="mt-10 grid border-t-2 border-foreground">
          {steps.map((step, index) => (
            <li
              key={step}
              className="grid gap-2 border-b border-border py-6 sm:grid-cols-[64px_240px_1fr] sm:gap-6 sm:py-7"
            >
              <span className="font-mono text-sm font-bold text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-[15px] font-bold tracking-[0.1em] uppercase [font-stretch:88%]">
                {t(`steps.${step}.title`)}
              </h3>
              <p className="max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">
                {t(`steps.${step}.copy`)}
              </p>
            </li>
          ))}
        </ol>

        <FrankingDiagram />
      </div>
    </section>
  );
}
