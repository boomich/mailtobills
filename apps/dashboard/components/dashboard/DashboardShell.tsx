import * as React from "react";
import Link from "next/link";
import { cn } from "@mailtobills/ui";
import { LayoutDashboard, FileText, Settings, LogOut } from "lucide-react";

interface DashboardShellProps {
  children: React.ReactNode;
  headerAction?: React.ReactNode;
}

export function DashboardShell({ children, headerAction }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-white md:flex">
        <div className="flex h-16 items-center border-b px-6">
          <span className="text-xl font-bold text-slate-900">MailToBills</span>
        </div>
        <nav className="flex-1 space-y-1 px-4 py-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/reports"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            <FileText className="h-4 w-4" />
            Reports
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
        <div className="border-t p-4">
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col md:pl-64">
        <header className="flex h-16 items-center justify-between border-b bg-white px-8">
          <div className="flex items-center gap-4">
             {/* Header content like breadcrumbs could go here */}
          </div>
          <div className="flex items-center gap-4">
            {headerAction}
          </div>
        </header>
        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
