import type { ReactNode } from "react";

import Link from "next/link";
import Image from "next/image";

import { Button, cn } from "@mailtobills/ui";

export type DashboardShellProps = {
  monthNavigator: ReactNode;
  children: ReactNode;
  className?: string;
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
}: DashboardShellProps) => (
  <div className={cn("min-h-screen bg-slate-100", className)}>
    <div className="flex min-h-screen">
      <aside className="hidden w-60 flex-col border-r border-slate-200 bg-slate-50 px-4 py-6 md:flex">
        <div className="mb-8 flex items-center gap-2 text-lg font-semibold text-slate-900">
          <Image
            src="/images/mailtobills-logo.png"
            alt="MailToBills"
            width={200}
            height={90}
          />
        </div>
        <nav className="flex flex-col gap-2">
          <NavLink href="/" label="Dashboard" active />
          <NavLink href="/reports" label="Reports" />
          <NavLink href="/settings" label="Settings" />
        </nav>
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
