"use client";

import { useEffect, useMemo, useState } from "react";

import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  GithubIcon,
  GoogleIcon,
  Input,
  Label,
  SparkleIcon,
  cn,
} from "@mailtobills/ui";

export type AuthMode = "signIn" | "signUp";

type AuthMethod = "magic" | "password";

type Props = {
  initialMode: AuthMode;
  magicLinkEnabled: boolean;
};

const oauthProviders = [
  { id: "google", label: "Continue with Google", icon: GoogleIcon },
  { id: "github", label: "Continue with GitHub", icon: GithubIcon },
] as const;

const MAGIC_LINK_PROVIDER_ID = "resend";

export function AuthForm({ initialMode, magicLinkEnabled }: Props) {
  const router = useRouter();
  const { signIn } = useAuthActions();
  const { isLoading } = useConvexAuth();

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [authMethod, setAuthMethod] = useState<AuthMethod>(
    magicLinkEnabled ? "magic" : "password"
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [magicEmail, setMagicEmail] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingMagic, setIsSendingMagic] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (!magicLinkEnabled) {
      setAuthMethod("password");
    }
  }, [magicLinkEnabled]);

  const resetFeedback = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const heroSubtitle = useMemo(
    () =>
      mode === "signIn"
        ? "Access your invoices dashboard and keep bills organized."
        : "Create your MailToBills workspace in a couple of clicks.",
    [mode]
  );

  const handleOAuthSignIn = async (provider: string) => {
    resetFeedback();
    try {
      setOauthLoading(provider);
      const result = await signIn(provider, { redirectTo: "/" });

      if (result.redirect) {
        window.location.href = result.redirect.toString();
        return;
      }

      router.replace("/");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to start the sign-in flow."
      );
    } finally {
      setOauthLoading(null);
    }
  };

  const handleMagicLinkSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    resetFeedback();

    const trimmedEmail = magicEmail.trim().toLowerCase();
    if (!trimmedEmail) {
      setErrorMessage("Please enter your email to receive a magic link.");
      return;
    }

    try {
      setIsSendingMagic(true);
      const result = await signIn(MAGIC_LINK_PROVIDER_ID, {
        email: trimmedEmail,
        redirectTo: "/",
      });

      if (result.redirect) {
        window.location.href = result.redirect.toString();
        return;
      }

      setSuccessMessage("Magic link sent! Check your inbox to continue.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We couldn't send the magic link right now."
      );
    } finally {
      setIsSendingMagic(false);
    }
  };

  const handlePasswordSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    resetFeedback();

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !password) {
      setErrorMessage("Please enter both email and password.");
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
    <Card className="border-slate-200 shadow-md">
      <CardHeader className="gap-2 pb-0">
        <CardTitle className="flex flex-col gap-2 text-2xl sm:flex-row sm:items-center sm:justify-between">
          <span>
            {mode === "signIn" ? "Welcome back" : "Create your account"}
          </span>
          <span className="text-xs font-semibold text-brand-700">
            No credit card required
          </span>
        </CardTitle>
        <CardDescription>{heroSubtitle}</CardDescription>

        <div className="flex flex-wrap items-center my-4 gap-2 rounded-2xl bg-slate-100 p-1 text-xs font-semibold text-slate-600">
          <TogglePill
            label="Sign in"
            active={mode === "signIn"}
            onClick={() => {
              resetFeedback();
              setMode("signIn");
            }}
          />
          <TogglePill
            label="Sign up"
            active={mode === "signUp"}
            onClick={() => {
              resetFeedback();
              setMode("signUp");
            }}
          />
          <div className="ml-auto hidden items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-brand-700 shadow-sm sm:flex">
            <SparkleIcon />
            Faster billing setup
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-3">
          {oauthProviders.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant="secondary"
              className="w-full justify-center border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-50"
              onClick={() => handleOAuthSignIn(id)}
              disabled={Boolean(oauthLoading) || isLoading}
            >
              {oauthLoading === id ? (
                <span className="animate-pulse">Starting...</span>
              ) : (
                <div className="flex items-center gap-2">
                  <Icon />
                  <span className="font-semibold">{label}</span>
                </div>
              )}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
          <span className="h-px flex-1 bg-slate-200" aria-hidden />
          <span>Or continue with email</span>
          <span className="h-px flex-1 bg-slate-200" aria-hidden />
        </div>

        {magicLinkEnabled && (
          <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-slate-100 p-1 text-xs font-semibold text-slate-600">
            <TogglePill
              label="Magic link"
              active={authMethod === "magic"}
              onClick={() => {
                resetFeedback();
                setAuthMethod("magic");
              }}
            />
            <TogglePill
              label="Email & password"
              active={authMethod === "password"}
              onClick={() => {
                resetFeedback();
                setAuthMethod("password");
              }}
            />
          </div>
        )}

        {magicLinkEnabled && authMethod === "magic" ? (
          <form className="space-y-4" onSubmit={handleMagicLinkSubmit}>
            <div className="space-y-1">
              <Label htmlFor="magic-email">Work email</Label>
              <Input
                id="magic-email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={magicEmail}
                onChange={(event) => setMagicEmail(event.target.value)}
                disabled={isSendingMagic || isLoading}
                required
              />
              <p className="text-xs text-slate-500">
                We&apos;ll email you a secure, one-time sign-in link.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSendingMagic || isLoading}
            >
              {isSendingMagic ? "Sending magic link..." : "Send magic link"}
            </Button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handlePasswordSubmit}>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={isSubmitting || isLoading}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete={
                  mode === "signIn" ? "current-password" : "new-password"
                }
                placeholder="At least 8 characters"
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={isSubmitting || isLoading}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting
                ? "Please wait..."
                : mode === "signIn"
                ? "Sign in with password"
                : "Create account"}
            </Button>
          </form>
        )}

        {(errorMessage || successMessage) && (
          <div
            className={cn(
              "rounded-md border px-3 py-2 text-sm",
              errorMessage
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-green-200 bg-green-50 text-green-700"
            )}
            role="status"
            aria-live="polite"
          >
            {errorMessage ?? successMessage}
          </div>
        )}

        <p className="text-center text-sm text-slate-600">
          {mode === "signIn" ? (
            <>
              New to MailToBills?{" "}
              <button
                type="button"
                className="cursor-pointer font-semibold text-brand-700 underline-offset-4 hover:underline"
                onClick={() => {
                  resetFeedback();
                  setMode("signUp");
                }}
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                className="cursor-pointer font-semibold text-brand-700 underline-offset-4 hover:underline"
                onClick={() => {
                  resetFeedback();
                  setMode("signIn");
                }}
              >
                Sign in instead
              </button>
            </>
          )}
        </p>
      </CardContent>
    </Card>
  );
}

function TogglePill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1 transition-colors cursor-pointer",
        active
          ? "bg-white text-brand-700 shadow-sm"
          : "text-slate-600 hover:text-slate-900"
      )}
    >
      {label}
    </button>
  );
}
