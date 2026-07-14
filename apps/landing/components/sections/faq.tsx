import { ChevronDown } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function Faq() {
  const t = await getTranslations("Faq");
  const faqKeys = [
    "forward",
    "export",
    "efatura",
    "senders",
    "files",
    "accountant",
  ] as const;

  return (
    <section
      id="faq"
      className="scroll-mt-16 border-b border-border bg-background"
    >
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-display text-2xl font-bold tracking-[0.11em] uppercase [font-stretch:86%] sm:text-[27px]">
          {t("title")}
        </h2>
        <div className="mt-8 border-t-2 border-foreground">
          {faqKeys.map((key) => (
            <details key={key} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 py-4.5 text-[15px] font-semibold [&::-webkit-details-marker]:hidden">
                {t(`items.${key}.question`)}
                <ChevronDown
                  className="size-4 shrink-0 self-center text-muted-foreground transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                  aria-hidden
                />
              </summary>
              <p className="max-w-[62ch] pb-5 text-sm leading-relaxed text-muted-foreground">
                {t(`items.${key}.answer`)}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
