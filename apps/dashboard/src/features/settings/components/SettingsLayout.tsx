import type { ReactNode } from "react";
import type { SettingsSection } from "../settingsSections";
import { SettingsNav } from "./SettingsNav";

export type SettingsLayoutProps = {
  header: ReactNode;
  sections: SettingsSection[];
  children: ReactNode;
};

export const SettingsLayout = ({
  header,
  sections,
  children,
}: SettingsLayoutProps) => {
  return (
    <div className="space-y-8">
      {header}
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <SettingsNav sections={sections} />
          </div>
        </aside>
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};
