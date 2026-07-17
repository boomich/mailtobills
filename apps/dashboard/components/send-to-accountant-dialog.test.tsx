import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import { beforeEach, describe, expect, it, vi } from "vitest";

import messages from "@/messages/en/common.json";
import { SendToAccountantDialog } from "./send-to-accountant-dialog";

const mocks = vi.hoisted(() => ({
  sendManualExportToAccountant: vi.fn(),
}));

vi.mock("convex/react", () => ({
  useAction: vi.fn(() => mocks.sendManualExportToAccountant),
}));

vi.mock("@/features/expense-documents/read-model/useExpenseDocuments", () => ({
  useExpenseDocuments: vi.fn(() => ({
    documents: [],
    summary: { count: 2, attachmentCount: 2 },
    previousSummary: { count: 0, attachmentCount: 0 },
    exportSummary: {
      includedDocumentCount: 2,
      pdfFileCount: 2,
      manifestFileCount: 1,
      fileCount: 3,
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
    totalCount: 2,
    isLoading: false,
  })),
}));

function renderDialog(
  props: Partial<React.ComponentProps<typeof SendToAccountantDialog>> = {},
) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <SendToAccountantDialog
        month="2026-01"
        monthLabel="January 2026"
        isPro
        accountantEmail="accountant@example.com"
        {...props}
      />
    </NextIntlClientProvider>,
  );
}

describe("SendToAccountantDialog", () => {
  beforeEach(() => {
    mocks.sendManualExportToAccountant.mockReset();
  });

  it("shows the checkout form and PRO tag for Free customers", () => {
    renderDialog({ isPro: false });

    const button = screen.getByRole("button", { name: /Send to accountant\s*PRO/i });
    expect(button).toBeVisible();
    expect(button.closest("form")).toHaveAttribute("action", "/api/billing/checkout");
  });

  it("points Pro customers without an accountant to settings", () => {
    renderDialog({ accountantEmail: undefined });

    expect(screen.getByText(/No accountant configured/i)).toBeVisible();
    expect(screen.getByRole("link", { name: "Configure accountant first" })).toHaveAttribute(
      "href",
      "/settings",
    );
  });

  it("requires confirmation before calling the action", async () => {
    const user = userEvent.setup();
    renderDialog();

    await user.click(screen.getByRole("button", { name: "Send to accountant" }));

    expect(mocks.sendManualExportToAccountant).not.toHaveBeenCalled();
    expect(screen.getByText("accountant@example.com")).toBeVisible();
  });

  it("sends the confirmed export and announces dispatch", async () => {
    const user = userEvent.setup();
    mocks.sendManualExportToAccountant.mockResolvedValueOnce({
      sentTo: "accountant@example.com",
    });
    renderDialog();

    await user.click(screen.getByRole("button", { name: "Send to accountant" }));
    await user.click(screen.getByRole("button", { name: "Send export" }));

    expect(mocks.sendManualExportToAccountant).toHaveBeenCalledWith({ month: "2026-01" });
    expect(await screen.findByRole("status")).toHaveTextContent(
      "Sent to accountant@example.com",
    );
    expect(screen.getByRole("img", { name: "Dispatched" })).toBeVisible();
  });

  it("keeps the addressee form after a send failure", async () => {
    const user = userEvent.setup();
    mocks.sendManualExportToAccountant.mockRejectedValueOnce(
      new Error("RESEND_SEND_FAILED"),
    );
    renderDialog();

    await user.click(screen.getByRole("button", { name: "Send to accountant" }));
    await user.click(screen.getByRole("button", { name: "Send export" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "The email provider could not send this export.",
    );
    expect(screen.getByText("accountant@example.com")).toBeVisible();
    expect(screen.getByRole("button", { name: "Send export" })).toBeEnabled();
  });
});
