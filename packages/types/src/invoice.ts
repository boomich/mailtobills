export interface Invoice {
  id: string;
  userId: string;
  originalFilename: string;
  fileUrl: string;
  fromEmail?: string;
  subject?: string;
  receivedAt: number;
  createdAt: number;
}
