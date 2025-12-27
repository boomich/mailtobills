"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Label, Section, Select } from "@mailtobills/ui";
import type { UpdateSettingsPayload, UserSettings } from "../types";
import { SettingsSectionCard } from "../components/SettingsSectionCard";

const exportOptions = [
  { value: "pdf", label: "PDF bundle" },
  { value: "zip", label: "ZIP file" },
  { value: "csv", label: "CSV summary" },
] as const;

export type ExportsSectionProps = {
  settings: UserSettings;
  onSave: (updates: UpdateSettingsPayload) => Promise<unknown>;
};

export const ExportsSection = ({ settings, onSave }: ExportsSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [exportFormat, setExportFormat] = useState<
    UserSettings["exportFormat"]
  >(settings.exportFormat ?? "pdf");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!isEditing) {
      setExportFormat(settings.exportFormat ?? "pdf");
    }
  }, [isEditing, settings.exportFormat]);

  const exportLabel = useMemo(() => {
    return (
      exportOptions.find((option) => option.value === settings.exportFormat)
        ?.label ?? "Not set"
    );
  }, [settings.exportFormat]);

  const hasChanges = exportFormat !== (settings.exportFormat ?? "pdf");

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setStatus(null);

    try {
      await onSave({ exportFormat });
      setIsEditing(false);
      setStatus("Saved");
      window.setTimeout(() => setStatus(null), 2000);
    } catch (saveError) {
      setError("We couldn't update export preferences. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SettingsSectionCard
      id="exports"
      title="Exports"
      description="Pick the default export format for your accountant."
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
        title="Default export format"
        description="We will use this format when you export invoices from the dashboard."
      >
        {isEditing ? (
          <div className="space-y-2">
            <Label htmlFor="export-format">Export format</Label>
            <Select
              id="export-format"
              value={exportFormat}
              onChange={(event) =>
                setExportFormat(event.target.value as UserSettings["exportFormat"])
              }
            >
              {exportOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        ) : (
          <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
            {exportLabel}
          </div>
        )}
      </Section>

      {status ? <p className="text-sm text-emerald-600">{status}</p> : null}
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </SettingsSectionCard>
  );
};
