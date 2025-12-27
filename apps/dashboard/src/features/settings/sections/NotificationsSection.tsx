"use client";

import { useEffect, useState } from "react";
import { Button, Section, Switch } from "@mailtobills/ui";
import type { UpdateSettingsPayload, UserSettings } from "../types";
import { SettingsSectionCard } from "../components/SettingsSectionCard";

export type NotificationsSectionProps = {
  settings: UserSettings;
  onSave: (updates: UpdateSettingsPayload) => Promise<unknown>;
};

export const NotificationsSection = ({
  settings,
  onSave,
}: NotificationsSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [notifyOnNewInvoice, setNotifyOnNewInvoice] = useState(
    settings.notifyOnNewInvoice ?? true
  );
  const [weeklyDigest, setWeeklyDigest] = useState(
    settings.weeklyDigest ?? false
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!isEditing) {
      setNotifyOnNewInvoice(settings.notifyOnNewInvoice ?? true);
      setWeeklyDigest(settings.weeklyDigest ?? false);
    }
  }, [isEditing, settings.notifyOnNewInvoice, settings.weeklyDigest]);

  const hasChanges =
    notifyOnNewInvoice !== (settings.notifyOnNewInvoice ?? true) ||
    weeklyDigest !== (settings.weeklyDigest ?? false);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setStatus(null);

    try {
      await onSave({ notifyOnNewInvoice, weeklyDigest });
      setIsEditing(false);
      setStatus("Saved");
      window.setTimeout(() => setStatus(null), 2000);
    } catch (saveError) {
      setError("We couldn't update notification preferences. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SettingsSectionCard
      id="notifications"
      title="Notifications"
      description="Choose the email updates you want to receive."
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
        title="Invoice alerts"
        description="Get an email the moment a new invoice arrives."
      >
        <div className="flex items-center justify-between gap-4 rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
          <p className="text-sm text-slate-700">Notify on new invoice</p>
          <Switch
            checked={notifyOnNewInvoice}
            onCheckedChange={setNotifyOnNewInvoice}
            disabled={!isEditing}
          />
        </div>
      </Section>

      <Section
        title="Weekly digest"
        description="Receive a summary of the invoices captured that week."
      >
        <div className="flex items-center justify-between gap-4 rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
          <p className="text-sm text-slate-700">Send weekly digest</p>
          <Switch
            checked={weeklyDigest}
            onCheckedChange={setWeeklyDigest}
            disabled={!isEditing}
          />
        </div>
      </Section>

      {status ? <p className="text-sm text-emerald-600">{status}</p> : null}
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </SettingsSectionCard>
  );
};
