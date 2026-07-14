import { ChevronDown } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { SectionHead } from "@/components/letter/section-head";

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
      className="scroll-mt-20 border-b border-border px-5 py-12 sm:px-10 sm:py-14 lg:px-14"
    >
      <SectionHead n="4" title={t("title")} note="VERSO DO FORMULÁRIO" />
      <div className="border-t-2 border-foreground">
        {faqKeys.map((key) => (
          <details key={key} className="group details-slide border-b border-border">
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
    </section>
  );
}
