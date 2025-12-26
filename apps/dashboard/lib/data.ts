import { InvoiceRow } from "./types";

export async function getInvoices(month: string): Promise<InvoiceRow[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Mock data for March 2025
  if (month === "2025-03") {
    return [
      {
        id: "1",
        originalFilename: "edp-mar2025.pdf",
        fromEmail: "noreply@edp.pt",
        subject: "Fatura EDP Março",
        receivedAt: new Date("2025-03-03").getTime(),
        createdAt: Date.now(),
        fileUrl: "#",
        amount: "€87.23",
        status: "reviewed",
      },
      {
        id: "2",
        originalFilename: "aws-mar2025.pdf",
        fromEmail: "billing@aws.amazon.com",
        subject: "AWS Invoice March",
        receivedAt: new Date("2025-03-07").getTime(),
        createdAt: Date.now(),
        fileUrl: "#",
        amount: "€142.10",
        status: "missing_vat",
      },
      {
        id: "3",
        originalFilename: "uber-mar2025.pdf",
        fromEmail: "receipts@uber.com",
        subject: "Your trip on Tuesday",
        receivedAt: new Date("2025-03-10").getTime(),
        createdAt: Date.now(),
        fileUrl: "#",
        amount: "€23.40",
        status: "reviewed",
      },
      {
        id: "4",
        originalFilename: "office-depot-mar2025.pdf",
        fromEmail: "orders@officedepot.com",
        subject: "Your order #12345",
        receivedAt: new Date("2025-03-12").getTime(),
        createdAt: Date.now(),
        fileUrl: "#",
        amount: "€45.90",
        status: "reviewed",
      },
      {
        id: "5",
        originalFilename: "digitalocean-mar2025.pdf",
        fromEmail: "billing@digitalocean.com",
        subject: "Invoice for March 2025",
        receivedAt: new Date("2025-03-15").getTime(),
        createdAt: Date.now(),
        fileUrl: "#",
        amount: "€78.99",
        status: "unreviewed",
      },
      {
        id: "6",
        originalFilename: "vodafone-jan2025.pdf",
        fromEmail: "faturas@vodafone.pt",
        subject: "Fatura Vodafone",
        receivedAt: new Date("2025-03-19").getTime(),
        createdAt: Date.now(),
        fileUrl: "#",
        amount: "€55.00",
        status: "reviewed",
      },
      {
        id: "7",
        originalFilename: "fiverr-mar2025.pdf",
        fromEmail: "billing@fiverr.com",
        subject: "Invoice #987654",
        receivedAt: new Date("2025-03-21").getTime(),
        createdAt: Date.now(),
        fileUrl: "#",
        amount: "€85.00",
        status: "missing_vat",
      },
      {
        id: "8",
        originalFilename: "aws-feb2025.pdf",
        fromEmail: "billing@aws.amazon.com",
        subject: "AWS Invoice February",
        receivedAt: new Date("2025-03-01").getTime(),
        createdAt: Date.now(),
        fileUrl: "#",
        amount: "€184.00",
        status: "reviewed",
      },
    ];
  }

  return [];
}
