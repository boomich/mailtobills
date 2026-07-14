import Link from "next/link";

const VARIANTS = [
  { key: "a", label: "HERO A" },
  { key: "b", label: "HERO B" },
  { key: "c", label: "HERO C" },
] as const;

export function HeroSwitch({ current }: { current: "a" | "b" | "c" }) {
  return (
    <nav className="lab-switch lab-switch--overlay mono" aria-label="Design lab">
      <Link href="/lab">SPECIMEN</Link>
      <span className="lab-switch__sep">·</span>
      <span>BAKE-OFF:</span>
      {VARIANTS.map((variant) =>
        variant.key === current ? (
          <span key={variant.key} className="lab-switch__current">
            {variant.label}
          </span>
        ) : (
          <Link key={variant.key} href={`/lab/hero/${variant.key}`}>
            {variant.label}
          </Link>
        ),
      )}
    </nav>
  );
}
