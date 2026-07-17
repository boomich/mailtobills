"use client";

import { useState } from "react";
import Link from "next/link";
import { useAction } from "convex/react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@mailtobills/ui/components/button";
import { Postmark } from "@mailtobills/ui/components/postmark";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@mailtobills/ui/components/alert-dialog";

import { api } from "@/lib/convexClient";
import { getDateLocale } from "@/lib/localized-format";
import { useExpenseDocuments } from "@/features/expense-documents/read-model/useExpenseDocuments";

/*
 * The dispatch (DESIGN.md §12) — the handover form of the seal ritual:
 * confirm the addressee on the registered-mail form, send, and the
 * cancellation postmark (waves — mail that has travelled) lands as proof
 * of dispatch. External email never leaves on a single click.
 */

type SendToAccountantDialogProps = {
  month: string;
  monthLabel: string;
  isPro: boolean;
  accountantEmail?: string;
  disabled?: boolean;
};

type OutboundExportTranslator = ReturnType<typeof useTranslations>;

function errorMessage(error: unknown, t: OutboundExportTranslator) {
  const message = error instanceof Error ? error.message : "";

  if (message.includes("ACCOUNTANT_EMAIL_NOT_CONFIGURED")) {
    return t("errors.accountantMissing");
  }

  if (message.includes("PRO_REQUIRED")) {
    return t("errors.proRequired");
  }

  if (message.includes("RESEND_API_KEY is not set")) {
    return t("errors.emailNotConfigured");
  }

  if (message.includes("RESEND_SEND_FAILED")) {
    return t("errors.providerFailed");
  }

  return t("errors.fallback");
}

export function SendToAccountantDialog({
  month,
  monthLabel,
  isPro,
  accountantEmail,
  disabled = false,
}: SendToAccountantDialogProps) {
  const t = useTranslations("OutboundExport");
  const locale = useLocale();
  const sendManualExportToAccountant = useAction(
    api.exports.sendManualExportToAccountant,
  );
  const { exportSummary, isLoading } = useExpenseDocuments(month);
  const [isSending, setIsSending] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isPro) {
    return (
      <form action="/api/billing/checkout" method="post">
        <Button
          type="submit"
          variant="outline"
          className="border-primary text-primary"
          disabled={disabled}
        >
          {t("send")}
          <span className="border border-primary px-1 py-0.5 font-display text-[9px] leading-none tracking-[0.12em]">
            {t("pro")}
          </span>
        </Button>
      </form>
    );
  }

  if (!accountantEmail) {
    return (
      <p className="text-muted-foreground text-sm">
        {t.rich("missingAccountantNotice", {
          settingsLink: (chunks) => (
            <Link
              className="font-medium underline underline-offset-4"
              href="/settings"
            >
              {chunks}
            </Link>
          ),
        })}
      </p>
    );
  }

  const dispatchDate = new Intl.DateTimeFormat(getDateLocale(locale), {
    month: "short",
    timeZone: "UTC",
  })
    .format(new Date())
    .replace(".", "")
    .toUpperCase()
    .concat(" ", String(new Date().getUTCFullYear()).slice(-2));

  const sendExport = () => {
    if (isSending) {
      return;
    }

    setError(null);
    setIsSending(true);

    void sendManualExportToAccountant({ month })
      .then((result) => {
        setSentTo(result.sentTo);
      })
      .catch((sendError: unknown) => {
        setError(errorMessage(sendError, t));
      })
      .finally(() => setIsSending(false));
  };

  const dispatched = sentTo !== null;

  return (
    <AlertDialog
      onOpenChange={(open) => {
        if (!open) {
          setSentTo(null);
          setError(null);
          setIsSending(false);
        }
      }}
    >
      <AlertDialogTrigger asChild>
        <Button disabled={disabled}>{t("send")}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[520px] gap-0 p-0">
        {/* rubber-stamp ink irregularity for the dispatch mark (see CarimboDefs) */}
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
          <defs>
            <filter id="ink-rough-dispatch">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.55"
                numOctaves="2"
                seed="11"
                result="noise"
              />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" />
            </filter>
          </defs>
        </svg>
        <AlertDialogHeader className="border-b-2 border-foreground px-6 pt-6 pb-4 text-left">
          <div
            className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase"
            aria-hidden
          >
            M/{month} · CORREIO REGISTADO
          </div>
          <AlertDialogTitle className="font-display text-2xl font-extrabold tracking-[-0.01em] [font-stretch:110%]">
            {t("title", { month: monthLabel })}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[13.5px] text-muted-foreground">
            {t("description")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {dispatched ? (
          <div className="grid place-items-center gap-5 px-6 py-9 text-center">
            <div className="carimbo-thunk text-stamp mix-blend-multiply [filter:url(#ink-rough-dispatch)]">
              <Postmark
                date={dispatchDate}
                className="h-[84px] w-auto rotate-[-2deg]"
                label={t("sentStatus")}
              />
            </div>
            <p role="status" className="text-[14px] text-muted-foreground">
              {t("sentTo", { email: sentTo })}
            </p>
            <AlertDialogCancel className="mt-1">{t("close")}</AlertDialogCancel>
          </div>
        ) : (
          <>
            <div className="grid gap-4 px-6 py-5">
              <div className="grid gap-1.5">
                <span className="font-display text-[11px] font-bold tracking-[0.12em] uppercase [font-stretch:86%]">
                  {t("addresseeLabel")}
                </span>
                <span className="border-b border-foreground/25 pb-1.5 font-mono text-[13px] break-all">
                  {accountantEmail}
                </span>
              </div>
              <div className="grid gap-1.5">
                <span className="font-display text-[11px] font-bold tracking-[0.12em] uppercase [font-stretch:86%]">
                  {t("contentsLabel")}
                </span>
                <span className="border-b border-foreground/25 pb-1.5 font-mono text-[13px]">
                  {isLoading
                    ? "…"
                    : t("contents", {
                        count: exportSummary.includedDocumentCount,
                      })}
                </span>
              </div>
              {error ? (
                <p role="alert" className="text-[13px] text-destructive">
                  {error}
                </p>
              ) : null}
            </div>
            <div className="border-t-2 border-dashed border-foreground/50 px-6 pt-4 pb-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-display text-[12px] font-bold tracking-[0.12em] uppercase [font-stretch:88%]">
                  {t("readyStatus")}
                </span>
                <div className="flex flex-wrap justify-end gap-2.5">
                  <AlertDialogCancel className="mt-0">
                    {t("cancel")}
                  </AlertDialogCancel>
                  <Button
                    onClick={sendExport}
                    disabled={isLoading || isSending}
                  >
                    {isSending ? t("sending") : t("confirmSend")}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
