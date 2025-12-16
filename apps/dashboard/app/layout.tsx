import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Providers from "./providers";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

export const metadata: Metadata = {
  title: "MailToBills Dashboard",
  description: "Review and export your invoices from one place.",
};

const RootLayout = async ({ children }: { children: ReactNode }) => (
  <ConvexAuthNextjsServerProvider>
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  </ConvexAuthNextjsServerProvider>
);

export default RootLayout;
