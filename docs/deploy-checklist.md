# MailToBills Production Deploy Checklist

Scope: take the `redesign/carimbo` branch to production. Work through the
phases in order — each phase's items are safe to do before the next one
starts. Secrets are set by the founder only; this document never contains
secret values.

Companion documents:

- `docs/launch-validation-checklist.md` — the functional smoke tests to run
  against production at the end (Phase 8).
- `docs/operations-runbook.md` — day-2 operations (n8n restart, failure
  checks, feedback → Asana).
- `docs/gtm-plan.md` — what happens after this checklist is done.

---

## Phase 0 — Engineering gaps (code work, do before deploying)

Found during pre-deploy review; everything else in this checklist is
configuration, these are commits:

- [x] **Legal pages (launch blocker).** Shipped 2026-07-19: `/terms` and
      `/privacy` on the landing (MOD. J-01 / J-02 letter documents, both
      locales), linked from the footer and the signin legal line. The text
      is plain-language and verifiable against the codebase. **Founder
      still owes:** a read of both pages (they speak for the operator —
      confirm the "operated from Portugal" framing matches the real legal
      setup), and the `support@mailtobills.com` mailbox they reference
      (added to Phase 1).
- [x] **Gate the landing `/lab`.** Done 2026-07-19 — the landing lab
      layout now `notFound()`s outside development, same as the dashboard
      labs.
- [x] **Landing SEO files.** Done 2026-07-19: `sitemap.ts` (both locales,
      hreflang alternates), `robots.ts`, and a static 1200×630
      `opengraph-image.png` (the stamped-letter hero, screenshot of the
      real page) with alt text.
- [x] **Page analytics.** Done 2026-07-19: `@vercel/analytics` wired in
      both apps — cookieless, no consent banner needed, zero account setup
      beyond Vercel (which also means it reports nothing until the apps
      run on Vercel).
- [ ] **Event analytics + error tracking (founder decision).** The four
      GTM metrics (signup, first non-demo document, month sealed/
      dispatched, checkout) still have no event sink, and dashboard errors
      have no alerting beyond Convex function logs. Options: PostHog EU
      (free tier) for events, Sentry (free tier) for errors — both need
      founder-created accounts and keys. Per `docs/gtm-plan.md` §6 the
      Convex tables answer metrics 1–3 directly, so this must not delay
      the beta.
- [ ] **n8n workflow re-export.** The committed
      `workflows/n8n/ingest-mailtobills.json` has dev mailbox and folder IDs
      baked in. Re-export it against the production mailbox once Phase 3 is
      done, and commit the production copy (IDs are not secrets).
- [ ] **PT copy review.** All pt-PT strings were drafted by Claude; the
      founder is the native reader of record. Read both apps' pt-PT
      messages once, end to end, before public launch.

## Phase 1 — Accounts and domains

- [ ] Domain plan: `mailtobills.com` → landing, `app.mailtobills.com` →
      dashboard. These are load-bearing defaults in code
      (`https://app.mailtobills.com` is the fallback origin in
      `backend/convex/subscriptions.ts` and
      `backend/convex/lib/accountantExportDelivery.ts`).
- [ ] DNS: apex + `app` records to Vercel. **Keep the MX records** pointing
      at the mailbox host for `inbox@mailtobills.com` — moving nameservers
      to Vercel without carrying MX kills ingestion.
- [ ] Mailbox `inbox@mailtobills.com` live, with `Processed` and
      `NeedsReview` folders created (names must match the n8n workflow).
- [ ] Mailbox or alias `support@mailtobills.com` live — the legal pages
      and the GDPR contact promise depend on it being read.
- [ ] Resend: verify the `mailtobills.com` domain (SPF + DKIM records).
      Outbound sender is hardcoded as `exports@mailtobills.com`
      (`backend/convex/email/resendAdapter.ts`) — the domain must be
      verified or every Accountant Export send fails.
- [ ] Lemon Squeezy: store out of test mode; Pro product with the €9/month
      variant published. Note the store ID and variant ID for Phase 4.
- [ ] OAuth apps (optional but recommended — Google sign-in matches the
      "forward from Gmail" mental model): create production Google and
      GitHub OAuth apps. Callback URLs point at the **Convex HTTP Actions
      origin** (`https://<prod-deployment>.convex.site/api/auth/callback/google`
      and `.../github`), not at the dashboard.

## Phase 2 — Convex production deployment

From `backend/`:

- [ ] `npx convex deploy` — creates/updates the prod deployment. Note both
      URLs: the deployment URL (`https://<name>.convex.cloud`) and the HTTP
      Actions URL (`https://<name>.convex.site`).
- [ ] Run the `@convex-dev/auth` setup against the prod deployment so
      `JWT_PRIVATE_KEY` and `JWKS` exist there (the auth library refuses to
      mint sessions without them).
- [ ] Set env vars on the **prod** deployment (`npx convex env set <KEY>
      <value> --prod`):

      | Var | Value |
      | --- | --- |
      | `SITE_URL` | `https://app.mailtobills.com` |
      | `CONVEX_SITE_URL` | `https://app.mailtobills.com` |
      | `INGEST_SECRET` | fresh secret, mirrored to n8n in Phase 3 |
      | `EMAIL_PROVIDER` | `resend` |
      | `RESEND_API_KEY` | production key from Phase 1 |
      | `LEMONSQUEEZY_WEBHOOK_SECRET` | set when creating the webhook in Phase 4 |
      | `ASANA_PAT` | founder-minted personal access token |
      | `ASANA_PROJECT_GID` | `1214744338616034` (the "Mailtobills" Asana project) |
      | `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | if Google OAuth enabled |
      | `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | if GitHub OAuth enabled |

- [ ] Confirm the cron is registered on prod (Convex dashboard → Schedules):
      `send-scheduled-exports`, daily 07:00 UTC.

## Phase 3 — Ingestion (n8n on the VPS)

- [ ] n8n env: `INGEST_SECRET` (same value as Convex) and
      `CONVEX_INGEST_URL=https://<prod-deployment>.convex.site/ingest`.
- [ ] Swap the workflow's mailbox credentials and folder IDs to the
      production mailbox (see Phase 0 re-export item).
- [ ] Activate the workflow; send one email with a single PDF from a known
      address and watch it reach `Processed` + appear in Convex.
- [ ] Confirm the runbook's failure checks pass (`docs/operations-runbook.md`
      §Failure Checks).

## Phase 4 — Billing (Lemon Squeezy)

- [ ] Dashboard (Vercel) env: `LEMONSQUEEZY_API_KEY`,
      `LEMONSQUEEZY_STORE_ID`, `LEMONSQUEEZY_PRO_VARIANT_ID`, optional
      `LEMONSQUEEZY_PRO_PRICE_LABEL` (shown next to PRO gates).
- [ ] Webhook in the Lemon Squeezy dashboard →
      `https://<prod-deployment>.convex.site/webhooks/lemonsqueezy`,
      subscription events enabled, signing secret =
      `LEMONSQUEEZY_WEBHOOK_SECRET` on Convex.
- [ ] End-to-end test with a real card (refund after): checkout from the
      month view's PRO send button → redirect to `/settings?upgraded=1` →
      subscription active in the dashboard → billing portal link works
      (`/api/billing/portal`).
- [ ] Cancel/resume in the portal and confirm the webhook downgrades and
      restores the plan.

## Phase 5 — Dashboard on Vercel

- [ ] Project root `apps/dashboard`, monorepo-aware build (Turborepo).
- [ ] Env: `NEXT_PUBLIC_CONVEX_URL` (deployment URL),
      `NEXT_PUBLIC_CONVEX_HTTP_URL` (HTTP Actions URL), the four
      `LEMONSQUEEZY_*` vars from Phase 4.
- [ ] **Confirm `NEXT_PUBLIC_DEV_AUTH_EMAIL` / `NEXT_PUBLIC_DEV_AUTH_PASSWORD`
      are absent** (local QA only; the runbook forbids them in prod).
- [ ] Domain `app.mailtobills.com` attached; sign-in works (password +
      any enabled OAuth).
- [ ] `/lab`, `/lab/settings`, `/lab/dispatch` return 404 in production.

## Phase 6 — Landing on Vercel

- [ ] Project root `apps/landing`; env `NEXT_PUBLIC_DASHBOARD_URL=https://app.mailtobills.com`.
- [ ] Domain `mailtobills.com` attached (+ `www` redirect).
- [ ] Both locales render (`/en`, `/pt-PT`), sitemap + robots + OG image
      live (Phase 0), `/en/lab` returns 404 in production.
- [ ] Footer legal links resolve (Phase 0).

## Phase 7 — Feedback loop

- [ ] Submit feedback from the production counter bar → RECEBIDO receipt →
      task appears in the Asana "Mailtobills" project within a minute.
- [ ] Break-glass check documented: `feedback` rows with `forwardedAt`
      unset are unforwarded (runbook §Feedback → Asana).

## Phase 8 — Pre-flight QA (against production)

- [ ] Run all of `docs/launch-validation-checklist.md` on prod with a real
      account.
- [ ] The full journey once, as a customer would: sign up → copy Collection
      Address → forward a real supplier email from a phone → row appears →
      open PDF → month end: seal the ZIP, inspect contents → dispatch to a
      test "accountant" address → email arrives with ZIP + manifest, CSV
      opens cleanly in Excel (PT locale delimiter check — the accountant's
      first impression rides on it).
- [ ] Repeat the journey in pt-PT.
- [ ] e2e suites green against the prod build locally
      (`pnpm test:e2e`), including the axe and no-JS feel tests.
- [ ] Lighthouse pass on the landing (fonts are self-hosted via
      `next/font`; regressions here are config, not code).
- [ ] Delete the QA account's data (or keep it as the demo/ops account —
      decide and note it in the runbook).

## Launch-day notes

- DNS TTLs down to 300s the day before; raise after.
- First 14 days: check the `NeedsReview` folder **daily** (a silently
  dropped invoice during someone's first month kills trust permanently —
  this is the top operational risk in `docs/gtm-plan.md` §7).
- Rollback: Vercel = instant redeploy of previous build; Convex functions
  deploy atomically — schema changes have all been additive, keep it that
  way during launch month.
