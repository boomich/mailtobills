"use client";

import { useEffect, useState } from "react";

import { Button, Section, Switch, Toast, useToast } from "@mailtobills/ui";
import { SettingsCard } from "../components/SettingsCard";
import type { SettingsSectionProps } from "../types";

export const SecuritySection = ({ settings, onUpdate }: SettingsSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [forwardingEnabled, setForwardingEnabled] = useState(
    settings.emailForwardingEnabled ?? true
  );
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast, showToast } = useToast();

  useEffect(() => {
    setForwardingEnabled(settings.emailForwardingEnabled ?? true);
  }, [settings.emailForwardingEnabled]);

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMessage(null);
    try {
      await onUpdate({ emailForwardingEnabled: forwardingEnabled });
      showToast("Security settings saved.", "success");
      setIsEditing(false);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to save security settings."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SettingsCard
      id="security"
      title="Security"
      description="Manage access to your forwarding inbox."
      actions={
        <Button
          variant="secondary"
          onClick={() => {
            if (isEditing) {
              setForwardingEnabled(settings.emailForwardingEnabled ?? true);
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
        title="Forwarding intake"
        description="Pause forwarding if you want to stop importing invoices temporarily."
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-slate-900">
              Allow new invoices to be ingested
            </p>
            <p className="text-xs text-slate-500">
              When disabled, forwarded invoices will be ignored.
            </p>
          </div>
          <Switch
            checked={forwardingEnabled}
            onChange={(event) => setForwardingEnabled(event.target.checked)}
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
