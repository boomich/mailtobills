import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Archivo, Courier_Prime, Public_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import { isLocale, supportedLocales, type Locale } from "@mailtobills/i18n";
import "@mailtobills/ui/globals.css";

import { Providers } from "@/components/providers";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public",
});

const courier = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier",
});

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale: requestedLocale } = await params;

  if (!isLocale(requestedLocale)) {
    notFound();
  }

  const locale: Locale = requestedLocale;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const canonical = locale === "en" ? "/" : `/${locale}`;

  return {
    title: {
      default: t("title"),
      template: `%s · MailToBills`,
    },
    description: t("description"),
    alternates: {
      canonical,
      languages: {
        en: "/",
        "pt-PT": "/pt-PT",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("openGraphDescription"),
      siteName: "MailToBills",
      locale: locale === "pt-PT" ? "pt_PT" : "en_GB",
      type: "website",
    },
  };
}

export const viewport: Viewport = {
  // Landing is light-only (DESIGN.md §9): paper in both schemes.
  themeColor: "#f4f1e8",
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: requestedLocale } = await params;

  if (!isLocale(requestedLocale)) {
    notFound();
  }

  const locale: Locale = requestedLocale;
  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${archivo.variable} ${publicSans.variable} ${courier.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
