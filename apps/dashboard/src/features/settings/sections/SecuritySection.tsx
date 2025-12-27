"use client";

import { useEffect, useState } from "react";
import { Button, Section, Switch } from "@mailtobills/ui";
import type { UpdateSettingsPayload, UserSettings } from "../types";
import { SettingsSectionCard } from "../components/SettingsSectionCard";

export type SecuritySectionProps = {
  settings: UserSettings;
  onSave: (updates: UpdateSettingsPayload) => Promise<unknown>;
};

export const SecuritySection = ({ settings, onSave }: SecuritySectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [emailForwardingEnabled, setEmailForwardingEnabled] = useState(
    settings.emailForwardingEnabled ?? true
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!isEditing) {
      setEmailForwardingEnabled(settings.emailForwardingEnabled ?? true);
    }
  }, [isEditing, settings.emailForwardingEnabled]);

  const hasChanges =
    emailForwardingEnabled !== (settings.emailForwardingEnabled ?? true);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setStatus(null);

    try {
      await onSave({ emailForwardingEnabled });
      setIsEditing(false);
      setStatus("Saved");
      window.setTimeout(() => setStatus(null), 2000);
    } catch (saveError) {
      setError("We couldn't update security preferences. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SettingsSectionCard
      id="security"
      title="Security"
      description="Control which invoices can be added to your account."
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
        title="Forwarding access"
        description="Turn this off if you want to pause all forwarded invoices."
      >
        <div className="flex items-center justify-between gap-4 rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
          <p className="text-sm text-slate-700">Enable email forwarding</p>
          <Switch
            checked={emailForwardingEnabled}
            onCheckedChange={setEmailForwardingEnabled}
            disabled={!isEditing}
          />
        </div>
      </Section>

      {status ? <p className="text-sm text-emerald-600">{status}</p> : null}
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </SettingsSectionCard>
  );
};
