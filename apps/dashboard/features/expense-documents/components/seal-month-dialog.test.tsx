import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import messages from "@/messages/en/common.json";
import { SealMonthDialog } from "./seal-month-dialog";

const mocks = vi.hoisted(() => ({
  assign: vi.fn(),
}));

const documents = [
  {
    id: "document-newest",
    userId: "user-1",
    receivedAt: 2,
    createdAt: 2,
    dedupeKey: "newest",
    attachments: [],
    primaryAttachment: {
      id: "attachment-newest",
      expenseDocumentId: "document-newest",
      originalFilename: "newest-invoice.pdf",
      originalOrder: 0,
      createdAt: 2,
    },
  },
  {
    id: "document-without-primary",
    userId: "user-1",
    receivedAt: 1,
    createdAt: 1,
    dedupeKey: "without-primary",
    attachments: [],
  },
  {
    id: "document-oldest",
    userId: "user-1",
    receivedAt: 0,
    createdAt: 0,
    dedupeKey: "oldest",
    attachments: [],
    primaryAttachment: {
      id: "attachment-oldest",
      expenseDocumentId: "document-oldest",
      originalFilename: "oldest-receipt.pdf",
      originalOrder: 0,
      createdAt: 0,
    },
  },
];

vi.mock("@/features/expense-documents/read-model/useExpenseDocuments", () => ({
  useExpenseDocuments: vi.fn(() => ({
    documents,
    summary: { count: 3, attachmentCount: 2 },
    previousSummary: { count: 0, attachmentCount: 0 },
    exportSummary: {
      includedDocumentCount: 2,
      pdfFileCount: 2,
      manifestFileCount: 1,
      fileCount: 3,
      skippedDocumentCount: 1,
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
    totalCount: 3,
    isLoading: false,
  })),
}));

function renderDialog() {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <SealMonthDialog month="2026-01" monthLabel="January 2026" />
    </NextIntlClientProvider>,
  );
}

describe("SealMonthDialog", () => {
  let locationDescriptor: PropertyDescriptor | undefined;

  beforeEach(() => {
    locationDescriptor = Object.getOwnPropertyDescriptor(window, "location");
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { assign: mocks.assign },
    });
    vi.stubGlobal("matchMedia", () => ({ matches: false }));
    mocks.assign.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    if (locationDescriptor) {
      Object.defineProperty(window, "location", locationDescriptor);
    }
  });

  it("renders the primary-document manifest with newest-first numbering", async () => {
    const user = userEvent.setup();
    renderDialog();

    await user.click(screen.getByRole("button", { name: "Download ZIP" }));

    expect(screen.getByText("newest-invoice.pdf")).toBeVisible();
    expect(screen.getByText("oldest-receipt.pdf")).toBeVisible();
    expect(screen.queryByText("document-without-primary.pdf")).not.toBeInTheDocument();
    expect(screen.getByText("newest-invoice.pdf").previousElementSibling).toHaveTextContent("002");
    expect(screen.getByText("oldest-receipt.pdf").previousElementSibling).toHaveTextContent("001");
  });

  it("shows the sealed status before navigating after the stamp delay", async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByRole("button", { name: "Download ZIP" }));

    vi.useFakeTimers();
    fireEvent.click(screen.getByRole("button", { name: "Seal and download" }));

    expect(screen.getByText("Sealed — download starting")).toBeVisible();
    expect(mocks.assign).not.toHaveBeenCalled();

    vi.advanceTimersByTime(649);
    expect(mocks.assign).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(mocks.assign).toHaveBeenCalledWith("/api/exports/2026-01");
  });

  it("navigates instantly when reduced motion is enabled", async () => {
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByRole("button", { name: "Download ZIP" }));

    vi.useFakeTimers();
    fireEvent.click(screen.getByRole("button", { name: "Seal and download" }));
    expect(mocks.assign).not.toHaveBeenCalled();

    vi.advanceTimersByTime(0);
    expect(mocks.assign).toHaveBeenCalledWith("/api/exports/2026-01");
  });
});
