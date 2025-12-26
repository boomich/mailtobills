export type InvoiceRow = {
  id: string;
  originalFilename: string;
  fromEmail?: string;
  subject?: string;
  receivedAt: number;
  createdAt: number;
  fileUrl?: string;
  // Properties added to support the mock UI
  amount?: string;
  status?: "reviewed" | "unreviewed" | "missing_vat";
};
