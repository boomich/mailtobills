import { getTranslations } from "next-intl/server";

import { Button } from "@mailtobills/ui/components/button";
import { PostmarkMini } from "@mailtobills/ui/components/postmark";

import { signUpUrl } from "@/lib/links";

export async function FinalCta() {
  const t = await getTranslations("FinalCta");

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="relative overflow-hidden border-[1.5px] border-foreground bg-foreground px-6 py-14 text-background sm:px-12">
          <PostmarkMini
            className="absolute -top-10 -right-10 h-44 w-44 text-background/15"
          />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl font-extrabold tracking-[-0.01em] [font-stretch:110%] sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-[54ch] text-background/75">
              {t("description")}
            </p>
            <div className="mt-7">
              <Button
                asChild
                size="lg"
                className="border-background bg-background text-foreground hover:bg-background/90 max-sm:w-full max-sm:px-4 max-sm:text-[11px] max-sm:tracking-[0.06em]"
              >
                <a href={signUpUrl}>{t("cta")}</a>
              </Button>
            </div>
            <p className="mt-5 font-mono text-[11px] tracking-[0.12em] text-background/70 uppercase">
              {t("note")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
