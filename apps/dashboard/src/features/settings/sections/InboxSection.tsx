"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Input, Label, Section } from "@mailtobills/ui";
import type { UpdateSettingsPayload, UserSettings } from "../types";
import { formatInboxAddress } from "../api";
import { CopyField } from "../components/CopyField";
import { SettingsSectionCard } from "../components/SettingsSectionCard";

export type InboxSectionProps = {
  settings: UserSettings;
  onSave: (updates: UpdateSettingsPayload) => Promise<unknown>;
};

export const InboxSection = ({ settings, onSave }: InboxSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [alias, setAlias] = useState(settings.inboxAlias ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!isEditing) {
      setAlias(settings.inboxAlias ?? "");
    }
  }, [isEditing, settings.inboxAlias]);

  const inboxAddress = useMemo(
    () => formatInboxAddress(isEditing ? alias : settings.inboxAlias),
    [alias, isEditing, settings.inboxAlias]
  );

  const hasChanges = alias.trim() !== (settings.inboxAlias ?? "");

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setStatus(null);

    try {
      await onSave({ inboxAlias: alias.trim() || undefined });
      setIsEditing(false);
      setStatus("Saved");
      window.setTimeout(() => setStatus(null), 2000);
    } catch (saveError) {
      setError("We couldn't update your inbox alias. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SettingsSectionCard
      id="inbox"
      title="Forwarding Email"
      description="Use this address to forward invoices into your account."
      actions={
        isEditing ? (
          <>
            <Button
              variant="secondary"
              onClick={() => setIsEditing(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!hasChanges || isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </>
        ) : (
          <Button variant="secondary" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )
      }
    >
      <Section
        title="Inbox address"
        description="Forwarding any invoices to this email will automatically add them to your account."
      >
        <CopyField value={inboxAddress} />
      </Section>

      <Section
        title="Alias"
        description="Choose a short alias to personalize your forwarding inbox."
      >
        {isEditing ? (
          <div className="space-y-2">
            <Label htmlFor="inbox-alias">Inbox alias</Label>
            <Input
              id="inbox-alias"
              placeholder="inbox"
              value={alias}
              onChange={(event) => setAlias(event.target.value)}
            />
          </div>
        ) : (
          <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
            {alias.trim() || "inbox"}
          </div>
        )}
      </Section>

      {status ? <p className="text-sm text-emerald-600">{status}</p> : null}
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </SettingsSectionCard>
  );
};
