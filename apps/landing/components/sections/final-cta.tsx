import { getTranslations } from "next-intl/server";

import { Button } from "@mailtobills/ui/components/button";
import { Postmark } from "@mailtobills/ui/components/postmark";

import { signUpUrl } from "@/lib/links";

/* The letter's sign-off, then the tear-off reply coupon — perforation is
   sanctioned here (DESIGN.md §7: brand ephemera / the reply moment). */
export async function FinalCta() {
  const t = await getTranslations("FinalCta");

  return (
    <section className="px-5 pt-12 pb-8 sm:px-10 sm:pt-14 lg:px-14">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div className="max-w-[46ch]">
          <h2 className="font-display text-[26px] leading-tight font-extrabold tracking-[-0.01em] [font-stretch:110%] sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </div>
        <div
          className="pr-2 text-stamp mix-blend-multiply [filter:url(#ink-rough)]"
          aria-hidden
        >
          <Postmark
            withWaves={false}
            date="JUL 26"
            className="h-20 w-20 rotate-[-3deg]"
            label=""
          />
        </div>
      </div>

      {/* tear-off reply coupon */}
      <div className="relative mt-10 border-t-2 border-dashed border-foreground/50 pt-7 pb-2">
        <span
          className="absolute -top-3 left-7 bg-background px-1.5 font-mono text-sm text-muted-foreground"
          aria-hidden
        >
          ✂
        </span>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-[1.5px] border-foreground bg-kraft px-6 py-6 sm:px-8">
          <div className="grid gap-1">
            <span
              className="font-mono text-[9.5px] tracking-[0.14em] text-foreground/75 uppercase"
              aria-hidden
            >
              CUPÃO DE RESPOSTA · RSVP · M/2026
            </span>
            <span className="font-display text-[15px] font-bold tracking-[0.08em] uppercase [font-stretch:88%]">
              {t("note")}
            </span>
          </div>
          <Button
            asChild
            size="lg"
            className="max-sm:w-full max-sm:px-4 max-sm:text-[11px] max-sm:tracking-[0.06em]"
          >
            <a href={signUpUrl}>{t("cta")}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
