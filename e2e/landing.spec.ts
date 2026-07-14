import { expect, test } from "@playwright/test";

test("landing page loads and sign-in CTA points to the dashboard", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /stop digging through your inbox for invoices/i,
    }),
  ).toBeVisible();
  await expect(page).toHaveTitle(
    "MailToBills — Stop digging through your inbox for invoices",
  );
  await expect(
    page.locator('link[rel="alternate"][hreflang="pt-PT"]'),
  ).toHaveAttribute("href", /\/pt-PT$/);

  const signIn = page.getByRole("link", { name: /sign in/i }).first();
  await expect(signIn).toHaveAttribute("href", /localhost:3000|\/signin/);
});

test("language navigation keeps English at root and exposes Portuguese", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.getByRole("link", { name: "PT", exact: true }).click();

  await expect(page).toHaveURL(/\/pt-PT\/?$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-PT");
  await expect(
    page.getByRole("heading", {
      name: /pare de procurar faturas na caixa de entrada/i,
    }),
  ).toBeVisible();
  await expect(page).toHaveTitle(
    "MailToBills — Pare de procurar faturas na caixa de entrada",
  );

  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("skip link moves keyboard focus to the main content", async ({ page }) => {
  await page.goto("/");

  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await page.keyboard.press("Tab");
  await expect(skipLink).toBeFocused();

  await skipLink.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

// DESIGN.md §11 feel regression: content is never invisible before its
// entrance animation — the hero must render fully without JavaScript.
test.describe("no blank first paint", () => {
  test.use({ javaScriptEnabled: false });

  test("hero headline and CTAs render without JavaScript", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        name: /stop digging through your inbox for invoices/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /start collecting free/i }).first(),
    ).toBeVisible();
  });
});

for (const { cta, path, width } of [
  { cta: "Get started", path: "/", width: 360 },
  { cta: "Get started", path: "/", width: 375 },
  { cta: "Começar", path: "/pt-PT", width: 768 },
]) {
  test(`header fits ${width}px viewport on ${path}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(path);

    await expect(
      page.getByRole("link", { name: cta, exact: true }),
    ).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
}
