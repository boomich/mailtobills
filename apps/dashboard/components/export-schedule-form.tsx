"use client";

import { CalendarClock } from "lucide-react";
import { useActionState, useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { localeFormats } from "@mailtobills/i18n";

import {
  updateAccountantDeliverySettings,
  type CustomerSettingsActionState,
} from "@/features/customer/actions/updateCustomerSettings";
import { Button } from "@mailtobills/ui/components/button";

function isPlausibleEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function nextExportDates(today: Date, scheduleDay: number) {
  const sendDate =
    today.getUTCDate() < scheduleDay
      ? new Date(
          Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), scheduleDay),
        )
      : new Date(
          Date.UTC(
            today.getUTCFullYear(),
            today.getUTCMonth() + 1,
            scheduleDay,
          ),
        );
  const coveringMonth = new Date(
    Date.UTC(sendDate.getUTCFullYear(), sendDate.getUTCMonth() - 1, 1),
  );

  return { coveringMonth, sendDate };
}

export function ExportScheduleForm({
  isPro,
  accountantEmail,
  accountantName,
  exportScheduleDay,
}: {
  isPro: boolean;
  accountantEmail?: string;
  accountantName?: string;
  exportScheduleDay?: number;
}) {
  const locale = useLocale();
  const t = useTranslations("Settings.delivery");
  const [day, setDay] = useState(exportScheduleDay ?? 5);
  const [enabled, setEnabled] = useState(exportScheduleDay !== undefined);
  const [hasChangedSinceResult, setHasChangedSinceResult] = useState(false);
  const [actionState, formAction, isPending] = useActionState(
    updateAccountantDeliverySettings,
    { status: "idle" } satisfies CustomerSettingsActionState,
  );
  const emailIsValid = isPlausibleEmail(accountantEmail ?? "");
  const preview = useMemo(() => {
    if (!enabled || !emailIsValid) return null;

    const { coveringMonth, sendDate } = nextExportDates(new Date(), day);
    const dateLocale = localeFormats[locale].dateLocale;
    const date = new Intl.DateTimeFormat(dateLocale, {
      day: "numeric",
      month: "short",
      timeZone: "UTC",
      year: "numeric",
    }).format(sendDate);
    const month = new Intl.DateTimeFormat(dateLocale, {
      month: "long",
      timeZone: "UTC",
      year: "numeric",
    }).format(coveringMonth);

    return t("nextExport", { date, month });
  }, [day, emailIsValid, enabled, locale, t]);

  useEffect(() => {
    if (
      actionState.status === "success" &&
      actionState.scheduleEnabled !== undefined
    ) {
      setEnabled(actionState.scheduleEnabled);
    }
  }, [actionState]);

  if (!isPro) {
    return (
      <div className="flex max-w-[560px] flex-wrap items-center justify-between gap-4 border border-dashed border-foreground/40 px-5 py-4">
        <p className="max-w-[38ch] text-[13.5px] text-muted-foreground">
          {t("lockedDescription")}
        </p>
        <Button asChild size="sm" className="rounded-none">
          <a href="#plan">{t("upgrade")}</a>
        </Button>
      </div>
    );
  }

  return (
    <form
      className="grid max-w-[560px] gap-5"
      action={formAction}
      noValidate
      onSubmit={() => setHasChangedSinceResult(false)}
    >
      <input type="hidden" name="accountantEmail" value={accountantEmail ?? ""} />
      <input type="hidden" name="accountantName" value={accountantName ?? ""} />
      <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
        <div className="grid gap-1.5">
          <label
            htmlFor="export-day"
            className="font-display text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase [font-stretch:80%]"
          >
            {t("sendDay")}
          </label>
          <select
            id="export-day"
            name="exportScheduleDay"
            value={day}
            disabled={!emailIsValid}
            onChange={(event) => {
              setDay(Number(event.target.value));
              setHasChangedSinceResult(true);
            }}
            className="border-input bg-background ring-offset-background flex h-10 w-full border px-3 py-1 font-mono text-[13px] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {Array.from({ length: 28 }, (_, index) => index + 1).map(
              (option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ),
            )}
          </select>
        </div>

        <label className="flex items-center gap-2 self-end border border-foreground/40 px-3 py-2 text-[13px]">
          <input
            type="checkbox"
            name="scheduleEnabled"
            checked={enabled}
            disabled={!emailIsValid}
            onChange={(event) => {
              setEnabled(event.target.checked);
              setHasChangedSinceResult(true);
            }}
            className="size-4"
          />
          <span>{t("enable")}</span>
          <span className="ml-auto font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase">
            {enabled ? t("on") : t("off")}
          </span>
        </label>
      </div>

      {!emailIsValid ? (
        <p className="text-[13px] text-muted-foreground">{t("accountantRequired")}</p>
      ) : null}

      {preview ? (
        <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
          <CalendarClock className="size-4" />
          {preview}
        </div>
      ) : null}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Button
          type="submit"
          name="intent"
          value="save"
          disabled={isPending}
          className="rounded-none"
        >
          {t("save")}
        </Button>
        {enabled ? (
          <Button
            type="submit"
            name="intent"
            value="disable"
            variant="outline"
            disabled={isPending}
            formNoValidate
            className="rounded-none"
          >
            {t("disable")}
          </Button>
        ) : null}
      </div>

      {!isPending &&
      !hasChangedSinceResult &&
      actionState.status === "success" ? (
        <p className="text-sm text-primary" aria-live="polite">
          {actionState.message}
        </p>
      ) : null}
      {!isPending &&
      !hasChangedSinceResult &&
      actionState.status === "error" ? (
        <p className="text-destructive text-sm" role="alert">
          {actionState.message}
        </p>
      ) : null}
    </form>
  );
}
