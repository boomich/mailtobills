import { LetterHead } from "@/components/letter/letter-head";
import { SiteFooter } from "@/components/site-footer";

/*
 * Legal documents are counter documents: the same letter sheet, set as a
 * numbered official form (DESIGN.md §7 form rules). The registration line
 * is graphic-layer postal Portuguese; every load-bearing word lives in the
 * localized body (§3).
 */

export type LegalSection = {
  title: string;
  paragraphs: string[];
  list?: string[];
};

export function LegalLetter({
  registration,
  title,
  updatedLabel,
  updatedDate,
  intro,
  sections,
  skipLabel,
}: {
  registration: string;
  title: string;
  updatedLabel: string;
  updatedDate: string;
  intro: string;
  sections: LegalSection[];
  skipLabel: string;
}) {
  return (
    <div className="landing-page flex min-h-svh flex-col bg-secondary text-foreground">
      <a
        href="#main-content"
        className="sr-only z-[100] bg-background px-4 py-2 text-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:ring-2 focus:ring-ring focus:outline-none"
      >
        {skipLabel}
      </a>
      <main
        id="main-content"
        className="mx-auto w-full max-w-[920px] flex-1 px-2.5 pt-4 sm:px-6 sm:pt-8"
        tabIndex={-1}
      >
        <article className="border border-foreground bg-background shadow-[8px_8px_0_0_oklch(0.27_0.025_268/0.12)]">
          <LetterHead />
          <div className="px-5 py-10 sm:px-10 sm:py-14 lg:px-14">
            <header className="border-b-2 border-foreground pb-6">
              <div
                className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase"
                aria-hidden
              >
                {registration}
              </div>
              <h1 className="mt-2 font-display text-[32px] leading-[1.05] font-extrabold tracking-[-0.01em] [font-stretch:110%] sm:text-[40px]">
                {title}
              </h1>
              <p className="mt-3 font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
                {updatedLabel} · {updatedDate}
              </p>
            </header>

            <p className="mt-7 max-w-[68ch] text-[15px] leading-relaxed text-muted-foreground">
              {intro}
            </p>

            <div className="mt-10 grid gap-10">
              {sections.map((section, index) => (
                <section key={section.title}>
                  <header className="mb-3.5 flex items-center gap-3.5">
                    <span className="grid size-6 shrink-0 place-items-center border-[1.5px] border-foreground pt-px font-mono text-[11.5px] leading-none font-bold">
                      {index + 1}
                    </span>
                    <h2 className="font-display text-[15px] font-bold tracking-[0.1em] uppercase [font-stretch:86%] sm:text-base">
                      {section.title}
                    </h2>
                  </header>
                  <div className="grid max-w-[68ch] gap-3 border-l border-foreground/25 pl-[calc(0.75rem+11px)] sm:pl-9">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="text-[14.5px] leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                    {section.list ? (
                      <ul className="grid gap-1.5">
                        {section.list.map((item) => (
                          <li
                            key={item.slice(0, 40)}
                            className="flex gap-2.5 text-[14.5px] leading-relaxed"
                          >
                            <span
                              className="mt-[9px] h-px w-3 shrink-0 bg-foreground"
                              aria-hidden
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </article>
        <div className="h-8" aria-hidden />
      </main>
      <SiteFooter />
    </div>
  );
}
