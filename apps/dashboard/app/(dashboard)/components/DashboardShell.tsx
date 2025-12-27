"use client";

import { useState, type ReactNode } from "react";

import Link from "next/link";
import Image from "next/image";

import {
  cn,
  Button,
  IconButton,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@mailtobills/ui";

export type DashboardShellProps = {
  className?: string;
  children: ReactNode;
  monthNavigator: ReactNode;
};

const NavLink = ({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active?: boolean;
}) => (
  <Link
    href={href}
    className={cn(
      "rounded-md px-3 py-2 text-sm font-medium transition",
      active
        ? "bg-brand-600 text-white"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    )}
  >
    {label}
  </Link>
);

export const DashboardShell = ({
  children,
  className,
  monthNavigator,
}: DashboardShellProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={cn("min-h-screen bg-slate-100", className)}>
      <div className="flex min-h-screen">
        <aside
          className={cn(
            "hidden flex-col border-r border-slate-200 bg-slate-50 transition-all duration-300 md:flex",
            isSidebarOpen ? "w-60" : "w-16"
          )}
        >
          <div
            className={cn(
              "flex items-center border-b border-slate-200 py-4 transition-all",
              isSidebarOpen ? "px-4" : "justify-center px-0"
            )}
          >
            {isSidebarOpen && (
              <div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Image
                  src="/images/mailtobills-logo.png"
                  alt="MailToBills"
                  width={170}
                  height={78}
                />
              </div>
            )}
          </div>
          <nav
            className={cn(
              "flex flex-1 flex-col gap-2 px-4 py-6 transition-opacity",
              !isSidebarOpen && "opacity-0 pointer-events-none"
            )}
          >
            <NavLink href="/" label="Dashboard" active />
            <NavLink href="/reports" label="Reports" />
            <NavLink href="/settings" label="Settings" />
          </nav>
          <div
            className={cn(
              "flex items-center border-t border-slate-200 py-4 transition-all",
              isSidebarOpen ? "justify-end px-4" : "justify-center px-0"
            )}
          >
            <IconButton
              icon={isSidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              className="shrink-0"
            />
          </div>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
            <div className="flex items-center gap-6">
              <div className="text-lg font-semibold text-slate-900">
                Dashboard
              </div>
              <nav className="hidden items-center gap-4 text-sm text-slate-500 md:flex">
                <Link href="/reports" className="hover:text-slate-900">
                  Reports
                </Link>
                <Link href="/settings" className="hover:text-slate-900">
                  Settings
                </Link>
              </nav>
            </div>
            <Button>Export</Button>
          </header>

          <main className="flex-1 space-y-6 px-6 py-6">
            {monthNavigator}
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
