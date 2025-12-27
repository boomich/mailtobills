"use client";

import { DashboardShell } from "../../../app/(dashboard)/components/DashboardShell";
import { Skeleton } from "@mailtobills/ui";

import { SettingsHeader } from "./SettingsHeader";
import { SettingsLayout } from "./SettingsLayout";
import { SettingsNav } from "./SettingsNav";
import { settingsSectionComponents, settingsSections } from "./settingsSections";
import { useSettings, useUpdateSettings } from "./hooks";
import { LogoutButton } from "./components/LogoutButton";

const SettingsSkeleton = () => (
  <div className="space-y-6">
    <div className="space-y-2">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-4 w-72" />
    </div>
    <SettingsLayout
      nav={
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      }
    >
      <div className="space-y-4">
        <Skeleton className="h-36 w-full" />
        <Skeleton className="h-36 w-full" />
        <Skeleton className="h-36 w-full" />
      </div>
    </SettingsLayout>
  </div>
);

export const SettingsPage = () => {
  const { settings, loginEmail, isLoading } = useSettings();
  const { updateSettings } = useUpdateSettings();

  return (
    <DashboardShell headerTitle="Settings" headerActions={<LogoutButton />}>
      {isLoading ? (
        <SettingsSkeleton />
      ) : (
        <div className="space-y-6">
          <SettingsHeader
            title="Settings"
            subtitle="Keep your inbox, notifications, and export defaults up to date."
          />
          <SettingsLayout nav={<SettingsNav />}>
            <div className="space-y-6">
              {settingsSections.map((section) => {
                const SectionComponent = settingsSectionComponents[section.key];
                return (
                  <SectionComponent
                    key={section.key}
                    settings={settings}
                    loginEmail={loginEmail}
                    onUpdate={updateSettings}
                  />
                );
              })}
            </div>
          </SettingsLayout>
        </div>
      )}
    </DashboardShell>
  );
};
