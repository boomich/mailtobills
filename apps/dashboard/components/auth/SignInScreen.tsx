"use client";

import { useEffect } from "react";

import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";

import { AuthForm, type AuthMode } from "./AuthForm";
import { AuthMarketing } from "./AuthMarketing";

type Props = {
  initialMode: AuthMode;
  magicLinkEnabled: boolean;
};

export function SignInScreen({ initialMode, magicLinkEnabled }: Props) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10 lg:flex-row lg:items-center lg:py-12">
        <section className="w-full mx-auto max-w-lg lg:order-2 lg:flex-1">
          <AuthForm
            initialMode={initialMode}
            magicLinkEnabled={magicLinkEnabled}
          />
        </section>

        <div className="lg:order-1 lg:flex-1">
          <AuthMarketing />
        </div>
      </div>
    </main>
  );
}
