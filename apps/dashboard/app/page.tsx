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

  return (
    <main className="min-h-screen flex flex-col items-center px-6 py-12 bg-slate-50">
      <div className="w-full max-w-4xl space-y-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Invoices</h1>
            <p className="text-sm text-slate-600">
              All emails forwarded to your MailToBills inbox.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
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
          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg">Add invoice manually</CardTitle>
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

          {isFormOpen ? (
            <CardContent>
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end"
                onSubmit={handleSubmit}
              >
                <div className="space-y-1">
                  <Label htmlFor="originalFilename">File name *</Label>
                  <Input
                    id="originalFilename"
                    value={form.originalFilename}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, originalFilename: e.target.value }))
                    }
                    placeholder="invoice-123.pdf"
                    required
                  />
                </div>

                <div className="space-y-1">
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

                <div className="space-y-1">
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

                <div className="space-y-1">
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

                <div className="md:col-span-2 flex justify-end gap-2">
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
          ) : null}
        </Card>

        {invoices === undefined && (
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="text-sm text-amber-900">
              Connecting to Convex… make sure backend is running and URL is set.
            </CardContent>
          </Card>
        )}

        {invoices && !hasData && (
          <EmptyState
            title="No invoices yet"
            description="Forward a PDF to your MailToBills email to see it here."
            action={
              <Button onClick={() => setIsFormOpen(true)}>Add invoice</Button>
            }
          />
        )}

        {hasData && renderTable()}
      </div>
    </main>
  );
}
