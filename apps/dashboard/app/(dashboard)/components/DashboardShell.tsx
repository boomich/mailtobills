"use client";

import { useState, type ReactNode } from "react";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  cn,
  Tooltip,
  IconButton,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@mailtobills/ui";

export type DashboardShellProps = {
  className?: string;
  children: ReactNode;
  monthNavigator?: ReactNode;
  headerTitle?: string;
  headerAction?: ReactNode;
};

const NavLink = ({
  href,
  label,
  active,
  comingSoon,
}: {
  href: string;
  label: string;
  active?: boolean;
  comingSoon?: boolean;
}) => {
  const linkContent = (
    <Link
      href={comingSoon ? "#" : href}
      onClick={(e) => {
        if (comingSoon) {
          e.preventDefault();
        }
      }}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium transition",
        active
          ? "bg-brand-600 text-white"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        comingSoon && "cursor-not-allowed opacity-75"
      )}
    >
      {label}
    </Link>
  );

  if (comingSoon) {
    return (
      <Tooltip position="right" content="Coming soon" className="w-full">
        {linkContent}
      </Tooltip>
    );
  }

  return linkContent;
};

export const DashboardShell = ({
  children,
  className,
  monthNavigator,
  headerTitle = "Dashboard",
  headerAction,
}: DashboardShellProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const isSettings = pathname.startsWith("/settings");
  const isDashboard = pathname === "/" || pathname.startsWith("/invoices");

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
              <div className="flex items-center mx-auto gap-2 text-lg font-semibold text-slate-900">
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
            <NavLink href="/" label="Dashboard" active={isDashboard} />
            <NavLink href="/reports" label="Reports" comingSoon />
            <NavLink href="/settings" label="Settings" active={isSettings} />
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
                {headerTitle}
              </div>
              <nav className="hidden items-center gap-4 text-sm text-slate-500 md:flex">
                <Tooltip position="bottom" content="Coming soon">
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="hover:text-slate-900 cursor-not-allowed opacity-75"
                  >
                    Reports
                  </Link>
                </Tooltip>
                <Link
                  href="/settings"
                  className={cn(
                    "hover:text-slate-900",
                    isSettings && "text-slate-900 font-medium"
                  )}
                >
                  Settings
                </Link>
              </nav>
            </div>
            {headerAction}
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
