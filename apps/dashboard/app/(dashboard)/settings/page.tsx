"use client";

import { DashboardShell } from "../components/DashboardShell";
import { SettingsLayout } from "../../../src/features/settings/components/SettingsLayout";
import { SettingsHeader } from "../../../src/features/settings/components/SettingsHeader";
import { AccountSection } from "../../../src/features/settings/components/sections/AccountSection";
import { ForwardingEmailSection } from "../../../src/features/settings/components/sections/ForwardingEmailSection";
import { useSettings } from "../../../src/features/settings/hooks";
import { Button } from "@mailtobills/ui";
import { useAuthActions } from "@convex-dev/auth/react";

export default function SettingsPage() {
  const { settings, isLoading } = useSettings();
  const { signOut } = useAuthActions();

  if (isLoading || !settings) {
    return (
      <DashboardShell>
        {/* <SettingsLayout> */}
        <SettingsHeader />
        <div className="space-y-4">
          <div className="h-40 w-full animate-pulse rounded-lg bg-slate-200"></div>
          <div className="h-40 w-full animate-pulse rounded-lg bg-slate-200"></div>
        </div>
        {/* </SettingsLayout> */}
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <SettingsHeader />
      <SettingsLayout>
        <AccountSection settings={settings} />
        <ForwardingEmailSection settings={settings} />

        <div className="flex justify-start pt-4">
          <Button
            variant="secondary"
            onClick={() => signOut()}
            className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sign Out
          </Button>
        </div>
      </SettingsLayout>
    </DashboardShell>
  );
}
