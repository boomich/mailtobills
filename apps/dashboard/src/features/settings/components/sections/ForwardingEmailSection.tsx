import { UserSettings } from "../../types";

import {
  Item,
  Button,
  Section,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  InboxIcon,
  ItemContent,
} from "@mailtobills/ui";

interface ForwardingEmailSectionProps {
  settings: UserSettings;
}

export function ForwardingEmailSection({
  settings,
}: ForwardingEmailSectionProps) {
  // If forwardingEmails is empty, default to showing the login email
  const emailsToShow =
    settings.forwardingEmails && settings.forwardingEmails.length > 0
      ? settings.forwardingEmails
      : settings.email
      ? [settings.email]
      : [];

  return (
    <Section title="Forwarding Emails">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-slate-700">
          <span className="font-medium">
            Invoices forwarded from these addresses will be added to your
            account:
          </span>
        </div>

        {emailsToShow.length > 0 ? (
          <ItemGroup className="w-auto">
            {emailsToShow.map((email) => (
              <Item key={email} variant="outline" size="sm">
                <ItemMedia variant="icon">
                  <InboxIcon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{email}</ItemTitle>
                </ItemContent>
              </Item>
            ))}
          </ItemGroup>
        ) : (
          <div className="text-sm text-slate-600 max-w-2xl">
            <p>No forwarding emails configured yet.</p>
          </div>
        )}

        <div className="mt-2">
          <Button type="button">Add Email Address</Button>
        </div>
      </div>
    </Section>
  );
}
