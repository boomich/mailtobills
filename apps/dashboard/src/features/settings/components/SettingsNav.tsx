import Link from "next/link";
import { cn } from "@mailtobills/ui";
import type { SettingsSection } from "../settingsSections";

export type SettingsNavProps = {
  sections: SettingsSection[];
};

export const SettingsNav = ({ sections }: SettingsNavProps) => {
  return (
    <nav className="space-y-2">
      {sections.map((section) => (
        <Link
          key={section.key}
          href={section.href}
          className={cn(
            "flex flex-col gap-1 rounded-md border border-transparent px-3 py-2 text-sm text-slate-600 transition hover:border-slate-200 hover:bg-white hover:text-slate-900"
          )}
        >
          <span className="font-medium text-slate-900">{section.title}</span>
          {section.description ? (
            <span className="text-xs text-slate-500">{section.description}</span>
          ) : null}
        </Link>
      ))}
    </nav>
  );
};
