import { getTranslations } from "next-intl/server";

import { PostmarkMini } from "@mailtobills/ui/components/postmark";

/* The counter line — below the letter, on the counter itself. */
export async function SiteFooter() {
  const t = await getTranslations("Footer");

  return (
    <footer className="mx-auto flex w-full max-w-[920px] flex-col items-center justify-between gap-3 px-5 pt-2 pb-10 text-muted-foreground sm:flex-row sm:px-6">
      <div className="flex items-center gap-2">
        <PostmarkMini className="size-4 text-muted-foreground" />
        <span className="font-mono text-[10px] tracking-[0.1em] uppercase">
          {t("tagline")}
        </span>
      </div>
      <div className="flex items-center gap-5 font-display text-[10.5px] font-semibold tracking-[0.1em] uppercase [font-stretch:88%]">
        <a
          href="#how-it-works"
          className="transition-colors hover:text-foreground"
        >
          {t("howItWorks")}
        </a>
        <a href="#pricing" className="transition-colors hover:text-foreground">
          {t("pricing")}
        </a>
        <a href="#faq" className="transition-colors hover:text-foreground">
          {t("faq")}
        </a>
      </div>
      <span className="font-mono text-[10px]">
        {t("copyright", { year: new Date().getFullYear() })}
      </span>
    </footer>
  );
}
