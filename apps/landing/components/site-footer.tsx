import { getTranslations } from "next-intl/server";

import { PostmarkMini } from "@mailtobills/ui/components/postmark";

export async function SiteFooter() {
  const t = await getTranslations("Footer");

  return (
    <footer className="border-t border-foreground bg-secondary">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2.5">
          <PostmarkMini className="size-5 text-foreground" />
          <span className="font-display text-[13px] font-bold text-foreground [font-stretch:105%]">
            MailToBills
          </span>
          <span className="hidden font-mono text-[10px] tracking-[0.1em] uppercase sm:inline">
            {t("tagline")}
          </span>
        </div>
        <div className="flex items-center gap-5 font-display text-[11px] font-semibold tracking-[0.1em] uppercase [font-stretch:88%]">
          <a
            href="#how-it-works"
            className="transition-colors hover:text-foreground"
          >
            {t("howItWorks")}
          </a>
          <a
            href="#pricing"
            className="transition-colors hover:text-foreground"
          >
            {t("pricing")}
          </a>
          <a href="#faq" className="transition-colors hover:text-foreground">
            {t("faq")}
          </a>
        </div>
        <div className="font-mono text-[11px]">
          {t("copyright", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}
