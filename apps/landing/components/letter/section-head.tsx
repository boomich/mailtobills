/* On-sheet section head — the specimen's form-header pattern (lab/page.tsx),
   promoted to the production letter. */
export function SectionHead({
  n,
  title,
  note,
}: {
  n?: string;
  title: string;
  note?: string;
}) {
  return (
    <header className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-2">
      {n && (
        <span className="grid size-7 shrink-0 place-items-center border-[1.5px] border-foreground pt-px font-mono text-[13px] leading-none font-bold">
          {n}
        </span>
      )}
      <h2 className="font-display text-xl font-bold tracking-[0.11em] uppercase [font-stretch:86%] sm:text-[22px]">
        {title}
      </h2>
      {note && (
        <span className="ml-auto font-mono text-[10px] tracking-[0.08em] text-muted-foreground uppercase">
          {note}
        </span>
      )}
    </header>
  );
}
