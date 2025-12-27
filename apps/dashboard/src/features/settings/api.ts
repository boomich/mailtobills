import { api } from "../../../lib/convexClient";
import type { UserSettings } from "./types";

export const settingsQuery = api.settings.getMine;
export const updateSettingsMutation = api.settings.updateMine;

const defaultSettings: Omit<UserSettings, "userId"> = {
  inboxAlias: undefined,
  emailForwardingEnabled: true,
  notifyOnNewInvoice: true,
  weeklyDigest: false,
  timezone: "Europe/Lisbon",
  exportFormat: "pdf",
};

export type SettingsQueryResponse = {
  userId: string;
  email: string | null;
  settings: Partial<Omit<UserSettings, "userId">>;
};

export const toUserSettings = (data: SettingsQueryResponse): UserSettings => ({
  userId: data.userId,
  inboxAlias: data.settings.inboxAlias ?? defaultSettings.inboxAlias,
  emailForwardingEnabled:
    data.settings.emailForwardingEnabled ??
    defaultSettings.emailForwardingEnabled,
  notifyOnNewInvoice:
    data.settings.notifyOnNewInvoice ?? defaultSettings.notifyOnNewInvoice,
  weeklyDigest: data.settings.weeklyDigest ?? defaultSettings.weeklyDigest,
  timezone: data.settings.timezone ?? defaultSettings.timezone,
  exportFormat: data.settings.exportFormat ?? defaultSettings.exportFormat,
});

export const formatInboxAddress = (alias?: string) => {
  const cleanedAlias = alias?.trim();
  const localPart = cleanedAlias?.length ? cleanedAlias : "inbox";
  return `${localPart}@mailtobills.com`;
};
