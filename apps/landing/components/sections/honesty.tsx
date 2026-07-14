import { getTranslations } from "next-intl/server";

/* The honesty block (launch plan §4): the differentiator framed as a
   declaration, typed on the counter — no magic, on purpose. */
export async function Honesty() {
  const t = await getTranslations("Honesty");

  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[640px] border border-foreground bg-background px-7 py-8 sm:px-10 sm:py-9">
          <h2 className="font-display text-lg font-bold tracking-[0.11em] uppercase [font-stretch:86%]">
            {t("title")}
          </h2>
          <p className="mt-4 font-mono text-[13.5px] leading-[1.8] text-foreground/85">
            {t("body")}
          </p>
        </div>
      </div>
    </section>
  );
}
