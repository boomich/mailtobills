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

  const [isCreating, setIsCreating] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
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
  const inboxAddress = "inbox@mailtobills.com";
  const onboardingSteps = [
    "Find an invoice in your email",
    `Forward it to ${inboxAddress}`,
    "See it appear here instantly!",
  ];

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

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(inboxAddress);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy inbox address", error);
    }
  };

  const handleSendTestInvoice = async () => {
    try {
      setIsSendingTest(true);
      await createInvoice({
        originalFilename: "mailtobills-test-invoice.pdf",
        fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        fromEmail: "billing@example.com",
        subject: "Test invoice",
        receivedAt: Date.now(),
      });
    } catch (error) {
      console.error("Failed to create test invoice", error);
    } finally {
      setIsSendingTest(false);
    }
  };

  if (invoices && !hasData) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10">
          <header className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-lg font-semibold text-brand-700">
                M
              </div>
              <span className="text-xl font-semibold text-slate-900">MailToBills</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" disabled>
                Settings
              </Button>
              <Button
                variant="secondary"
                onClick={handleSignOut}
                disabled={isSigningOut || !isAuthenticated || isLoading}
              >
                {isSigningOut ? "Signing out..." : "Logout"}
              </Button>
            </div>
          </header>

          <div className="grid items-center gap-8 rounded-xl border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-2">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                  Start here
                </p>
                <h1 className="text-3xl font-bold text-slate-900">
                  Get started with MailToBills!
                </h1>
                <p className="text-base text-slate-700">
                  Forward your invoices to the address below to see them organize automatically.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-inner">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Your MailToBills email
                    </p>
                    <p className="truncate text-lg font-semibold text-slate-900">{inboxAddress}</p>
                  </div>
                  <Button onClick={handleCopyAddress} className="w-full sm:w-auto">
                    {isCopied ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>

              <ul className="space-y-4">
                {onboardingSteps.map((text, index) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-700">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-slate-800">{text}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Button onClick={handleSendTestInvoice} disabled={isSendingTest} className="w-full sm:w-auto">
                  {isSendingTest ? "Sending..." : "Send a Test Invoice"}
                </Button>
                <p className="text-sm text-slate-600">
                  No invoices yet. Start forwarding your bills to organize them automatically.
                </p>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="relative h-80 w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 shadow-inner">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-36 w-44 flex-col items-center justify-center rounded-xl border border-slate-200 bg-white shadow-lg">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6"
                        aria-hidden="true"
                      >
                        <path d="M3 5.75A2.75 2.75 0 0 1 5.75 3h12.5A2.75 2.75 0 0 1 21 5.75v12.5A2.75 2.75 0 0 1 18.25 21H5.75A2.75 2.75 0 0 1 3 18.25z"></path>
                        <path
                          fill="white"
                          d="M6.22 7.47a.75.75 0 0 1 1.06 0L12 12.19l4.72-4.72a.75.75 0 1 1 1.06 1.06l-5.25 5.25a.75.75 0 0 1-1.06 0L6.22 8.53a.75.75 0 0 1 0-1.06"
                        ></path>
                      </svg>
                    </div>
                    <div className="mt-3 space-y-1 text-center">
                      <p className="text-sm font-semibold text-slate-900">Invoice</p>
                      <p className="text-xs text-slate-600">PDF • supplier@example.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center px-6 py-12 bg-slate-50">
      <div className="w-full max-w-4xl space-y-6">
        <header className="flex flex-col gap-3 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Invoices</h1>
            <p className="text-sm text-slate-600">
              All emails forwarded to your MailToBills inbox.
            </p>
          </div>
          <div className="flex gap-2 items-center">
            {isAuthenticated && !isLoading && (
              <Button
                variant="secondary"
                onClick={handleSignOut}
                disabled={isSigningOut}
              >
                {isSigningOut ? "Signing out..." : "Sign out"}
              </Button>
            )}
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
        </header>

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

        {invoices === undefined && (
          <EmptyState
            title="Connecting to Convex"
            description="Make sure the backend is running and the URL is set."
          />
        )}

        {hasData && renderTable()}
      </div>
    </main>
  );
}
