"use client";

import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "../convexClient";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  EmptyState,
  Input,
  Label,
} from "@mailtobills/ui";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const convexHttpBase =
  process.env.NEXT_PUBLIC_CONVEX_HTTP_URL ??
  process.env.NEXT_PUBLIC_CONVEX_URL?.replace(".cloud", ".site") ??
  "";

type InvoiceFormState = {
  originalFilename: string;
  fileUrl: string;
  fromEmail: string;
  subject: string;
};

export default function DashboardPage() {
  const invoices = useQuery(api.invoices.listMine, {});
  const createInvoice = useMutation(api.invoices.createInvoice);
  const { signOut } = useAuthActions();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();

  const inboxEmail = "inbox@mailtobills.com";

  const [isCreating, setIsCreating] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [form, setForm] = useState<InvoiceFormState>({
    originalFilename: "",
    fileUrl: "",
    fromEmail: "",
    subject: "",
  });

  const resetForm = () =>
    setForm({
      originalFilename: "",
      fileUrl: "",
      fromEmail: "",
      subject: "",
    });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const trimmedName = form.originalFilename.trim();
    const trimmedUrl = form.fileUrl.trim();

    if (!trimmedName || !trimmedUrl) {
      return;
    }

    try {
      setIsCreating(true);
      await createInvoice({
        originalFilename: trimmedName,
        fileUrl: trimmedUrl,
        fromEmail: form.fromEmail.trim() || undefined,
        subject: form.subject.trim() || undefined,
        receivedAt: Date.now(),
      });
      resetForm();
      setIsFormOpen(false);
    } finally {
      setIsCreating(false);
    }
  };

  const hasData = Boolean(invoices && invoices.length > 0);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inboxEmail);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy inbox address", error);
    }
  };

  const sortedInvoices = useMemo(() => {
    if (!invoices) return [];
    return [...invoices].sort((a, b) => b.receivedAt - a.receivedAt);
  }, [invoices]);

  const renderTable = () => (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-4 py-2">File</th>
                <th className="px-4 py-2">From</th>
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">Received at</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedInvoices.map((inv) => {
                const date = new Date(inv.receivedAt ?? inv.createdAt);
                return (
                  <tr key={inv._id} className="border-b border-slate-100">
                    <td className="px-4 py-2 font-medium text-slate-900">
                      {inv.originalFilename}
                    </td>
                    <td className="px-4 py-2 text-slate-700">
                      {inv.fromEmail ?? "N/A"}
                    </td>
                    <td className="px-4 py-2 text-slate-700">
                      {inv.subject ?? "N/A"}
                    </td>
                    <td className="px-4 py-2 text-slate-600 text-xs">
                      {date.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-xs">
                      {(() => {
                        const href =
                          inv.fileUrl ||
                          (inv.fileStorageId && convexHttpBase
                            ? `${convexHttpBase}/file?storageId=${inv.fileStorageId}`
                            : null);

                        if (!href) {
                          return <span className="text-slate-400">No file</span>;
                        }

                        return (
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-brand-600 hover:underline"
                          >
                            Download
                          </a>
                        );
                      })()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
      router.replace("/signin");
    } catch (error) {
      console.error("Failed to sign out", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const renderHeader = () => (
    <header className="flex items-center justify-between border-b border-slate-200 pb-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-lg font-semibold text-brand-700 shadow-sm">
          M
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-brand-600">MailToBills</p>
          <p className="text-xs text-slate-500">Forward invoices. Export on demand.</p>
        </div>
      </div>

      <div className="flex items-center gap-3 text-sm">
        <Button variant="secondary" className="px-3" disabled>
          Settings
        </Button>
        {isAuthenticated && !isLoading ? (
          <Button
            variant="secondary"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="px-3"
          >
            {isSigningOut ? "Signing out..." : "Logout"}
          </Button>
        ) : null}
      </div>
    </header>
  );

  const renderManualForm = () => (
    <Card>
      <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <CardTitle className="text-base">Add invoice manually</CardTitle>
          <CardDescription>
            Use this while the n8n flow is not wired; data goes to Convex.
          </CardDescription>
        </div>
        <Button
          variant={isFormOpen ? "secondary" : "primary"}
          onClick={() => setIsFormOpen((open) => !open)}
        >
          {isFormOpen ? "Hide form" : "Add invoice"}
        </Button>
      </CardHeader>

      {isFormOpen && (
        <CardContent>
          <form
            className="grid grid-cols-1 items-end gap-3 md:grid-cols-2"
            onSubmit={handleSubmit}
          >
            <div className="space-y-1.5">
              <Label htmlFor="originalFilename">File name *</Label>
              <Input
                id="originalFilename"
                value={form.originalFilename}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    originalFilename: e.target.value,
                  }))
                }
                placeholder="invoice-123.pdf"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="fileUrl">File URL *</Label>
              <Input
                id="fileUrl"
                value={form.fileUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, fileUrl: e.target.value }))
                }
                placeholder="https://..."
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="fromEmail">From email</Label>
              <Input
                id="fromEmail"
                value={form.fromEmail}
                onChange={(e) =>
                  setForm((f) => ({ ...f, fromEmail: e.target.value }))
                }
                placeholder="supplier@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={form.subject}
                onChange={(e) =>
                  setForm((f) => ({ ...f, subject: e.target.value }))
                }
                placeholder="Invoice #123..."
              />
            </div>

            <div className="flex justify-end gap-2 md:col-span-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  resetForm();
                  setIsFormOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isCreating}>
                {isCreating ? "Saving..." : "Save invoice"}
              </Button>
            </div>
          </form>
        </CardContent>
      )}
    </Card>
  );

  const renderEmptyState = () => (
    <section className="flex flex-1 items-center justify-center">
      <Card className="w-full max-w-4xl border-slate-200 bg-white/95 shadow-lg">
        <CardContent className="flex flex-col items-center gap-8 px-8 py-10 text-center md:px-12">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-b from-brand-50 to-brand-100">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-[0_14px_45px_rgba(15,23,42,0.12)]">
                  <span className="text-4xl" role="img" aria-label="Invoice envelope">
                    📩
                  </span>
                </div>
              </div>
              <div className="absolute -right-2 -top-1 rounded-full bg-white px-2 py-1 text-xs font-semibold text-brand-600 shadow-sm">
                INV-2024
              </div>
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl font-semibold">Get started with MailToBills!</CardTitle>
              <CardDescription className="text-base text-slate-600">
                Forward your invoices to the address below:
              </CardDescription>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-6">
            <div className="flex w-full flex-col items-center gap-2 text-sm text-slate-600">
              <div className="flex w-full max-w-xl flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-left shadow-inner">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Your MailToBills inbox</p>
                <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-3">
                  <Input readOnly value={inboxEmail} className="md:flex-1" />
                  <Button onClick={handleCopy} className="w-full md:w-auto">
                    {hasCopied ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </div>
            </div>

            <ul className="space-y-2 text-left text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
                  ✓
                </span>
                <span>Find an invoice in your email</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
                  ✓
                </span>
                <span>Forward it to {inboxEmail}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
                  ✓
                </span>
                <span>See it appear here instantly!</span>
              </li>
            </ul>

            <div className="flex flex-col items-center gap-2">
              <Button className="shadow-md">Send a Test Invoice</Button>
              <p className="text-xs text-slate-500">
                No invoices yet. Start forwarding your bills to organize them automatically.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto flex min-h-[80vh] max-w-5xl flex-col gap-8">
        {renderHeader()}

        {invoices === undefined ? (
          <EmptyState
            title="Connecting to Convex"
            description="Make sure the backend is running and the URL is set."
          />
        ) : null}

        {invoices && !hasData ? (
          renderEmptyState()
        ) : null}

        {hasData ? (
          <div className="space-y-6">
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Invoices</h1>
                <p className="text-sm text-slate-600">
                  All emails forwarded to your MailToBills inbox.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" disabled>
                  Export CSV (soon)
                </Button>
                <Button
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Refresh
                </Button>
              </div>
            </div>

            {renderManualForm()}

            {renderTable()}
          </div>
        ) : null}
      </div>
    </main>
  );
}
