import { api } from "../../../lib/convexClient";
import type { SettingsSummary, UserSettings } from "./types";

export type SettingsQueryResult = {
  userId: string;
  loginEmail?: string;
  inboxAlias?: string;
  emailForwardingEnabled?: boolean;
  notifyOnNewInvoice?: boolean;
  weeklyDigest?: boolean;
  timezone?: string;
  exportFormat?: "zip" | "pdf" | "csv";
};

const DEFAULT_SETTINGS: Omit<UserSettings, "userId"> = {
  inboxAlias: "inbox",
  emailForwardingEnabled: true,
  notifyOnNewInvoice: true,
  weeklyDigest: false,
  timezone: "UTC",
  exportFormat: "zip",
};

export const mapSettings = (data: SettingsQueryResult): SettingsSummary => ({
  loginEmail: data.loginEmail,
  settings: {
    userId: data.userId,
    inboxAlias: data.inboxAlias ?? DEFAULT_SETTINGS.inboxAlias,
    emailForwardingEnabled:
      data.emailForwardingEnabled ?? DEFAULT_SETTINGS.emailForwardingEnabled,
    notifyOnNewInvoice:
      data.notifyOnNewInvoice ?? DEFAULT_SETTINGS.notifyOnNewInvoice,
    weeklyDigest: data.weeklyDigest ?? DEFAULT_SETTINGS.weeklyDigest,
    timezone: data.timezone ?? DEFAULT_SETTINGS.timezone,
    exportFormat: data.exportFormat ?? DEFAULT_SETTINGS.exportFormat,
  },
});

export const settingsQuery = api.settings.getMySettings;
export const updateSettingsMutation = api.settings.updateMySettings;
