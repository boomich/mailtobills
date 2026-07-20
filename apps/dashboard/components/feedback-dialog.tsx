"use client";

import { useState } from "react";

import { useMutation } from "convex/react";
import { useLocale, useTranslations } from "next-intl";

import { Carimbo, CarimboDefs } from "@mailtobills/ui/components/carimbo";
import { Button } from "@mailtobills/ui/components/button";
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

export function FeedbackDialog() {
  const t = useTranslations("Feedback");
  const locale = useLocale();
  const submitFeedback = useMutation(api.feedback.submit);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiptId, setReceiptId] = useState<string | null>(null);

  const postmarkDate = new Intl.DateTimeFormat(getDateLocale(locale), {
    month: "short",
    timeZone: "UTC",
  })
    .format(new Date())
    .replace(".", "")
    .toUpperCase()
    .concat(" ", String(new Date().getUTCFullYear()).slice(-2));

  const closeAndReset = () => {
    setMessage("");
    setError(null);
    setIsSubmitting(false);
    setReceiptId(null);
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const feedbackId = await submitFeedback({ message: trimmedMessage });
      setReceiptId(feedbackId);
    } catch (submissionError) {
      console.error("feedback_submit_failed", { error: submissionError });
      setError(t("error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitted = receiptId !== null;

  return (
    <AlertDialog
      onOpenChange={(open) => {
        if (!open) {
          closeAndReset();
        }
      }}
    >
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="px-2 py-1 font-display text-[12px] font-bold tracking-[0.08em] uppercase [font-stretch:86%] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t("trigger")}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[520px] gap-0 p-0">
        <CarimboDefs />
        <AlertDialogHeader className="border-b-2 border-foreground px-6 pt-6 pb-4 text-left">
          <div
            className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase"
            aria-hidden
          >
            MOD. C-04 · CORREIO DO CLIENTE
          </div>
          <AlertDialogTitle className="font-display text-2xl font-extrabold tracking-[-0.01em] [font-stretch:110%]">
            {t("title")}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[13.5px] text-muted-foreground">
            {t("description")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {submitted ? (
          <div className="grid place-items-center gap-5 px-6 py-9 text-center">
            <Carimbo
              id={receiptId}
              date={postmarkDate}
              refLine="MOD. C-04"
              animate
            />
            <p role="status" className="text-[14px] text-muted-foreground">
              {t("received")}
            </p>
            <AlertDialogCancel className="mt-1">{t("close")}</AlertDialogCancel>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-4 px-6 py-5">
            <div className="grid gap-2">
              <label
                htmlFor="feedback-message"
                className="font-display text-[11px] font-bold tracking-[0.12em] uppercase [font-stretch:86%]"
              >
                {t("letterLabel")}
              </label>
              <textarea
                id="feedback-message"
                // The ritual opens on a typed letter, so the first form field receives focus.
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                maxLength={2000}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="min-h-36 resize-y border-[1.5px] border-foreground bg-background px-3 py-2.5 font-mono text-[13px] leading-relaxed outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                placeholder={t("placeholder")}
              />
              <div className="flex justify-end">
                <span className="font-mono text-[10px] text-muted-foreground">
                  {t("counter", { count: message.length })}
                </span>
              </div>
            </div>
            {error ? (
              <p role="alert" className="text-[13px] text-destructive">
                {error}
              </p>
            ) : null}
            <div className="flex flex-wrap justify-end gap-2.5 border-t-2 border-dashed border-foreground/50 pt-4">
              <AlertDialogCancel className="mt-0">{t("cancel")}</AlertDialogCancel>
              <Button type="submit" disabled={isSubmitting || !message.trim()}>
                {isSubmitting ? t("sending") : t("submit")}
              </Button>
            </div>
          </form>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
