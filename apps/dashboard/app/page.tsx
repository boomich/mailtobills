"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../convexClient";
import { Button } from "@mailtobills/ui";
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
  const invoices = useQuery(api.invoices.listForUser, { userId: "demo-user" });
  const createInvoice = useMutation(api.invoices.createInvoice);

  const [isCreating, setIsCreating] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
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
        userId: "demo-user",
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
    <div className="overflow-x-auto rounded-md border border-slate-200 bg-white">
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
                  {inv.fromEmail ?? "—"}
                </td>
                <td className="px-4 py-2 text-slate-700">
                  {inv.subject ?? "—"}
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
  );

  return (
    <main className="min-h-screen flex flex-col items-center px-6 py-12 bg-slate-50">
      <div className="w-full max-w-4xl space-y-6">
        <header className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Invoices</h1>
            <p className="text-sm text-slate-600">
              All emails forwarded to your MailToBills inbox.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" disabled>
              Export CSV (soon)
            </Button>
            <Button
              onClick={() => {
                // simples helper pra testar ingest via curl depois, se quiser
                window.location.reload();
              }}
            >
              Refresh
            </Button>
          </div>
        </header>

        <section className="rounded-md border border-slate-200 bg-white p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-slate-800">
                Add invoice manually
              </p>
              <p className="text-xs text-slate-600">
                Use this while the n8n flow is not wired; data goes to Convex.
              </p>
            </div>
            <Button
              variant={isFormOpen ? "secondary" : "primary"}
              onClick={() => setIsFormOpen((open) => !open)}
            >
              {isFormOpen ? "Hide form" : "Add invoice"}
            </Button>
          </div>

          {isFormOpen && (
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end pt-2"
              onSubmit={handleSubmit}
            >
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-700">
                  File name *
                </label>
                <input
                  className="w-full rounded-md border border-slate-300 px-2 py-1 text-sm"
                  value={form.originalFilename}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, originalFilename: e.target.value }))
                  }
                  placeholder="invoice-123.pdf"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-700">
                  File URL *
                </label>
                <input
                  className="w-full rounded-md border border-slate-300 px-2 py-1 text-sm"
                  value={form.fileUrl}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, fileUrl: e.target.value }))
                  }
                  placeholder="https://..."
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-700">
                  From email
                </label>
                <input
                  className="w-full rounded-md border border-slate-300 px-2 py-1 text-sm"
                  value={form.fromEmail}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, fromEmail: e.target.value }))
                  }
                  placeholder="supplier@example.com"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-700">
                  Subject
                </label>
                <input
                  className="w-full rounded-md border border-slate-300 px-2 py-1 text-sm"
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
          )}
        </section>

        {invoices === undefined && (
          <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            Connecting to Convex… make sure backend is running and URL is set.
          </div>
        )}

        {invoices && !hasData && (
          <div className="rounded-md border border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-600">
            No invoices yet.
            <br />
            Forward a PDF to your MailToBills email to see it here.
          </div>
        )}

        {hasData && renderTable()}
      </div>
    </main>
  );
}
