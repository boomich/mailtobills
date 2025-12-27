import { useQuery } from "convex/react";
import { api } from "@mailtobills/backend/_generated/api";
import { UserSettings } from "./types";

export function useFetchSettings(): UserSettings | undefined {
  const user = useQuery(api.users.viewer);
  
  if (!user) return undefined;

  return {
    userId: user._id,
    name: user.name,
    email: user.email,
    image: user.image,
    // Using the hardcoded value from the mock as per instructions to implement the mock
    // In a real scenario this would come from the backend config or user record
    inboxAlias: "inbox@mailtobills.com", 
    emailForwardingEnabled: true, // Defaulting for now
  };
}

export function useUpdateSettings() {
  // Placeholder for mutation
  // const mutation = useMutation(api.users.updateSettings);
  
  return {
    mutate: async (args: Partial<UserSettings>) => {
      console.log("Saving settings:", args);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
    },
    isPending: false,
  };
}
