"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { localeFormats, type Locale } from "@mailtobills/i18n";
import { Button } from "@mailtobills/ui/components/button";

type SubscriptionStatus = "active" | "past_due" | "cancelled";

function formatDate(timestamp: number | undefined, locale: Locale) {
  if (!timestamp) return null;

  return new Intl.DateTimeFormat(localeFormats[locale].dateLocale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(timestamp));
}

export function BillingSettings({
  isPro,
  subscriptionStatus,
  currentPeriodEnd,
  proPriceLabel,
}: {
  isPro: boolean;
  subscriptionStatus?: SubscriptionStatus;
  currentPeriodEnd?: number;
  proPriceLabel: string;
}) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Settings.billing");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showUpgradeSuccess, setShowUpgradeSuccess] = useState(false);
  const renewalDate = formatDate(currentPeriodEnd, locale);
  const isPastDue = subscriptionStatus === "past_due";
  const isProLike = isPro || isPastDue;
  const proFeatures = [
    t("features.directTitle"),
    t("features.scheduleTitle"),
    t("features.addressesTitle"),
  ];

  useEffect(() => {
    if (searchParams.get("upgraded") !== "1") return;

    setShowUpgradeSuccess(true);
    router.replace(pathname);
  }, [pathname, router, searchParams]);

  const planTitle = isPastDue
    ? t("pausedTitle")
    : isPro
      ? t("proTitle")
      : t("freeTitle");
  const planDescription = isPastDue
    ? t("pausedDescription")
    : isPro
      ? renewalDate
        ? t("renews", { date: renewalDate })
        : t("activeDescription")
      : t("freePlanDescription");

  return (
    <div className="max-w-[560px]">
      {showUpgradeSuccess ? (
        <p
          className="mb-5 border border-primary px-3 py-2 text-[13px] text-primary"
          aria-live="polite"
        >
          {isProLike ? t("upgradeConfirmed") : t("upgradePending")}
        </p>
      ) : null}

      <div className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-display text-[13px] font-bold tracking-[0.12em] uppercase [font-stretch:88%]">
          {planTitle}
        </span>
        <span className="font-mono text-[10px] tracking-[0.1em] text-primary uppercase">
          {isPastDue ? t("pastDue") : isPro ? t("pro") : t("free")}
        </span>
        <span className="font-mono text-[11px] text-muted-foreground">
          {planDescription}
        </span>
      </div>

      {isPastDue ? (
        <p className="mb-5 border border-primary px-3 py-2 text-[13px] text-muted-foreground">
          {t("paymentFailed")}
        </p>
      ) : null}

      <div className="border-[1.5px] border-foreground">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border bg-secondary px-5 py-3.5">
          <span className="font-display text-[13px] font-bold tracking-[0.12em] uppercase [font-stretch:88%]">
            {t("pro")}
          </span>
          <span className="font-mono text-[13px] text-muted-foreground">
            {proPriceLabel}
          </span>
        </div>
        <ul className="px-5 py-4">
          {proFeatures.map((feature) => (
            <li
              key={feature}
              className="flex items-baseline gap-3 border-b border-border py-2 text-[13.5px] last:border-b-0"
            >
              <span className="font-mono text-[11px] font-bold text-primary">✓</span>
              {feature}
            </li>
          ))}
        </ul>
        <div className="border-t border-border px-5 py-4">
          {isProLike ? (
            <Button asChild variant="outline" className="rounded-none max-sm:w-full">
              <a href="/api/billing/portal">
                {isPastDue ? t("updatePayment") : t("manageBilling")}
              </a>
            </Button>
          ) : (
            <form action="/api/billing/checkout" method="post">
              <Button type="submit" className="rounded-none max-sm:w-full">
                {t("upgrade")}
              </Button>
            </form>
          )}
          <p className="mt-2.5 font-mono text-[10px] tracking-[0.08em] text-muted-foreground">
            {t("freePlanDescription")}
          </p>
        </div>
      </div>
    </div>
  );
}
