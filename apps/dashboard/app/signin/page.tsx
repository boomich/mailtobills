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
} from "@mailtobills/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Mode = "signIn" | "signUp";
type OAuthProvider = "github" | "google";
type PendingAction = OAuthProvider | "password" | "magic" | null;

const highlights = [
  {
    title: "Automated collection",
    description: "Forward invoices to one inbox and let us sort the rest.",
    icon: "✉️",
  },
  {
    title: "Secure storage",
    description: "Organize PDFs alongside suppliers, dates, and amounts.",
    icon: "🔒",
  },
  {
    title: "Magic links & OAuth",
    description: "Log in with email, Google, GitHub, or a password.",
    icon: "✨",
  },
];

export default function SignInPage() {
  const { signIn } = useAuthActions();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialMode: Mode =
    searchParams.get("mode") === "signup" ? "signUp" : "signIn";

  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState("");
  const [magicEmail, setMagicEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [feedback, setFeedback] = useState<
    | {
        type: "error" | "success";
        message: string;
      }
    | null
  >(null);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, router]);

  const subtitle = useMemo(
    () =>
      mode === "signIn"
        ? "Access your invoices dashboard and pick up where you left off."
        : "Create an account and start automating your invoice inbox.",
    [mode]
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setFeedback(null);

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !password) {
      setFeedback({
        type: "error",
        message: "Please enter an email and password.",
      });
      return;
    }

    try {
      setPendingAction("password");
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
      setFeedback({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to sign in.",
      });
    } finally {
      setPendingAction(null);
    }
  };

  const handleMagicLink: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setFeedback(null);

    const trimmedEmail = magicEmail.trim().toLowerCase();
    if (!trimmedEmail) {
      setFeedback({
        type: "error",
        message: "Enter your email to receive a magic link.",
      });
      return;
    }

    try {
      setPendingAction("magic");
      const result = await signIn("resend", { email: trimmedEmail });

      if (result.redirect) {
        window.location.href = result.redirect.toString();
        return;
      }

      setFeedback({
        type: "success",
        message: "Magic link sent! Check your inbox to continue.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "We couldn't send the magic link. Please try again.",
      });
    } finally {
      setPendingAction(null);
    }
  };

  const handleOAuth = async (provider: OAuthProvider) => {
    setFeedback(null);
    try {
      setPendingAction(provider);
      const result = await signIn(provider);
      if (result.redirect) {
        window.location.href = result.redirect.toString();
        return;
      }

      router.replace("/");
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : `Unable to continue with ${provider === "google" ? "Google" : "GitHub"}.`,
      });
    } finally {
      setPendingAction(null);
    }
  };

  const isBusy = isLoading || pendingAction !== null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 lg:flex-row lg:items-center lg:justify-between">
        <section className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
            <span className="inline-flex h-2 w-2 rounded-full bg-brand-500" aria-hidden />
            MailToBills • Invoice inbox made effortless
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
              Forward your invoices.
              <br />
              We&apos;ll handle the rest.
            </h1>
            <p className="text-lg text-slate-600">
              Automate your invoice collection by forwarding them to a single email.
              We store, organize, and make everything searchable so you can focus on your work.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-lg bg-white/80 p-4 shadow-sm ring-1 ring-slate-200"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-xl">
                  {item.icon}
                </span>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 font-medium shadow-sm ring-1 ring-slate-200">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
              Real-time status on every invoice
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 font-medium shadow-sm ring-1 ring-slate-200">
              <span className="inline-block h-2 w-2 rounded-full bg-sky-500" aria-hidden />
              GDPR-friendly storage & exports
            </span>
          </div>
        </section>

        <Card className="w-full max-w-xl bg-white/95 shadow-xl ring-1 ring-slate-200">
          <CardHeader className="space-y-3 pb-0">
            <CardTitle className="text-2xl text-slate-900">
              {mode === "signIn" ? "Welcome back" : "Create your account"}
            </CardTitle>
            <CardDescription className="text-base text-slate-600">
              {subtitle}
            </CardDescription>
            <div className="flex gap-2 rounded-full bg-slate-100 p-1 text-sm font-medium text-slate-700">
              {["signIn", "signUp"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setMode(option as Mode)}
                  className={`flex-1 rounded-full px-3 py-1 transition ${
                    mode === option
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {option === "signIn" ? "Sign in" : "Sign up"}
                </button>
              ))}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {feedback && (
              <div
                role="alert"
                className={`rounded-md border px-4 py-3 text-sm ${
                  feedback.type === "error"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
                }`}
              >
                {feedback.message}
              </div>
            )}

            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-700">Continue with</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full justify-center"
                  onClick={() => handleOAuth("google")}
                  disabled={isBusy}
                >
                  <span className="text-lg">🟢</span>
                  {pendingAction === "google" ? "Connecting..." : "Google"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full justify-center"
                  onClick={() => handleOAuth("github")}
                  disabled={isBusy}
                >
                  <span className="text-lg">💻</span>
                  {pendingAction === "github" ? "Connecting..." : "GitHub"}
                </Button>
              </div>
            </div>

            <div className="space-y-3 rounded-lg bg-slate-50 p-4 ring-1 ring-slate-200">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                <span>Prefer email?</span>
                <span className="text-xs font-medium text-brand-700">Magic link</span>
              </div>
              <form onSubmit={handleMagicLink} className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="magic-email">Work email</Label>
                  <Input
                    id="magic-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={magicEmail}
                    onChange={(e) => setMagicEmail(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isBusy}
                >
                  {pendingAction === "magic"
                    ? "Sending magic link..."
                    : "Send me a magic link"}
                </Button>
              </form>
            </div>

            <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-slate-400">
              <span className="h-px flex-1 bg-slate-200" />
              Or continue with password
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete={mode === "signIn" ? "current-password" : "new-password"}
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isBusy}
              >
                {pendingAction === "password"
                  ? "Please wait..."
                  : mode === "signIn"
                  ? "Sign in"
                  : "Create account"}
              </Button>
            </form>

            <div className="flex items-center justify-between rounded-md bg-slate-50 px-4 py-3 text-sm text-slate-700">
              <div className="space-y-1">
                <p className="font-semibold text-slate-900">
                  {mode === "signIn" ? "New to MailToBills?" : "Already registered?"}
                </p>
                <p className="text-sm text-slate-600">
                  {mode === "signIn"
                    ? "You can create an account with Google, GitHub, magic link, or a password."
                    : "Use your email and password or sign in with OAuth."}
                </p>
              </div>
              <button
                type="button"
                className="text-brand-700 font-semibold hover:underline"
                onClick={() => setMode(mode === "signIn" ? "signUp" : "signIn")}
              >
                {mode === "signIn" ? "Create account" : "Go to sign in"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
