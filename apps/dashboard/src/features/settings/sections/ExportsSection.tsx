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

export const ExportsSection = ({ settings, onUpdate }: SettingsSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [exportFormat, setExportFormat] = useState(
    settings.exportFormat ?? "zip"
  );
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast, showToast } = useToast();

  useEffect(() => {
    setExportFormat(settings.exportFormat ?? "zip");
  }, [settings.exportFormat]);

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMessage(null);
    try {
      await onUpdate({ exportFormat });
      showToast("Export preferences saved.", "success");
      setIsEditing(false);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to save export preferences."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SettingsCard
      id="exports"
      title="Exports"
      description="Set the default export format for your accountant."
      actions={
        <Button
          variant="secondary"
          onClick={() => {
            if (isEditing) {
              setExportFormat(settings.exportFormat ?? "zip");
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
        title="Default export format"
        description="This format is pre-selected when you download multiple invoices."
      >
        <div className="space-y-1">
          <Label htmlFor="export-format">Format</Label>
          <Select
            id="export-format"
            value={exportFormat}
            onChange={(event) =>
              setExportFormat(event.target.value as "zip" | "pdf" | "csv")
            }
            disabled={!isEditing || isSaving}
          >
            <option value="zip">ZIP archive</option>
            <option value="pdf">PDF bundle</option>
            <option value="csv">CSV summary</option>
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
