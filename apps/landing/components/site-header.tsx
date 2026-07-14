/* eslint-disable @next/next/no-html-link-for-pages -- Locale switches reload root metadata and html lang. */
import { getLocale, getTranslations } from "next-intl/server";

import { Button } from "@mailtobills/ui/components/button";
import { PostmarkMini } from "@mailtobills/ui/components/postmark";

import { Link } from "@/i18n/navigation";
import { signInUrl, signUpUrl } from "@/lib/links";

export async function SiteHeader() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations("Navigation"),
  ]);
  const navLinks = [
    { href: "#how-it-works", label: t("howItWorks") },
    { href: "#export", label: t("export") },
    { href: "#pricing", label: t("pricing") },
    { href: "#faq", label: t("faq") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-foreground bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label={t("homeLabel")}
        >
          <PostmarkMini className="size-6 text-foreground" />
          <span className="font-display text-[15px] font-bold tracking-[0.02em] [font-stretch:105%]">
            MailToBills
          </span>
        </Link>
        <nav
          aria-label={t("primaryLabel")}
          className="hidden items-center gap-1 lg:flex"
        >
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="px-3 py-1.5 font-display text-[12px] font-semibold tracking-[0.1em] text-muted-foreground uppercase [font-stretch:88%] transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-0.5 border-r border-border pr-2"
            aria-label={t("languageLabel")}
            role="group"
          >
            <a
              href="/"
              aria-current={locale === "en" ? "page" : undefined}
              className="px-1.5 py-1 font-mono text-xs font-bold text-muted-foreground hover:text-foreground aria-[current=page]:text-foreground aria-[current=page]:underline aria-[current=page]:decoration-[1.5px] aria-[current=page]:underline-offset-4"
            >
              EN
            </a>
            <a
              href="/pt-PT"
              aria-current={locale === "pt-PT" ? "page" : undefined}
              className="px-1.5 py-1 font-mono text-xs font-bold text-muted-foreground hover:text-foreground aria-[current=page]:text-foreground aria-[current=page]:underline aria-[current=page]:decoration-[1.5px] aria-[current=page]:underline-offset-4"
            >
              PT
            </a>
          </div>
          <Button asChild variant="ghost" size="sm" className="max-sm:hidden">
            <a href={signInUrl}>{t("signIn")}</a>
          </Button>
          <Button asChild size="sm">
            <a href={signUpUrl}>{t("getStarted")}</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
