"use client";

import { DashboardShell } from "../../../app/(dashboard)/components/DashboardShell";
import { settingsSections } from "./settingsSections";
import { SettingsHeader } from "./components/SettingsHeader";
import { SettingsLayout } from "./components/SettingsLayout";
import { SettingsSkeleton } from "./components/SettingsSkeleton";
import { InboxSection } from "./sections/InboxSection";
import { ProfileSection } from "./sections/ProfileSection";
import { NotificationsSection } from "./sections/NotificationsSection";
import { ExportsSection } from "./sections/ExportsSection";
import { SecuritySection } from "./sections/SecuritySection";
import { useSettings, useUpdateSettings } from "./hooks";

export const SettingsClient = () => {
  const { settings, accountEmail, isLoading } = useSettings();
  const { updateSettings } = useUpdateSettings();

  return (
    <DashboardShell headerTitle="Settings">
      <SettingsLayout
        sections={settingsSections}
        header={
          <SettingsHeader
            title="Settings"
            subtitle="Manage your inbox, notifications, and export preferences."
          />
        }
      >
        {isLoading ? (
          <SettingsSkeleton />
        ) : (
          <>
            <InboxSection settings={settings} onSave={updateSettings} />
            <ProfileSection
              settings={settings}
              accountEmail={accountEmail}
              onSave={updateSettings}
            />
            <NotificationsSection settings={settings} onSave={updateSettings} />
            <ExportsSection settings={settings} onSave={updateSettings} />
            <SecuritySection settings={settings} onSave={updateSettings} />
          </>
        )}
      </SettingsLayout>
    </DashboardShell>
  );
};
