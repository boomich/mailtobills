"use client";

import { useEffect, useState } from "react";

import { cn } from "@mailtobills/ui";
import { settingsSections } from "./settingsSections";

export const SettingsNav = () => {
  const [activeHash, setActiveHash] = useState<string>("#inbox");

  useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash || "#inbox");
    };

    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  return (
    <nav className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="space-y-1">
        {settingsSections.map((section) => {
          const isActive = activeHash === section.href;
          return (
            <a
              key={section.key}
              href={section.href}
              className={cn(
                "flex flex-col gap-1 rounded-md px-3 py-2 text-sm transition",
                isActive
                  ? "bg-brand-600 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <span className="font-medium">{section.title}</span>
              {section.description ? (
                <span
                  className={cn(
                    "text-xs",
                    isActive ? "text-slate-100/80" : "text-slate-500"
                  )}
                >
                  {section.description}
                </span>
              ) : null}
            </a>
          );
        })}
      </div>
    </nav>
  );
};
