export type UserSettings = {
  userId: string;
  inboxAlias?: string;
  emailForwardingEnabled?: boolean;
  notifyOnNewInvoice?: boolean;
  weeklyDigest?: boolean;
  timezone?: string;
  exportFormat?: "zip" | "pdf" | "csv";
};

export type SettingsData = {
  settings: UserSettings;
  accountEmail?: string;
};

export type UpdateSettingsPayload = Partial<Omit<UserSettings, "userId">>;
