"use client";

import {
  MailPlus,
  Trash2,
} from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import {
  updateForwardingAddress,
  type CustomerSettingsActionState,
} from "@/features/customer/actions/updateCustomerSettings";
import { Button } from "@mailtobills/ui/components/button";
import { Input } from "@mailtobills/ui/components/input";

function ProTag({ label }: { label: string }) {
  return (
    <a
      href="#plan"
      className="inline-flex items-center border-[1.5px] border-primary px-1.5 py-0.5 font-display text-[9.5px] font-bold tracking-[0.14em] text-primary uppercase [font-stretch:88%] transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {label}
    </a>
  );
}

function isPlausibleEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function ForwardingAddressesForm({
  isPro,
  primaryEmail,
  forwardingEmails,
}: {
  isPro: boolean;
  primaryEmail?: string;
  forwardingEmails: string[];
}) {
  const [email, setEmail] = useState("");
  const t = useTranslations("Settings.forwarding");
  const [hasChangedSinceResult, setHasChangedSinceResult] = useState(false);
  const [actionState, formAction, isPending] = useActionState(
    updateForwardingAddress,
    { status: "idle" } satisfies CustomerSettingsActionState,
  );
  const canSubmit = isPro && isPlausibleEmail(email) && !isPending;

  useEffect(() => {
    if (actionState.status === "success" && actionState.intent === "add") {
      setEmail("");
    }
  }, [actionState]);

  return (
    <div className="max-w-[560px]">
      <ul className="border-t-2 border-foreground">
        <li className="flex items-baseline justify-between gap-4 border-b border-border py-3">
          <span className="min-w-0 truncate font-mono text-[13px] font-bold">
            {primaryEmail ?? t("noPrimary")}
          </span>
          <span className="shrink-0 font-mono text-[9.5px] tracking-[0.12em] text-muted-foreground uppercase">
            {t("primary")}
          </span>
        </li>
        {forwardingEmails.length > 0 ? (
          forwardingEmails.map((forwardingEmail) => (
            <li
                key={forwardingEmail}
                className="flex items-center justify-between gap-3 border-b border-border py-3"
              >
                <span className="min-w-0 truncate font-mono text-[13px]">
                  {forwardingEmail}
                </span>
                <form
                  action={formAction}
                  onSubmit={() => setHasChangedSinceResult(false)}
                >
                  <input type="hidden" name="intent" value="remove" />
                  <input type="hidden" name="email" value={forwardingEmail} />
                  <Button
                    type="submit"
                    size="icon-sm"
                    variant="ghost"
                    disabled={!isPro || isPending}
                    aria-label={t("remove", { email: forwardingEmail })}
                    className="rounded-none"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </form>
            </li>
          ))
        ) : null}

        <li className="flex flex-wrap items-center justify-between gap-3 border-b border-border py-3">
          <form
            className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row"
            action={formAction}
            onSubmit={() => setHasChangedSinceResult(false)}
          >
            <input type="hidden" name="intent" value="add" />
            <Input
              type="email"
              name="email"
              value={email}
              disabled={!isPro}
              onChange={(event) => {
                setEmail(event.target.value);
                setHasChangedSinceResult(true);
              }}
              placeholder={t("placeholder")}
              aria-label={t("inputLabel")}
              className="h-9 max-w-[280px] rounded-none font-mono text-[13px]"
            />
            <Button type="submit" size="sm" disabled={!canSubmit} className="rounded-none">
              <MailPlus className="size-4" />
              {t("add")}
            </Button>
          </form>
          {!isPro ? (
            <span className="flex items-center gap-2 text-[12.5px] text-muted-foreground">
              {t("proGate")} <ProTag label={t("pro")} />
            </span>
          ) : null}
        </li>
      </ul>

      {!isPending &&
      !hasChangedSinceResult &&
      actionState.status === "success" ? (
        <p className="text-sm text-primary" aria-live="polite">
          {actionState.message}
        </p>
      ) : null}
      {!isPending &&
      !hasChangedSinceResult &&
      actionState.status === "error" ? (
        <p className="text-destructive text-sm" role="alert">
          {actionState.message}
        </p>
      ) : null}
    </div>
  );
}
