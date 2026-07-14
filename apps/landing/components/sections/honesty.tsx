import { getTranslations } from "next-intl/server";

/* The declaration — typed into the letter, unnumbered on purpose. */
export async function Honesty() {
  const t = await getTranslations("Honesty");

  return (
    <section className="border-b border-border px-5 py-12 sm:px-10 sm:py-14 lg:px-14">
      <div className="mx-auto max-w-[600px] border border-foreground px-7 py-8 sm:px-10">
        <h2 className="font-display text-lg font-bold tracking-[0.11em] uppercase [font-stretch:86%]">
          {t("title")}
        </h2>
        <p className="mt-4 font-mono text-[13.5px] leading-[1.8] text-foreground/85">
          {t("body")}
        </p>
      </div>
    </section>
  );
}
