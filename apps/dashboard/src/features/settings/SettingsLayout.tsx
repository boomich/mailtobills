import type { ReactNode } from "react";

export type SettingsLayoutProps = {
  nav: ReactNode;
  children: ReactNode;
};

export const SettingsLayout = ({ nav, children }: SettingsLayoutProps) => (
  <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
    <aside className="order-2 lg:order-1">{nav}</aside>
    <div className="order-1 space-y-6 lg:order-2">{children}</div>
  </div>
);
