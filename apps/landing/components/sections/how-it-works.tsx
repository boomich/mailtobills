import { getTranslations } from "next-intl/server";

import { SectionHead } from "@/components/letter/section-head";

export async function HowItWorks() {
  const t = await getTranslations("HowItWorks");
  const steps = ["forward", "file", "export"] as const;

  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-b border-border px-5 py-12 sm:px-10 sm:py-14 lg:px-14"
    >
      <SectionHead n="1" title={t("title")} note="MOD. C-11" />
      <p className="mb-8 max-w-[52ch] text-lg text-muted-foreground">
        {t("description")}
      </p>

      <ol className="grid border-t-2 border-foreground">
        {steps.map((step, index) => (
          <li
            key={step}
            className="grid gap-2 border-b border-border py-6 sm:grid-cols-[56px_220px_1fr] sm:gap-6 sm:py-7"
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
    </section>
  );
}
