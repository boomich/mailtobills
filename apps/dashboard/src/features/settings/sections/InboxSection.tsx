"use client";

import { useEffect, useState } from "react";

import { Button, Input, Label, Section, Toast, useToast } from "@mailtobills/ui";
import { CopyField } from "../components/CopyField";
import { SettingsCard } from "../components/SettingsCard";
import type { SettingsSectionProps } from "../types";

const MAIL_DOMAIN = "mailtobills.com";

export const InboxSection = ({ settings, onUpdate }: SettingsSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [alias, setAlias] = useState(settings.inboxAlias ?? "inbox");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast, showToast } = useToast();

  useEffect(() => {
    setAlias(settings.inboxAlias ?? "inbox");
  }, [settings.inboxAlias]);

  const inboxAddress = `${alias}@${MAIL_DOMAIN}`;

  const handleSave = async () => {
    const trimmedAlias = alias.trim();
    if (!trimmedAlias) {
      setErrorMessage("Inbox alias cannot be empty.");
      return;
    }

    setErrorMessage(null);
    setIsSaving(true);
    try {
      await onUpdate({
        inboxAlias: trimmedAlias,
      });
      showToast("Inbox settings saved.", "success");
      setIsEditing(false);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to save inbox settings."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SettingsCard
      id="inbox"
      title="Forwarding Email"
      description="Forward invoices to your private MailToBills inbox."
      actions={
        <Button
          variant="secondary"
          onClick={() => {
            if (isEditing) {
              setAlias(settings.inboxAlias ?? "inbox");
            }
            setIsEditing(!isEditing);
            setErrorMessage(null);
          }}
        >
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      }
    >
      <Section
        title="Forward invoices to this address"
        description="Any invoice forwarded here will automatically appear in your dashboard."
      >
        <CopyField value={inboxAddress} />
      </Section>

      <Section
        title="Inbox alias"
        description="Choose the alias that forms your forwarding address."
      >
        <div className="space-y-1">
          <Label htmlFor="inbox-alias">Alias</Label>
          <Input
            id="inbox-alias"
            value={alias}
            onChange={(event) => setAlias(event.target.value)}
            disabled={!isEditing || isSaving}
          />
        </div>
      </Section>

      {errorMessage ? (
        <p className="text-sm text-red-600">{errorMessage}</p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handleSave} disabled={!isEditing || isSaving}>
          {isSaving ? "Saving..." : "Save changes"}
        </Button>
        {toast ? (
          <Toast message={toast.message} tone={toast.tone ?? "info"} />
        ) : null}
      </div>
    </SettingsCard>
  );
};
