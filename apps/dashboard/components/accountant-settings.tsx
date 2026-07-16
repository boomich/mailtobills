"use client";

import { useActionState, useState } from "react";
import { useTranslations } from "next-intl";

import {
  updateAccountantDeliverySettings,
  type CustomerSettingsActionState,
} from "@/features/customer/actions/updateCustomerSettings";
import { Button } from "@mailtobills/ui/components/button";
import { Input } from "@mailtobills/ui/components/input";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-display text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase [font-stretch:80%]">
      {children}
    </span>
  );
}

export function CollectionAddress({
  value,
  label,
  copiedLabel,
}: {
  value: string;
  label: string;
  copiedLabel: string;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("collection_address_copy_failed", { error });
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="flex min-h-10 w-full max-w-[520px] items-center justify-between gap-3 border border-foreground px-3 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={isCopied ? copiedLabel : label}
    >
      <span className="min-w-0 truncate font-mono text-[13px] font-bold">
        {value}
      </span>
      <span className="shrink-0 font-display text-[10px] font-bold tracking-[0.12em] text-primary uppercase [font-stretch:88%]">
        {isCopied ? copiedLabel : label}
      </span>
    </button>
  );
}

export function AccountantSettings({
  accountantEmail,
  accountantName,
  exportScheduleDay,
}: {
  accountantEmail?: string;
  accountantName?: string;
  exportScheduleDay?: number;
}) {
  const t = useTranslations("Settings.accountant");
  const [email, setEmail] = useState(accountantEmail ?? "");
  const [name, setName] = useState(accountantName ?? "");
  const [hasChangedSinceResult, setHasChangedSinceResult] = useState(false);
  const [actionState, formAction, isPending] = useActionState(
    updateAccountantDeliverySettings,
    { status: "idle" } satisfies CustomerSettingsActionState,
  );

  return (
    <form
      className="grid max-w-[560px] gap-5"
      action={formAction}
      noValidate
      onSubmit={() => setHasChangedSinceResult(false)}
    >
      <input type="hidden" name="intent" value="save" />
      <input
        type="hidden"
        name="exportScheduleDay"
        value={exportScheduleDay ?? 5}
      />
      {exportScheduleDay ? (
        <input type="hidden" name="scheduleEnabled" value="on" />
      ) : null}
      <div className="grid gap-1.5">
        <label htmlFor="accountant-name">
          <FieldLabel>{t("name")}</FieldLabel>
        </label>
        <Input
          id="accountant-name"
          name="accountantName"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setHasChangedSinceResult(true);
          }}
          placeholder={t("namePlaceholder")}
          className="max-w-[320px] rounded-none"
        />
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="accountant-email">
          <FieldLabel>{t("address")}</FieldLabel>
        </label>
        <Input
          id="accountant-email"
          name="accountantEmail"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setHasChangedSinceResult(true);
          }}
          placeholder={t("addressPlaceholder")}
          className="max-w-[320px] rounded-none font-mono text-[13px]"
        />
      </div>
      <p className="text-[12.5px] text-muted-foreground">{t("description")}</p>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="sm" className="rounded-none" disabled={isPending}>
          {t("save")}
        </Button>
        {!isPending &&
        !hasChangedSinceResult &&
        actionState.status === "success" ? (
          <span
            className="carimbo-thunk border border-primary px-2 py-1 font-mono text-[10px] font-bold tracking-[0.12em] text-primary uppercase"
            aria-live="polite"
          >
            {t("saved")}
          </span>
        ) : null}
      </div>
      {!isPending &&
      !hasChangedSinceResult &&
      actionState.status === "error" ? (
        <p className="text-destructive text-sm" role="alert">
          {actionState.message}
        </p>
      ) : null}
    </form>
  );
}
