"use client";

import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

import Link from "next/link";
import Image from "next/image";

import {
  cn,
  Button,
  Tooltip,
  IconButton,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@mailtobills/ui";

export type DashboardShellProps = {
  className?: string;
  children: ReactNode;
  monthNavigator?: ReactNode;
};

const NavLink = ({
  href,
  label,
  comingSoon,
}: {
  href: string;
  label: string;
  comingSoon?: boolean;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

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
        isActive
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
}: DashboardShellProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

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
            <NavLink href="/" label="Dashboard" />
            <NavLink href="/reports" label="Reports" comingSoon />
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
                {pathname === "/settings" ? "Settings" : "Dashboard"}
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
                <Link href="/settings" className={cn("hover:text-slate-900", pathname === "/settings" && "text-slate-900 font-medium")}>
                  Settings
                </Link>
              </nav>
            </div>
            {/* Action buttons could be dynamic based on page, but for now generic export or hidden on settings */}
            {pathname !== "/settings" && <Button>Export</Button>}
             {/* For settings we might want a Logout here as per mock "Settings | Logout" */}
             {pathname === "/settings" && (
                 <div className="text-sm text-slate-500">
                     <span className="font-medium text-slate-900">Settings</span> | <Link href="/signout" className="hover:text-slate-900">Logout</Link>
                 </div>
             )}
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
