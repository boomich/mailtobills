"use client";

import { useEffect, useState } from "react";

import {
  Button,
  Label,
  Section,
  Select,
  Toast,
  useToast,
} from "@mailtobills/ui";
import { SettingsCard } from "../components/SettingsCard";
import type { SettingsSectionProps } from "../types";

const TIMEZONE_OPTIONS = [
  "UTC",
  "Europe/Lisbon",
  "Europe/London",
  "America/New_York",
  "America/Los_Angeles",
];

export const ProfileSection = ({
  settings,
  loginEmail,
  onUpdate,
}: SettingsSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [timezone, setTimezone] = useState(settings.timezone ?? "UTC");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast, showToast } = useToast();

  useEffect(() => {
    setTimezone(settings.timezone ?? "UTC");
  }, [settings.timezone]);

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMessage(null);
    try {
      await onUpdate({ timezone });
      showToast("Profile updated.", "success");
      setIsEditing(false);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to save profile changes."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SettingsCard
      id="profile"
      title="Account"
      description="Your login email and workspace timezone."
      actions={
        <Button
          variant="secondary"
          onClick={() => {
            if (isEditing) {
              setTimezone(settings.timezone ?? "UTC");
            }
            setIsEditing(!isEditing);
            setErrorMessage(null);
          }}
        >
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      }
    >
      <Section title="Login email">
        <p className="text-sm font-medium text-slate-900">
          {loginEmail ?? "Email not available"}
        </p>
        <p className="text-xs text-slate-500">
          This is the email you use to access your MailToBills account.
        </p>
      </Section>

      <Section title="Timezone" description="Used for invoice timestamps and exports.">
        <div className="space-y-1">
          <Label htmlFor="timezone">Timezone</Label>
          <Select
            id="timezone"
            value={timezone}
            onChange={(event) => setTimezone(event.target.value)}
            disabled={!isEditing || isSaving}
          >
            {TIMEZONE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
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
