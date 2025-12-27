export type SettingsSectionKey =
  | "account"
  | "forwarding"
  | "notifications"
  | "exports"
  | "security";

export type SettingsSection = {
  key: SettingsSectionKey;
  title: string;
  description?: string;
  href: string; // anchor or nested route
};

export type UserSettings = {
  userId: string;
  name?: string;
  email?: string;
  image?: string;
  inboxAlias?: string; // if we use alias approach
  emailForwardingEnabled?: boolean;
  notifyOnNewInvoice?: boolean;
  weeklyDigest?: boolean;
  timezone?: string;
  exportFormat?: "zip" | "pdf" | "csv";
};
