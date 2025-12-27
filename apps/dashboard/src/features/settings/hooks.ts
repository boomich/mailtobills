"use client";

import { useCallback } from "react";
import { useMutation, useQuery } from "convex/react";

import type { SettingsData, UpdateSettingsPayload } from "./types";
import {
  settingsQuery,
  updateSettingsMutation,
  toUserSettings,
  type SettingsQueryResponse,
} from "./api";

export const useSettings = (): SettingsData & { isLoading: boolean } => {
  const data = useQuery(settingsQuery, {});

  if (data === undefined) {
    return {
      settings: {
        userId: "",
      },
      accountEmail: undefined,
      isLoading: true,
    };
  }

  const parsed = toUserSettings(data as SettingsQueryResponse);

  return {
    settings: parsed,
    accountEmail: data.email ?? undefined,
    isLoading: false,
  };
};

export const useUpdateSettings = () => {
  const mutate = useMutation(updateSettingsMutation);

  const updateSettings = useCallback(
    async (updates: UpdateSettingsPayload) => {
      const sanitized = Object.fromEntries(
        Object.entries(updates).filter(([, value]) => value !== undefined)
      ) as UpdateSettingsPayload;
      return mutate({ settings: sanitized });
    },
    [mutate]
  );

  return { updateSettings };
};
