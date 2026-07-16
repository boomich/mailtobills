import { fetchQuery } from "convex/nextjs";
import { api } from "@mailtobills/convex/_generated/api";
import { getTranslations } from "next-intl/server";

import {
  AccountantSettings,
  CollectionAddress,
} from "@/components/accountant-settings";
import { BillingSettings } from "@/components/billing-settings";
import { ExportScheduleForm } from "@/components/export-schedule-form";
import { ForwardingAddressesForm } from "@/components/forwarding-addresses-form";
import { PreferencesSettings } from "@/components/preferences-settings";
import { requireCurrentCustomer } from "@/features/customer/read-model/getCurrentCustomer";

function FormHead({
  number,
  title,
  note,
}: {
  number: string;
  title: string;
  note?: string;
}) {
  return (
    <header className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
      <span className="grid size-7 shrink-0 place-items-center border-[1.5px] border-foreground pt-px font-mono text-[13px] leading-none font-bold">
        {number}
      </span>
      <h2 className="font-display text-lg font-bold tracking-[0.11em] uppercase [font-stretch:86%]">
        {title}
      </h2>
      {note ? (
        <span className="ml-auto font-mono text-[10px] tracking-[0.08em] text-muted-foreground uppercase">
          {note}
        </span>
      ) : null}
    </header>
  );
}

export default async function SettingsPage() {
  const t = await getTranslations("Settings");
  const { token, customer } = await requireCurrentCustomer();
  const subscription = await fetchQuery(
    api.subscriptions.getMySubscription,
    {},
    { token },
  );

  return (
    <main className="mx-auto w-full max-w-[860px] px-2.5 py-8 sm:px-6 sm:py-10">
      <article className="border border-foreground bg-background shadow-[8px_8px_0_0_oklch(0.27_0.025_268/0.12)]">
        <header className="border-b-2 border-foreground px-5 pt-7 pb-5 sm:px-9">
          <div className="mb-1.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
            {t("form.code")}
          </div>
          <h1 className="font-display text-3xl font-extrabold tracking-[-0.01em] [font-stretch:112%] sm:text-4xl">
            {t("title")}
          </h1>
        </header>

        <section className="border-b border-border px-5 py-8 sm:px-9">
          <FormHead number="1" title={t("form.collection.title")} />
          <div className="max-w-[520px]">
            <CollectionAddress
              value="inbox@mailtobills.com"
              label={t("form.collection.copyLabel")}
              copiedLabel={t("form.collection.copiedLabel")}
            />
            <p className="mt-2.5 text-[13px] text-muted-foreground">
              {t("form.collection.description")}
            </p>
          </div>
        </section>

        <section className="border-b border-border px-5 py-8 sm:px-9">
          <FormHead number="2" title={t("form.forwarding.title")} />
          <p className="mb-5 max-w-[54ch] text-[13.5px] text-muted-foreground">
            {t("form.forwarding.description")}
          </p>
        <ForwardingAddressesForm
          isPro={customer.plan === "pro"}
          primaryEmail={customer.email ?? undefined}
          forwardingEmails={customer.forwardingAddresses}
        />
        </section>

        <section className="border-b border-border px-5 py-8 sm:px-9">
          <FormHead number="3" title={t("form.accountant.title")} />
          <AccountantSettings
            accountantEmail={customer.accountantAddress ?? undefined}
            accountantName={customer.accountantName ?? undefined}
            exportScheduleDay={customer.exportScheduleDay ?? undefined}
          />
        </section>

        <section className="border-b border-border px-5 py-8 sm:px-9">
          <FormHead
            number="4"
            title={t("form.schedule.title")}
            note={t("form.pro")}
          />
        <ExportScheduleForm
          isPro={customer.plan === "pro"}
          accountantEmail={customer.accountantAddress ?? undefined}
          accountantName={customer.accountantName ?? undefined}
          exportScheduleDay={customer.exportScheduleDay ?? undefined}
        />
        </section>

        <section className="border-b border-border px-5 py-8 sm:px-9">
          <FormHead number="5" title={t("form.preferences.title")} />
          <PreferencesSettings />
        </section>

        <section id="plan" className="scroll-mt-16 px-5 py-8 sm:px-9">
          <FormHead
            number="6"
            title={t("form.billing.title")}
            note={t("form.billing.note")}
          />
          <BillingSettings
            isPro={customer.plan === "pro"}
            subscriptionStatus={subscription?.status}
            currentPeriodEnd={subscription?.currentPeriodEnd}
            proPriceLabel={process.env.LEMONSQUEEZY_PRO_PRICE_LABEL ?? "Pro"}
          />
        </section>
      </article>
    </main>
  );
}
