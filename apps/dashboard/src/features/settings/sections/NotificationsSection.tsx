"use client";

import { useEffect, useState } from "react";

import { Button, Section, Switch, Toast, useToast } from "@mailtobills/ui";
import { SettingsCard } from "../components/SettingsCard";
import type { SettingsSectionProps } from "../types";

export const NotificationsSection = ({
  settings,
  onUpdate,
}: SettingsSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [notifyOnNewInvoice, setNotifyOnNewInvoice] = useState(
    settings.notifyOnNewInvoice ?? true
  );
  const [weeklyDigest, setWeeklyDigest] = useState(
    settings.weeklyDigest ?? false
  );
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast, showToast } = useToast();

  useEffect(() => {
    setNotifyOnNewInvoice(settings.notifyOnNewInvoice ?? true);
  }, [settings.notifyOnNewInvoice]);

  useEffect(() => {
    setWeeklyDigest(settings.weeklyDigest ?? false);
  }, [settings.weeklyDigest]);

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMessage(null);
    try {
      await onUpdate({ notifyOnNewInvoice, weeklyDigest });
      showToast("Notification preferences saved.", "success");
      setIsEditing(false);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to save notification preferences."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SettingsCard
      id="notifications"
      title="Notifications"
      description="Control the emails we send when invoices arrive."
      actions={
        <Button
          variant="secondary"
          onClick={() => {
            if (isEditing) {
              setNotifyOnNewInvoice(settings.notifyOnNewInvoice ?? true);
              setWeeklyDigest(settings.weeklyDigest ?? false);
            }
            setIsEditing(!isEditing);
            setErrorMessage(null);
          }}
        >
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      }
    >
      <Section title="New invoice alerts">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-slate-900">
              Email me when a new invoice arrives
            </p>
            <p className="text-xs text-slate-500">
              Stay informed whenever a file is ingested.
            </p>
          </div>
          <Switch
            checked={notifyOnNewInvoice}
            onChange={(event) => setNotifyOnNewInvoice(event.target.checked)}
            disabled={!isEditing || isSaving}
          />
        </div>
      </Section>

      <Section title="Weekly digest">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-slate-900">
              Send me a weekly summary
            </p>
            <p className="text-xs text-slate-500">
              A quick recap of invoices received this week.
            </p>
          </div>
          <Switch
            checked={weeklyDigest}
            onChange={(event) => setWeeklyDigest(event.target.checked)}
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
