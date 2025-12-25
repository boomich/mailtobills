import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CloudIcon,
  InboxIcon,
  ShieldIcon,
} from "@mailtobills/ui";

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
] as const;

export function AuthMarketing() {
  return (
    <section className="flex-1 space-y-6">
      <div className="bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700">
        <span className="h-2 w-2 rounded-full bg-brand-600" aria-hidden />
        MailToBills • Billing inbox
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
          Forward your invoices. We&apos;ll do the rest.
        </h1>
        <p className="max-w-2xl text-base text-slate-700 sm:text-lg">
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
  );
}
