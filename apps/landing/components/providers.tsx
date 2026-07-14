"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// DESIGN.md §9: the landing is light-only — a letter is paper.
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      forcedTheme="light"
      disableTransitionOnChange
      enableColorScheme
    >
      {children}
    </NextThemesProvider>
  )
}
