"use client";

import { useState } from "react";
import { useMutation } from "convex/react";

import Image from "next/image";

import { api } from "../../../lib/convexClient";
import { Button } from "@mailtobills/ui";

export const OnboardingEmptyState = () => {
  const createInvoice = useMutation(api.invoices.createInvoice);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const inboxAddress = "inbox@mailtobills.com";
  const onboardingSteps = [
    "Find an invoice in your email",
    `Forward it to ${inboxAddress}`,
    "See it appear here instantly!",
  ];

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
        fileUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
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

  return (
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
            Forward your invoices to the address below to see them organize
            automatically.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-inner">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                Your MailToBills email
              </p>
              <p className="truncate text-lg font-semibold text-slate-900">
                {inboxAddress}
              </p>
            </div>
            <Button onClick={handleCopyAddress} className="w-full sm:w-auto">
              {isCopied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>

        <ul className="space-y-4">
          {onboardingSteps.map((text, index) => (
            <li key={text} className="flex items-center gap-3">
              <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-700">
                {index + 1}
              </span>
              <span className="text-sm font-medium text-slate-800">{text}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Button
            onClick={handleSendTestInvoice}
            disabled={isSendingTest}
            className="w-full sm:w-auto whitespace-nowrap"
          >
            {isSendingTest ? "Sending..." : "Send a Test Invoice"}
          </Button>
          <p className="text-sm text-slate-600">
            No invoices yet. Start forwarding your bills to organize them
            automatically.
          </p>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="relative h-80 w-full max-w-md overflow-hidden rounded-2xl bg-linear-to-b from-slate-50 to-slate-100 shadow-inner">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/images/mailtobills-envelope.png"
              alt="Invoice"
              width={300}
              height={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
