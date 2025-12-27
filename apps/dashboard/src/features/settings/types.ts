export type UserSettings = {
  userId: string;
  inboxAlias?: string;
  emailForwardingEnabled?: boolean;
  notifyOnNewInvoice?: boolean;
  weeklyDigest?: boolean;
  timezone?: string;
  exportFormat?: "zip" | "pdf" | "csv";
};

export type UserSettingsUpdate = Partial<Omit<UserSettings, "userId">>;

export type SettingsSummary = {
  loginEmail?: string;
  settings: UserSettings;
};

export type SettingsSectionProps = {
  settings: UserSettings;
  loginEmail?: string;
  onUpdate: (updates: UserSettingsUpdate) => Promise<void>;
};
