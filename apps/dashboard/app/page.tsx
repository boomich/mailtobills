"use client";

import { useQuery } from "convex/react";
import { api } from "../convexClient";

export default function DashboardPage() {
  const invoices = useQuery(api.invoices.listForUser, {
    userId: "demo-user",
  });

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-6 py-12">
      <div className="w-full max-w-2xl space-y-4">
        <h1 className="text-3xl font-bold">Invoices</h1>

        {invoices === undefined && (
          <div className="rounded border px-3 py-2 text-sm text-gray-700">
            Connecting to Convex… Ensure `pnpm --filter @mailtobills/convex dev`
            is running and `NEXT_PUBLIC_CONVEX_URL` is set in
            apps/dashboard/.env.local.
          </div>
        )}

        {invoices && invoices.length === 0 && <p>No invoices yet.</p>}

        <ul className="space-y-2">
          {invoices?.map((inv) => (
            <li key={inv._id} className="border rounded px-3 py-2">
              <div className="font-medium">{inv.originalFilename}</div>
              <div className="text-sm text-gray-600">
                {new Date(inv.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
