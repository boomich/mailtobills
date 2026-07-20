"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { api } from "@/lib/convexClient";
import { CopyField } from "@/components/copy-field";
import { Button } from "@mailtobills/ui/components/button";

const inboxAddress = "inbox@mailtobills.com";

/* The blank form (activation surface): an empty Collection Month is a
   counter form waiting for its first stamp. The Collection Address is the
   hero field; the right panel reserves the spot where RECEBIDO will land. */
export const OnboardingEmptyState = () => {
  const router = useRouter();
  const t = useTranslations("Onboarding");
  const createDemoExpenseDocument = useMutation(
    api.expenseDocuments.createDemoExpenseDocument,
  );

  const [isSendingTest, setIsSendingTest] = useState(false);
  const onboardingSteps = [
    t("steps.find"),
    t("steps.forward", { address: inboxAddress }),
    t("steps.stored"),
  ];

  const handleSendTestDocument = () => {
    setIsSendingTest(true);
    createDemoExpenseDocument({})
      .catch((error) => {
        console.error("Failed to create demo expense document", error);
      })
      .finally(() => {
        setIsSendingTest(false);
        router.refresh();
      });
  };

  return (
    <section className="border border-foreground bg-background shadow-[8px_8px_0_0_oklch(0.27_0.025_268/0.12)]">
      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col gap-7 px-5 py-8 sm:px-8 sm:py-9">
          <div>
            <div
              className="mb-1.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase"
              aria-hidden
            >
              MOD. C-03 · PRIMEIRA RECOLHA
            </div>
            <h1 className="max-w-[18ch] font-display text-3xl font-extrabold tracking-[-0.01em] [font-stretch:112%] sm:text-4xl">
              {t("title")}
            </h1>
            <p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </div>

          <div className="max-w-[520px] border-[1.5px] border-foreground px-5 py-4">
            <CopyField
              id="mailtobills-inbox"
              label={t("collectionAddress")}
              value={inboxAddress}
              copyLabel={t("copy")}
              copiedLabel={t("copied")}
            />
          </div>

          <ol className="grid border-t-2 border-foreground">
            {onboardingSteps.map((text, index) => (
              <li
                key={text}
                className="flex items-baseline gap-4 border-b border-border py-3.5"
              >
                <span className="font-mono text-[12px] font-bold text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[14.5px] leading-relaxed">{text}</span>
              </li>
            ))}
          </ol>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button
              type="button"
              onClick={handleSendTestDocument}
              disabled={isSendingTest}
              className="w-full whitespace-nowrap sm:w-auto"
            >
              {isSendingTest ? t("sending") : t("addDemo")}
            </Button>
            <p className="text-sm text-muted-foreground">{t("demoHelp")}</p>
          </div>
        </div>

        <div
          className="flex min-h-[260px] items-center justify-center border-t border-border bg-secondary p-8 lg:border-t-0 lg:border-l"
          aria-hidden
        >
          <div className="grid w-full max-w-[300px] place-items-center gap-3 border-2 border-dashed border-foreground/35 px-8 py-14">
            <span className="text-center font-display text-[13px] font-bold tracking-[0.16em] text-muted-foreground uppercase [font-stretch:86%]">
              AGUARDA O PRIMEIRO CARIMBO
            </span>
            <span className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground/70">
              M/—— · Nº 001
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
