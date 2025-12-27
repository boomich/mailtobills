import { Section, CopyField } from "@mailtobills/ui";
import { InboxIcon } from "@mailtobills/ui";
import { UserSettings } from "../../types";

interface ForwardingEmailSectionProps {
  settings: UserSettings;
}

export function ForwardingEmailSection({ settings }: ForwardingEmailSectionProps) {
  return (
    <Section title="Forwarding Email">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-slate-700">
           {/* Fallback icon if InboxIcon doesn't work well or isn't exported as component */}
           <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
           </svg>
           <span className="font-medium">Forward invoices to this address:</span>
        </div>
        
        <div className="max-w-md">
            <CopyField value={settings.inboxAlias || ""} />
        </div>

        <p className="text-sm text-slate-500">
            Forwarding any invoices to this email will automatically add them to your account.
        </p>
      </div>
    </Section>
  );
}
