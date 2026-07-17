"use client";

import { useState } from "react";

import { useAuthActions } from "@convex-dev/auth/react";
import { Check, Copy, LogOut } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { PostmarkMini } from "@mailtobills/ui/components/postmark";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@mailtobills/ui/components/dropdown-menu";

import { FeedbackDialog } from "@/components/feedback-dialog";

export function CounterBar({
  customer,
  collectionAddress,
}: {
  customer: { name: string; email: string | null };
  collectionAddress: string;
}) {
  const t = useTranslations("CounterBar");
  const navigationT = useTranslations("Navigation");
  const { signOut } = useAuthActions();
  const params = useParams<{ month?: string }>();
  const [isCopied, setIsCopied] = useState(false);
  const month = typeof params.month === "string" ? params.month : null;
  const initials = (customer.name || customer.email || "Customer")
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const copyCollectionAddress = async () => {
    try {
      await navigator.clipboard.writeText(collectionAddress);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("collection_address_copy_failed", { error });
    }
  };

  return (
    <header className="border-b border-foreground bg-background">
      <div className="mx-auto flex h-14 max-w-[1160px] items-center justify-between gap-3 px-4 sm:px-6">
        <Link href={month ? `/m/${month}` : "/"} className="flex shrink-0 items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <PostmarkMini className="size-6 text-foreground" />
          <span className="font-display text-[15px] font-bold [font-stretch:105%] max-sm:hidden">
            MailToBills
          </span>
        </Link>

        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <span className="font-display text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase [font-stretch:80%] max-lg:hidden">
            {t("collectionAddress")}
          </span>
          <button
            type="button"
            onClick={copyCollectionAddress}
            title={isCopied ? t("copied") : t("copyCollectionAddress")}
            aria-label={isCopied ? t("copied") : t("copyCollectionAddress")}
            className="inline-flex min-w-0 items-center gap-1.5 border border-transparent px-1.5 py-1 font-mono text-[11px] font-bold tracking-[0.04em] text-foreground transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {isCopied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            <span className="max-w-36 truncate sm:max-w-56">{collectionAddress}</span>
          </button>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <FeedbackDialog />
          <Link href="/settings" className="px-2 py-1 font-display text-[12px] font-bold tracking-[0.08em] uppercase [font-stretch:86%] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {navigationT("settings")}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" aria-label={navigationT("userMenu")} className="grid size-8 place-items-center border-[1.5px] border-foreground font-mono text-[11px] font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {initials}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-48">
              <DropdownMenuLabel className="font-mono text-[11px]">
                <div className="truncate font-bold">{customer.name}</div>
                {customer.email ? <div className="truncate text-muted-foreground">{customer.email}</div> : null}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => signOut()}>
                <LogOut />
                {navigationT("logOut")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
