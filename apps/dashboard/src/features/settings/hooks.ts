"use client";

import { useMutation, useQuery } from "convex/react";
import { mapSettings, settingsQuery, updateSettingsMutation } from "./api";
import type { SettingsSummary, UserSettingsUpdate } from "./types";

export const useSettings = (): SettingsSummary & { isLoading: boolean } => {
  const data = useQuery(settingsQuery, {});

  if (data === undefined) {
    return {
      isLoading: true,
      settings: {
        userId: "",
      },
    };
  }

  if (!data) {
    return {
      isLoading: false,
      settings: {
        userId: "",
      },
    };
  }

  return {
    ...mapSettings(data),
    isLoading: false,
  };
};

export const useUpdateSettings = () => {
  const mutation = useMutation(updateSettingsMutation);

  const updateSettings = async (updates: UserSettingsUpdate) => {
    await mutation(updates);
  };

  return { updateSettings };
};
