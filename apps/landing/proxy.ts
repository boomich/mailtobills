import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { defaultLocale, supportedLocales } from "@mailtobills/i18n";

import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);
const landingPagePaths = new Set([
  "/",
  ...supportedLocales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => `/${locale}`),
]);

function stripLocale(pathname: string): string {
  return supportedLocales.reduce(
    (path, locale) =>
      path === `/${locale}` || path.startsWith(`/${locale}/`)
        ? path.slice(locale.length + 1) || "/"
        : path,
    pathname,
  );
}

// Design-lab specimens for the redesign (DESIGN.md); not linked from the site.
function isLabPath(pathname: string): boolean {
  const stripped = stripLocale(pathname);
  return stripped === "/lab" || stripped.startsWith("/lab/");
}

const legalPaths = new Set(["/terms", "/privacy"]);

function isLegalPath(pathname: string): boolean {
  return legalPaths.has(stripLocale(pathname));
}

export default function proxy(request: NextRequest) {
  const response = handleI18nRouting(request);
  const pathname = request.nextUrl.pathname;
  const isLandingPage =
    landingPagePaths.has(pathname) ||
    isLabPath(pathname) ||
    isLegalPath(pathname);

  if (isLandingPage || (response.status >= 300 && response.status < 400)) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.delete("link");

  return new NextResponse(response.body, {
    headers,
    status: 404,
    statusText: "Not Found",
  });
}

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
