/* Interim settings wrapper: the counter bar (shell layout) already carries
   brand, Collection Address, and navigation — the old sidebar-era header is
   gone. The full MOD. C-02 settings recomposition replaces this page next. */
export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex min-w-0 flex-1 flex-col gap-4">{children}</div>;
}
