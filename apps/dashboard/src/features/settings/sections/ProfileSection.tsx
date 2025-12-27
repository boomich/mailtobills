"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Label, Section, Select } from "@mailtobills/ui";
import type { UpdateSettingsPayload, UserSettings } from "../types";
import { SettingsSectionCard } from "../components/SettingsSectionCard";

const timezoneOptions = [
  { value: "Europe/Lisbon", label: "Lisbon (GMT+1)" },
  { value: "Europe/London", label: "London (GMT+0)" },
  { value: "Europe/Paris", label: "Paris (GMT+1)" },
  { value: "America/New_York", label: "New York (GMT-4)" },
  { value: "America/Sao_Paulo", label: "São Paulo (GMT-3)" },
];

export type ProfileSectionProps = {
  settings: UserSettings;
  accountEmail?: string;
  onSave: (updates: UpdateSettingsPayload) => Promise<unknown>;
};

export const ProfileSection = ({
  settings,
  accountEmail,
  onSave,
}: ProfileSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [timezone, setTimezone] = useState(settings.timezone ?? "Europe/Lisbon");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!isEditing) {
      setTimezone(settings.timezone ?? "Europe/Lisbon");
    }
  }, [isEditing, settings.timezone]);

  const timezoneLabel = useMemo(() => {
    return (
      timezoneOptions.find((option) => option.value === settings.timezone)
        ?.label ?? settings.timezone
    );
  }, [settings.timezone]);

  const hasChanges = timezone !== (settings.timezone ?? "Europe/Lisbon");

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setStatus(null);

    try {
      await onSave({ timezone });
      setIsEditing(false);
      setStatus("Saved");
      window.setTimeout(() => setStatus(null), 2000);
    } catch (saveError) {
      setError("We couldn't update your profile. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SettingsSectionCard
      id="profile"
      title="Profile"
      description="Update your login details and locale."
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
      <Section title="Login email" description="Used for account access and updates.">
        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
          {accountEmail ?? "Not connected"}
        </div>
      </Section>

      <Section
        title="Timezone"
        description="We use this to group invoice dates in your dashboard."
      >
        {isEditing ? (
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select
              id="timezone"
              value={timezone}
              onChange={(event) => setTimezone(event.target.value)}
            >
              {timezoneOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        ) : (
          <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
            {timezoneLabel ?? "Not set"}
          </div>
        )}
      </Section>

      {status ? <p className="text-sm text-emerald-600">{status}</p> : null}
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </SettingsSectionCard>
  );
};
