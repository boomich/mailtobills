import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { isLocale } from "@mailtobills/i18n";
import { CarimboDefs } from "@mailtobills/ui/components/carimbo";

import { LetterHead } from "@/components/letter/letter-head";
import { SiteFooter } from "@/components/site-footer";
import { ExportSection } from "@/components/sections/export-section";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { Honesty } from "@/components/sections/honesty";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";

/* The whole page is one registered letter on the counter (DESIGN.md §12):
   a single continuous sheet — letterhead, opening, numbered form sections,
   enclosed exhibit, rate card, the back of the form, sign-off, and a
   tear-off reply coupon. The counter (paper ground) stays visible around it. */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("Accessibility");

  return (
    <div className="landing-page flex min-h-svh flex-col bg-secondary text-foreground">
      <a
        href="#main-content"
        className="sr-only z-[100] bg-background px-4 py-2 text-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:ring-2 focus:ring-ring focus:outline-none"
      >
        {t("skipToContent")}
      </a>
      <CarimboDefs />
      <main
        id="main-content"
        className="mx-auto w-full max-w-[920px] flex-1 px-2.5 pt-4 sm:px-6 sm:pt-8"
        tabIndex={-1}
      >
        <article className="border border-foreground bg-background shadow-[8px_8px_0_0_oklch(0.27_0.025_268/0.12)]">
          <LetterHead />
          <Hero />
          <HowItWorks />
          <ExportSection />
          <Honesty />
          <Pricing />
          <Faq />
          <FinalCta />
        </article>
        <div className="h-8" aria-hidden />
      </main>
      <SiteFooter />
    </div>
  );
}
