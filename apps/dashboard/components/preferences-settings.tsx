"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Label } from "@mailtobills/ui/components/label";
import { cn } from "@mailtobills/ui/lib/utils";
import { LocaleSelect } from "@/components/locale-select";

export function PreferencesSettings() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Settings.preferences");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedTheme = mounted ? (theme ?? "light") : "light";
  const themeOptions = [
    { value: "light", label: t("light"), icon: Sun },
    { value: "dark", label: t("dark"), icon: Moon },
    { value: "system", label: t("system"), icon: Monitor },
  ] as const;

  return (
    <div className="space-y-5">
      <div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-start">
        <div className="space-y-1">
          <Label>{t("theme")}</Label>
          <p className="text-muted-foreground text-sm">
            {t("themeDescription")}
          </p>
        </div>
        <div
          role="radiogroup"
          aria-label={t("theme")}
          className="bg-muted/40 inline-flex flex-wrap items-center gap-1 rounded-lg border p-1"
        >
          {themeOptions.map(({ value, label, icon: Icon }) => {
            const isSelected = selectedTheme === value;

            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setTheme(value)}
                className={cn(
                  "focus-visible:ring-ring/50 inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-[11px] font-medium tracking-[0.08em] uppercase transition-colors outline-none focus-visible:ring-[3px]",
                  isSelected
                    ? "bg-background text-foreground border shadow-xs"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-3.5" />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-start">
        <div className="space-y-1">
          <Label htmlFor="language">{t("language")}</Label>
          <p className="text-muted-foreground text-sm">
            {t("languageDescription")}
          </p>
        </div>
        <div className="space-y-2">
          <div className="max-w-xs">
            <LocaleSelect
              id="language"
              label={t("language")}
              hideLabel
              showFeedback
            />
          </div>
          <p className="text-muted-foreground text-sm">{t("languageHelp")}</p>
        </div>
      </div>
    </div>
  );
}
