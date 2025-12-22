"use client";

import { useEffect, useMemo, useState } from "react";

import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  cn,
  Card,
  Input,
  Label,
  Button,
  CardTitle,
  CloudIcon,
  InboxIcon,
  CardHeader,
  GithubIcon,
  GoogleIcon,
  ShieldIcon,
  CardContent,
  SparkleIcon,
  CardDescription,
} from "@mailtobills/ui";

type Mode = "signIn" | "signUp";
type AuthMethod = "magic" | "password";

const features = [
  {
    title: "Automated Collection",
    description:
      "Forward invoices to one inbox and we keep everything organized for you.",
    icon: InboxIcon,
  },
  {
    title: "Secure Storage",
    description:
      "Your documents stay encrypted and ready to share when needed.",
    icon: ShieldIcon,
  },
  {
    title: "Access Anywhere",
    description: "Review bills and exports from any device—no setup required.",
    icon: CloudIcon,
  },
];

const oauthProviders = [
  { id: "google", label: "Continue with Google", icon: GoogleIcon },
  { id: "github", label: "Continue with GitHub", icon: GithubIcon },
];

const MAGIC_LINK_PROVIDER_ID = "resend";

export default function SignInPage() {
  const { signIn } = useAuthActions();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialMode: Mode = useMemo(
    () => (searchParams.get("mode") === "signup" ? "signUp" : "signIn"),
    [searchParams]
  );

  const [mode, setMode] = useState<Mode>(initialMode);
  const [authMethod, setAuthMethod] = useState<AuthMethod>("magic");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [magicEmail, setMagicEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingMagic, setIsSendingMagic] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const resetFeedback = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

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
    e
  ) => {
    e.preventDefault();
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

  const heroSubtitle =
    mode === "signIn"
      ? "Access your invoices dashboard and keep bills organized."
      : "Create your MailToBills workspace in a couple of clicks.";

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 lg:flex-row lg:items-center">
        <section className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700">
            <span className="h-2 w-2 rounded-full bg-brand-600" aria-hidden />
            MailToBills • Billing inbox
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
              Forward your invoices. We&apos;ll do the rest.
            </h1>
            <p className="max-w-2xl text-lg text-slate-700">
              Automate invoice collection, keep documents safe, and export
              everything for your accountant without digging through your inbox.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {features.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                  <Icon />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {title}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full max-w-lg flex-1">
          <Card className="border-slate-200 shadow-md">
            <CardHeader className="gap-2 pb-0">
              <CardTitle className="flex items-center justify-between text-2xl">
                {mode === "signIn" ? "Welcome back" : "Create your account"}
                <span className="text-xs font-semibold text-brand-700">
                  No credit card required
                </span>
              </CardTitle>
              <CardDescription>{heroSubtitle}</CardDescription>
              <div className="flex items-center gap-2 rounded-full bg-slate-100 p-1 text-xs font-semibold text-slate-600">
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
                <div className="ml-auto flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-brand-700 shadow-sm">
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

              <div className="flex items-center gap-2 rounded-full bg-slate-100 p-1 text-xs font-semibold text-slate-600">
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

              {authMethod === "magic" ? (
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
                    {isSendingMagic
                      ? "Sending magic link..."
                      : "Send magic link"}
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
                      className="font-semibold text-brand-700 underline-offset-4 hover:underline"
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
                      className="font-semibold text-brand-700 underline-offset-4 hover:underline"
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
        </section>
      </div>
    </main>
  );
}

const TogglePill = ({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "rounded-full px-3 py-1 transition-colors",
      active
        ? "bg-white text-brand-700 shadow-sm"
        : "text-slate-600 hover:text-slate-900"
    )}
  >
    {label}
  </button>
);
