"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Check, LoaderCircle, Send } from "lucide-react";
import { useAction } from "convex/react";
import { api } from "@mailtobills/convex/_generated/api";

import { Button } from "@mailtobills/ui/components/button";

type SendToAccountantButtonProps = {
  month: string;
  isPro: boolean;
  accountantEmail?: string;
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

export function SendToAccountantButton({
  month,
  isPro,
  accountantEmail,
}: SendToAccountantButtonProps) {
  const t = useTranslations("OutboundExport");
  const sendManualExportToAccountant = useAction(
    api.exports.sendManualExportToAccountant,
  );
  const [isSending, setIsSending] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!isPro) {
    return (
      <form action="/api/billing/checkout" method="post">
        <Button type="submit" variant="outline" className="border-primary text-primary">
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

  const sendExport = () => {
    setError(null);
    setSentTo(null);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsSending(true);

    void sendManualExportToAccountant({ month })
      .then((result) => {
        setSentTo(result.sentTo);
        timeoutRef.current = setTimeout(() => setSentTo(null), 4000);
      })
      .catch((sendError: unknown) => {
        setError(errorMessage(sendError, t));
      })
      .finally(() => setIsSending(false));
  };

  if (sentTo) {
    return (
      <p
        className="text-sm font-medium text-emerald-700 dark:text-emerald-300"
        role="status"
      >
        <Check className="mr-1.5 inline size-4" />
        {t("sentTo", { email: sentTo })}
      </p>
    );
  }

  return (
    <div className="space-y-1.5">
      <Button
        type="button"
        className="w-full md:w-auto"
        disabled={isSending}
        onClick={sendExport}
      >
        {isSending ? (
          <LoaderCircle className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
        {isSending ? t("sending") : t("send")}
      </Button>
      {error ? (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
