"use client";

import { useQuery } from "convex/react";
import { api } from "../convexClient";

export default function DashboardPage() {
  const invoices = useQuery(api.invoices.listForUser, { userId: "demo-user" });

  return (
    <main className="min-h-screen flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-3xl space-y-6">
        <header className="border-b pb-4">
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p className="text-sm text-gray-700">
            Forward your invoices to your MailToBills inbox. They’ll appear here
            ready to export to your accountant.
          </p>
        </header>

        {invoices === undefined && <p>Loading…</p>}

        {invoices && invoices.length === 0 && (
          <p>No invoices yet. Try seeding one from Convex or n8n.</p>
        )}

        <ul className="space-y-2">
          {invoices?.map((inv) => (
            <li
              key={inv._id}
              className="flex flex-col gap-1 rounded border px-3 py-2 text-sm"
            >
              <div className="flex justify-between">
                <span className="font-medium">{inv.originalFilename}</span>
                <span className="text-gray-600">
                  {new Date(inv.receivedAt ?? inv.createdAt).toLocaleString()}
                </span>
              </div>
              {inv.fromEmail && (
                <div className="text-gray-700">From: {inv.fromEmail}</div>
              )}
              {inv.subject && (
                <div className="text-gray-600 line-clamp-1">
                  Subject: {inv.subject}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
