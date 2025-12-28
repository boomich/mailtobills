import * as React from "react";

export function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto py-8 sm:px-4 flex flex-col gap-8">
      {children}
    </div>
  );
}
