export type SettingsSectionKey =
  | "inbox"
  | "profile"
  | "notifications"
  | "exports"
  | "security";

export type SettingsSection = {
  key: SettingsSectionKey;
  title: string;
  description?: string;
  href: string;
};

export const settingsSections: SettingsSection[] = [
  {
    key: "inbox",
    title: "Inbox",
    description: "Forward invoices straight to your MailToBills inbox.",
    href: "#inbox",
  },
  {
    key: "profile",
    title: "Profile",
    description: "Keep your profile and timezone details up to date.",
    href: "#profile",
  },
  {
    key: "notifications",
    title: "Notifications",
    description: "Control when we send you invoice updates.",
    href: "#notifications",
  },
  {
    key: "exports",
    title: "Exports",
    description: "Choose how exported invoices are packaged.",
    href: "#exports",
  },
  {
    key: "security",
    title: "Security",
    description: "Protect how invoices get added to your account.",
    href: "#security",
  },
];
