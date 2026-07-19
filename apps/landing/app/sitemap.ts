import type { MetadataRoute } from "next";

const BASE = "https://mailtobills.com";

/* en is unprefixed (canonical), pt-PT is prefixed — mirrors the proxy and
   the alternates in app/[locale]/layout.tsx. */
const routes = ["/", "/terms", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) => {
    const enPath = route === "/" ? "/" : route;
    const ptPath = route === "/" ? "/pt-PT" : `/pt-PT${route}`;
    const alternates = {
      languages: {
        en: `${BASE}${enPath}`,
        "pt-PT": `${BASE}${ptPath}`,
      },
    };

    return [
      { url: `${BASE}${enPath}`, alternates },
      { url: `${BASE}${ptPath}`, alternates },
    ];
  });
}
