"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";

import { Button, Toast, useToast } from "@mailtobills/ui";

export const LogoutButton = () => {
  const { signOut } = useAuthActions();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { toast, showToast } = useToast();

  const handleSignOut = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);
    try {
      await signOut();
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Unable to sign out right now.",
        "error"
      );
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <Button variant="secondary" onClick={handleSignOut} disabled={isSigningOut}>
        {isSigningOut ? "Signing out..." : "Logout"}
      </Button>
      {toast ? (
        <Toast message={toast.message} tone={toast.tone ?? "info"} />
      ) : null}
    </div>
  );
};
