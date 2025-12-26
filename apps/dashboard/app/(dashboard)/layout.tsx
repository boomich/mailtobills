import * as React from "react";
import { DashboardShell } from "../../components/dashboard/DashboardShell";
import { Button } from "@mailtobills/ui";
import { Download } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell
      headerAction={
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      }
    >
      {children}
    </DashboardShell>
  );
}
