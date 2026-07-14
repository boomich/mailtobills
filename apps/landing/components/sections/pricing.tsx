import { getTranslations } from "next-intl/server";

import { Button } from "@mailtobills/ui/components/button";
import { cn } from "@mailtobills/ui/lib/utils";

import { signUpUrl } from "@/lib/links";

/* Two tariffs on one rate card. Plan truths come from CONTEXT.md:
   the Free Plan collects UNLIMITED documents (it is not a trial). */
export async function Pricing() {
  const t = await getTranslations("Pricing");
  const plans = [
    {
      key: "free",
      highlighted: false,
      features: [
        "free.features.address",
        "free.features.unlimited",
        "free.features.dashboard",
        "free.features.export",
      ],
    },
    {
      key: "pro",
      highlighted: true,
      features: [
        "pro.features.free",
        "pro.features.send",
        "pro.features.schedule",
        "pro.features.addresses",
      ],
    },
  ] as const;

  return (
    <section
      id="pricing"
      className="scroll-mt-16 border-b border-border bg-secondary"
    >
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-bold tracking-[0.11em] uppercase [font-stretch:86%] sm:text-[27px]">
            {t("title")}
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            {t("description")}
          </p>
        </div>

        <div className="mt-10 grid max-w-3xl gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={cn(
                "relative flex flex-col border bg-background p-7",
                plan.highlighted
                  ? "border-[1.5px] border-foreground shadow-[6px_6px_0_0_oklch(0.27_0.025_268/0.13)]"
                  : "border-border",
              )}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-[15px] font-bold tracking-[0.12em] uppercase [font-stretch:88%]">
                  {t(`${plan.key}.name`)}
                </h3>
                {plan.highlighted && (
                  <span className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase">
                    {t("highlight")}
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-baseline gap-2 border-b border-border pb-5">
                <span className="font-mono text-4xl font-bold tabular-nums">
                  {t(`${plan.key}.price`)}
                </span>
                <span className="font-mono text-[12px] text-muted-foreground">
                  {t(`${plan.key}.period`)}
                </span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {t(`${plan.key}.description`)}
              </p>
              <ul className="mt-5 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-baseline gap-3 border-b border-border py-2.5 text-sm last:border-b-0"
                  >
                    <span
                      className="font-mono text-[11px] font-bold text-primary"
                      aria-hidden
                    >
                      ✓
                    </span>
                    {t(feature)}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant={plan.highlighted ? "default" : "outline"}
                className="mt-7 w-full"
              >
                <a href={signUpUrl}>{t(`${plan.key}.cta`)}</a>
              </Button>
            </div>
          ))}
        </div>
        <p className="mt-6 font-mono text-[11px] tracking-[0.08em] text-muted-foreground">
          {t("note")}
        </p>
      </div>
    </section>
  );
}
