import { useFetchSettings, useUpdateSettings } from "./api";

export function useSettings() {
  const settings = useFetchSettings();
  const { mutate, isPending } = useUpdateSettings();

  return {
    settings,
    isLoading: settings === undefined,
    updateSettings: mutate,
    isUpdating: isPending,
  };
}
