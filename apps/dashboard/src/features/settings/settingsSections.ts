import type { ComponentType } from "react";
import type { SettingsSectionProps } from "./types";
import {
  ExportsSection,
  InboxSection,
  NotificationsSection,
  ProfileSection,
  SecuritySection,
} from "./sections";

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
    description: "Forward invoices and manage your MailToBills inbox.",
    href: "#inbox",
  },
  {
    key: "profile",
    title: "Profile",
    description: "Personal details and timezone preferences.",
    href: "#profile",
  },
  {
    key: "notifications",
    title: "Notifications",
    description: "Decide when we should reach out.",
    href: "#notifications",
  },
  {
    key: "exports",
    title: "Exports",
    description: "Default format for bulk downloads.",
    href: "#exports",
  },
  {
    key: "security",
    title: "Security",
    description: "Account access and sign-out options.",
    href: "#security",
  },
];

export const settingsSectionComponents: Record<
  SettingsSectionKey,
  ComponentType<SettingsSectionProps>
> = {
  inbox: InboxSection,
  profile: ProfileSection,
  notifications: NotificationsSection,
  exports: ExportsSection,
  security: SecuritySection,
};
