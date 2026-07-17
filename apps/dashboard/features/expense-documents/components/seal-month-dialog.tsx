"use client";

import { useEffect, useRef, useState } from "react";
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

import { getDateLocale } from "@/lib/localized-format";
import { useExpenseDocuments } from "@/features/expense-documents/read-model/useExpenseDocuments";

/*
 * The seal (DESIGN.md §7) — the month-end export ritual: review the
 * manifest, press the seal, hand the month over. The violet postmark is
 * sanctioned here (§4: the export seal). Perforation is sanctioned here
 * (§7: the seal moment only). Reduced motion prints the seal instantly.
 */
export function SealMonthDialog({
  month,
  monthLabel,
}: {
  month: string;
  monthLabel: string;
}) {
  const t = useTranslations("CollectionMonth.seal");
  const locale = useLocale();
  const { documents, exportSummary, isLoading } = useExpenseDocuments(month);
  const [sealed, setSealed] = useState(false);
  const downloadTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (downloadTimer.current !== null) {
        window.clearTimeout(downloadTimer.current);
      }
    },
    [],
  );

  const postmarkDate = new Intl.DateTimeFormat(getDateLocale(locale), {
    month: "short",
    timeZone: "UTC",
  })
    .format(new Date(`${month}-01T00:00:00Z`))
    .replace(".", "")
    .toUpperCase()
    .concat(" ", month.slice(2, 4));

  const seal = () => {
    setSealed(true);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // Let the stamp land before the download starts (§8 thunk ≈ 210ms).
    downloadTimer.current = window.setTimeout(
      () => {
        window.location.assign(`/api/exports/${month}`);
      },
      reduceMotion ? 0 : 650,
    );
  };

  const included = documents.filter(
    (document) => document.primaryAttachment !== undefined,
  );

  return (
    <AlertDialog
      onOpenChange={(open) => {
        if (!open) {
          setSealed(false);
        }
      }}
    >
      <AlertDialogTrigger asChild>
        <Button variant="outline">{t("trigger")}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[520px] gap-0 p-0">
        {/* rubber-stamp ink irregularity for the seal (see CarimboDefs) */}
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
          <defs>
            <filter id="ink-rough">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.55"
                numOctaves="2"
                seed="7"
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
            M/{month} · {t("registration")}
          </div>
          <AlertDialogTitle className="font-display text-2xl font-extrabold tracking-[-0.01em] [font-stretch:110%]">
            {t("title", { month: monthLabel })}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[13.5px] text-muted-foreground">
            {t("description")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="max-h-[240px] overflow-y-auto px-6 py-4">
          {isLoading ? (
            <p className="font-mono text-[11px] text-muted-foreground">…</p>
          ) : (
            <table className="w-full border-collapse font-mono">
              <tbody>
                {included.map((document, index) => (
                  <tr
                    key={document.id}
                    className="border-b border-border last:border-b-0"
                  >
                    <td className="w-10 py-1.5 pr-3 align-top text-[10.5px] text-muted-foreground">
                      {String(included.length - index).padStart(3, "0")}
                    </td>
                    <td className="py-1.5 text-[11.5px] break-all">
                      {document.primaryAttachment?.originalFilename}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="border-t-2 border-dashed border-foreground/50 px-6 pt-4 pb-6">
          <div className="flex items-center justify-between gap-6">
            <div className="grid gap-1">
              <span className="font-mono text-[10.5px] tracking-[0.1em] text-muted-foreground uppercase">
                {t("contents", {
                  count: exportSummary.includedDocumentCount,
                })}
              </span>
              <span className="font-display text-[12px] font-bold tracking-[0.12em] uppercase [font-stretch:88%]">
                {sealed ? t("sealedStatus") : t("readyStatus")}
              </span>
            </div>
            <div className="grid min-h-[92px] w-[104px] shrink-0 place-items-center">
              {sealed && (
                <div className="carimbo-thunk text-stamp mix-blend-multiply [filter:url(#ink-rough)]">
                  <Postmark
                    withWaves={false}
                    date={postmarkDate}
                    className="h-[92px] w-[92px] rotate-[-2deg]"
                    label={t("sealedStatus")}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap justify-end gap-2.5">
            <AlertDialogCancel className="mt-0">
              {sealed ? t("close") : t("cancel")}
            </AlertDialogCancel>
            {!sealed && (
              <Button onClick={seal} disabled={isLoading}>
                {t("sealAction")}
              </Button>
            )}
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
