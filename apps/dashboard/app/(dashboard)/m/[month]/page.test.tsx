import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it, vi } from "vitest";

import messages from "@/messages/en/common.json";

const mocks = vi.hoisted(() => ({
  getLocale: vi.fn(() => Promise.resolve("en")),
  getTranslations: vi.fn(() =>
    Promise.resolve((key: string, values?: Record<string, string>) => {
      if (key === "registrationLine") {
        return `COLLECTION MONTH · M/${values?.month} · OPEN`;
      }

      return key;
    }),
  ),
  useAction: vi.fn(),
  useExpenseDocuments: vi.fn(),
  useQuery: vi.fn(),
}));

vi.mock("next-intl/server", () => ({
  getLocale: mocks.getLocale,
  getTranslations: mocks.getTranslations,
}));
vi.mock("convex/react", () => ({
  useAction: mocks.useAction,
  useQuery: mocks.useQuery,
}));
vi.mock(
  "@/features/expense-documents/read-model/useExpenseDocuments",
  () => ({
    useExpenseDocuments: mocks.useExpenseDocuments,
  }),
);

import CollectionMonthPage from "./page";

describe("CollectionMonthPage", () => {
  it("renders the month title and table skeleton while the client subscriptions load", async () => {
    mocks.useExpenseDocuments.mockReturnValue({
      documents: [],
      summary: { count: 0, attachmentCount: 0 },
      previousSummary: { count: 0, attachmentCount: 0 },
      exportSummary: {
        includedDocumentCount: 0,
        pdfFileCount: 0,
        manifestFileCount: 1,
        fileCount: 1,
        skippedDocumentCount: 0,
        skippedDocuments: [],
      },
      previousExportSummary: {
        includedDocumentCount: 0,
        pdfFileCount: 0,
        manifestFileCount: 1,
        fileCount: 1,
        skippedDocumentCount: 0,
        skippedDocuments: [],
      },
      totalCount: 0,
      isLoading: true,
    });
    mocks.useQuery.mockReturnValue(undefined);

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        {await CollectionMonthPage({
          params: Promise.resolve({ month: "2026-06" }),
        })}
      </NextIntlClientProvider>,
    );

    expect(
      screen.getByText("COLLECTION MONTH · M/2026-06 · OPEN"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "June 2026" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("table")).toHaveAttribute("aria-busy", "true");
    expect(
      screen.getByRole("button", { name: /send to accountant/i }),
    ).toBeDisabled();
  });
});
