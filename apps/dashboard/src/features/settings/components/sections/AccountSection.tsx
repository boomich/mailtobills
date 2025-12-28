import { Section } from "@mailtobills/ui";
import { UserSettings } from "../../types";

interface AccountSectionProps {
  settings: UserSettings;
}

export function AccountSection({ settings }: AccountSectionProps) {
  return (
    <Section title="Account">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-xl font-bold text-slate-500 uppercase">
          {settings.name?.[0] || settings.email?.[0] || "?"}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">Login Email</p>
          <p className="text-base font-semibold text-slate-900">{settings.email}</p>
        </div>
      </div>
    </Section>
  );
}
