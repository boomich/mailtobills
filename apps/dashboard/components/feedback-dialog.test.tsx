import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import { beforeEach, describe, expect, it, vi } from "vitest";

import messages from "@/messages/en/common.json";
import { FeedbackDialog } from "./feedback-dialog";

const mocks = vi.hoisted(() => ({
  submitFeedback: vi.fn(),
}));

vi.mock("@/lib/convexClient", () => ({
  api: {
    feedback: {
      submit: "feedback:submit",
    },
  },
}));

vi.mock("convex/react", () => ({
  useMutation: vi.fn(() => mocks.submitFeedback),
}));

function renderDialog() {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <FeedbackDialog />
    </NextIntlClientProvider>,
  );
}

describe("FeedbackDialog", () => {
  beforeEach(() => {
    mocks.submitFeedback.mockReset();
  });

  it("opens from the counter-bar trigger and disables an empty letter", async () => {
    const user = userEvent.setup();
    renderDialog();

    await user.click(screen.getByRole("button", { name: "Feedback" }));

    expect(screen.getByRole("heading", { name: "A letter to MailToBills" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Send" })).toBeDisabled();

    await user.type(screen.getByLabelText("Your letter"), "   ");

    expect(screen.getByRole("button", { name: "Send" })).toBeDisabled();
  });

  it("submits a trimmed letter and shows the stamped receipt", async () => {
    const user = userEvent.setup();
    mocks.submitFeedback.mockResolvedValueOnce("feedback-id");
    renderDialog();

    await user.click(screen.getByRole("button", { name: "Feedback" }));
    await user.type(screen.getByLabelText("Your letter"), "  This is useful.  ");
    await user.click(screen.getByRole("button", { name: "Send" }));

    expect(mocks.submitFeedback).toHaveBeenCalledWith({
      message: "This is useful.",
    });
    expect(await screen.findByRole("status")).toHaveTextContent(
      "Received — thank you.",
    );
    expect(screen.getByText("RECEBIDO")).toBeVisible();
  });

  it("keeps the letter available after a submission failure", async () => {
    const user = userEvent.setup();
    mocks.submitFeedback.mockRejectedValueOnce(new Error("NETWORK_ERROR"));
    renderDialog();

    await user.click(screen.getByRole("button", { name: "Feedback" }));
    const letter = screen.getByLabelText("Your letter");
    await user.type(letter, "Please add a compact view.");
    await user.click(screen.getByRole("button", { name: "Send" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Your letter could not be sent. Please try again.",
    );
    expect(letter).toHaveValue("Please add a compact view.");
    expect(screen.getByRole("button", { name: "Send" })).toBeEnabled();
  });
});
