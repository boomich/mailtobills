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
  forwardingEmails?: string[];
};
