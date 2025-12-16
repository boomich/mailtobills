"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { Button } from "@mailtobills/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Mode = "signIn" | "signUp";

export default function SignInPage() {
  const { signIn } = useAuthActions();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialMode: Mode =
    searchParams.get("mode") === "signup" ? "signUp" : "signIn";

  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !password) {
      setErrorMessage("Please enter an email and password.");
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await signIn("password", {
        flow: mode,
        email: trimmedEmail,
        password,
      });

      if (result.redirect) {
        window.location.href = result.redirect.toString();
        return;
      }

      router.replace("/");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to sign in."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-900">
            {mode === "signIn" ? "Sign in" : "Create your account"}
          </h1>
          <p className="text-sm text-slate-600">
            {mode === "signIn"
              ? "Access your invoices dashboard."
              : "Start organizing invoices in minutes."}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              autoComplete="email"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              autoComplete={
                mode === "signIn" ? "current-password" : "new-password"
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              minLength={8}
              required
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-600" role="alert">
              {errorMessage}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting
              ? "Please wait..."
              : mode === "signIn"
              ? "Sign in"
              : "Create account"}
          </Button>
        </form>

        <div className="text-center text-sm text-slate-600">
          {mode === "signIn" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                className="text-brand-600 hover:underline"
                onClick={() => setMode("signUp")}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                className="text-brand-600 hover:underline"
                onClick={() => setMode("signIn")}
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

