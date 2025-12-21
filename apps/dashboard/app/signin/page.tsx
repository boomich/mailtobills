"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  cn,
} from "@mailtobills/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

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
    description: "Your documents stay encrypted and ready to share when needed.",
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
                  <p className="text-sm font-semibold text-slate-900">{title}</p>
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
                  onClick={() => setMode("signIn")}
                />
                <TogglePill
                  label="Sign up"
                  active={mode === "signUp"}
                  onClick={() => setMode("signUp")}
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
                  onClick={() => setAuthMethod("magic")}
                />
                <TogglePill
                  label="Email & password"
                  active={authMethod === "password"}
                  onClick={() => setAuthMethod("password")}
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
                      className="font-semibold text-brand-700 underline-offset-4 hover:underline"
                      onClick={() => setMode("signUp")}
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
                      onClick={() => setMode("signIn")}
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

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className="h-5 w-5"
    aria-hidden
  >
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303C33.602 31.91 29.197 35 24 35c-7.18 0-13-5.82-13-13s5.82-13 13-13c3.152 0 6.037 1.122 8.277 2.965l5.657-5.657C34.676 3.59 29.59 1 24 1 10.745 1 0 11.745 0 25s10.745 24 24 24 24-10.745 24-24c0-1.615-.166-3.192-.389-4.917Z"
    />
    <path
      fill="#FF3D00"
      d="M6.306 14.691 12.777 19.44C14.527 15.174 18.88 12 24 12c3.152 0 6.037 1.122 8.277 2.965l5.657-5.657C34.676 3.59 29.59 1 24 1 14.318 1 6.064 6.963 6.306 14.691Z"
    />
    <path
      fill="#4CAF50"
      d="M24 48c5.113 0 9.78-1.957 13.304-5.146l-6.146-5.196C29.195 38.476 26.715 39.4 24 39.4c-5.17 0-9.56-3.328-11.142-7.946l-6.487 5.002C9.04 42.954 15.979 48 24 48Z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303c-.912 2.63-2.73 4.85-5.193 6.37l.004-.002 6.146 5.196C33.883 41.522 39 39 39 39c4.207-3.873 6.24-9.3 6.24-15.36 0-1.615-.166-3.192-.389-4.917Z"
    />
  </svg>
);

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="currentColor"
    aria-hidden
  >
    <path d="M12 .5C5.649.5.5 5.648.5 12c0 5.095 3.292 9.41 7.865 10.942.575.102.785-.25.785-.557 0-.275-.01-1.004-.015-1.972-3.199.695-3.875-1.542-3.875-1.542-.523-1.328-1.277-1.68-1.277-1.68-1.044-.714.079-.699.079-.699 1.155.082 1.763 1.187 1.763 1.187 1.027 1.76 2.695 1.252 3.352.957.104-.744.402-1.252.732-1.54-2.553-.291-5.236-1.276-5.236-5.68 0-1.255.448-2.28 1.184-3.083-.119-.29-.513-1.459.112-3.04 0 0 .965-.309 3.162 1.178a11.02 11.02 0 0 1 2.878-.387c.976.004 1.961.132 2.878.387 2.196-1.487 3.16-1.178 3.16-1.178.626 1.58.233 2.75.114 3.04.737.803 1.182 1.828 1.182 3.083 0 4.416-2.688 5.385-5.252 5.671.413.356.781 1.057.781 2.13 0 1.538-.014 2.778-.014 3.156 0 .309.207.663.79.55C20.71 21.405 24 17.092 24 12c0-6.352-5.148-11.5-12-11.5Z" />
  </svg>
);

const InboxIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="currentColor"
  >
    <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm0 8h-3.465a.75.75 0 0 0-.659.384l-.683 1.232a1.25 1.25 0 0 1-2.386 0l-.683-1.232A.75.75 0 0 0 8.465 11H5V5h14v6Z" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="currentColor"
  >
    <path d="M12 2 4 5v6c0 5.25 3.438 10 8 11 4.563-1 8-5.75 8-11V5l-8-3Zm6 9c0 4.063-2.656 7.75-6 8.75-3.344-1-6-4.687-6-8.75V6.281L12 4.219l6 2.062V11Z" />
  </svg>
);

const CloudIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="currentColor"
  >
    <path d="M18.944 9.112C18.45 5.592 15.553 3 12 3a7 7 0 0 0-6.816 5.2A5 5 0 0 0 5 18h13a4 4 0 0 0 .944-8.888ZM17.5 16H5a3 3 0 0 1-.176-5.995l.977-.057.137-.97A5 5 0 0 1 12 5c2.41 0 4.453 1.717 4.898 4.05l.19 1.018 1.033.07A2.5 2.5 0 0 1 17.5 16Z" />
  </svg>
);

const SparkleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="currentColor"
    aria-hidden
  >
    <path d="M11 1.5 9.5 5 6 6.5 9.5 8 11 11.5 12.5 8 16 6.5 12.5 5Zm8 7-1 2.5L15.5 12l2.5 1 1 2.5 1-2.5 2.5-1-2.5-1ZM6.5 13 5 16.5 1.5 18 5 19.5 6.5 23 8 19.5 11.5 18 8 16.5Z" />
  </svg>
);
