import { getTranslations } from "next-intl/server";

import { Button } from "@mailtobills/ui/components/button";
import { Carimbo } from "@mailtobills/ui/components/carimbo";

import { signUpUrl } from "@/lib/links";

/* The letter's opening (DESIGN.md §12 bake-off winner, recomposed):
   registration line, the certified headline, and the address field. */
export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section className="border-b border-border px-5 pt-8 pb-10 sm:px-10 sm:pt-10 sm:pb-14 lg:px-14">
      <div
        className="mb-9 flex flex-wrap items-baseline justify-between gap-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground sm:mb-14"
        aria-hidden
      >
        <span>LISBOA · 14 JUL 2026</span>
        <span>REGISTADO · Nº 027 · VIA POSTAL</span>
      </div>

      <div className="relative">
        <h1 className="max-w-[15ch] font-display text-4xl leading-none font-extrabold tracking-[-0.015em] [font-stretch:112%] sm:text-6xl lg:text-[68px]">
          {t("title")}
        </h1>
        <div
          className="absolute -top-4 right-0 hidden md:block lg:right-6"
          aria-hidden
        >
          <Carimbo
            id="hero"
            date="14 JUL 2026"
            refLine="M/2026-07 · Nº 027"
            angle={-2}
            animate
            animationDelayMs={550}
          />
        </div>
      </div>

      <p className="mt-7 mb-8 max-w-[52ch] text-lg leading-relaxed text-muted-foreground sm:text-[19px]">
        {t("description")}
      </p>

      <div className="flex flex-wrap items-center gap-3.5">
        <Button
          asChild
          size="lg"
          className="max-sm:w-full max-sm:px-4 max-sm:text-[11px] max-sm:tracking-[0.06em]"
        >
          <a href={signUpUrl}>{t("primaryCta")}</a>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="max-sm:w-full max-sm:px-4 max-sm:text-[11px] max-sm:tracking-[0.06em]"
        >
          <a href="#export">{t("secondaryCta")}</a>
        </Button>
      </div>

      <p className="mt-6 font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
        {t("note")}
      </p>

      <div className="my-9 border-t border-border sm:my-10" />

      <div className="max-w-[560px]">
        <span className="font-display text-[11.5px] font-semibold tracking-[0.16em] text-muted-foreground uppercase [font-stretch:80%]">
          {t("addressLabel")}
        </span>
        <p className="mt-2 border-b-[1.5px] border-foreground pb-2 font-mono text-[15px] font-bold break-all">
          you.4f2a@in.mailtobills.com
        </p>
        <p className="mt-2.5 text-[13px] text-muted-foreground">
          {t("addressHint")}
        </p>
      </div>
    </section>
  );
}
