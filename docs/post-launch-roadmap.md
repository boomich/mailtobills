# MailToBills Post-Launch Roadmap

Status: v1 (2026-07-19). Six specs for after the GTM phases complete
(`docs/gtm-plan.md` Phase D — first paying customers, soft public launch).
Sequenced by **trigger**, not by date; only the Year Export is calendar-bound.

The invariant across every spec — the moat sentence: **MailToBills never
gets smarter about your documents. It gets more places, more visible, and
more ceremonial.** Any feature that requires reading document contents is
out, permanently. When a spec below touches `CONTEXT.md` or `DESIGN.md`,
it says so — those documents get amended first, never silently.

Sequencing overview:

| # | Spec | Trigger |
| --- | --- | --- |
| 1 | Make failure visible | First paying customers exist |
| 2 | Typed labels | With/right after #1 |
| 3 | The Year Export | Calendar: build Jan–Feb, ship before IRS season (March) |
| 4 | The accountant arc | Step 1 at ~10 paying customers; later steps gated below |
| 5 | Capture beyond email | After #1 (shares the hardened arrival contract) |
| 6 | Spain | PT motion proven: ~20 paying + accountant referrals happening |

---

## 1. Make failure visible — AVISO DE RECEÇÃO

**Problem.** A rejected forward lands in the `NeedsReview` mailbox folder
where only the operator sees it. The customer believes it was collected.
This is the top risk in the GTM risk table: one silently dropped invoice
during someone's first month kills trust permanently. Today the product's
honesty is real but invisible at the exact moment it matters.

**Shape.**

- **Part A — the bounce (product).** Every *rejected* forward triggers a
  return notice to the sender: what arrived, why it was not collected, and
  what fixes it. The two reasons that matter map to the existing ingest
  codes: `NO_ACCEPTABLE_PDFS` → "no PDF was attached"; `UNKNOWN_SENDER` →
  "this address is not one of your Forwarding Addresses" with a link to
  settings (the fix path is Additional Forwarding Addresses — already on
  the Pro rate card, form exists at
  `apps/dashboard/components/forwarding-addresses-form.tsx`).
  Accepted forwards get **no** email — the dashboard row is the receipt —
  except the customer's very first collected document, which gets a
  one-time confirmation (the activation moment from the launch plan).
- **Part B — rejected forwards in the dashboard.** A new additive
  `rejectedForwards` table (sender, subject, receivedAt, reason). Surface
  as a quiet strip on the month view — a DEVOLVIDO register, only when
  non-empty. This amends `CONTEXT.md` ("Rejected Forwarded Emails are not
  shown in the Customer dashboard in the MVP") — deliberately, post-MVP.
- **Part C — first-party inbound (infra).** Replace Outlook-polling n8n
  with provider inbound email (evaluate: Resend Inbound, Postmark Inbound,
  Cloudflare Email Workers). The Convex `/ingest` contract with
  `INGEST_SECRET` stays; this is a transport swap. Keep n8n running in
  parallel for one full month as shadow before cutover.

**Brand.** The bounce is an **AVISO DE RECEÇÃO** — the postal
return-receipt form. Plain-text email set in the world's register, honest
and specific. DESIGN.md gains the DEVOLVIDO mark if Part B introduces one
(ink, not violet — a devolution is not a certification).

**Marketing sentence unlocked:** "Never silently drops a document."

**Metrics.** Rejection rate per customer; median time from bounce to
successful re-forward.

---

## 2. Typed labels — metadata the customer writes, never guessed

**Problem.** The manifest carries only what email metadata provides.
Accountants ask "what is this for?" — and the Dext-class answer (OCR the
contents) is forbidden by the product's core promise.

**Shape.**

- **Data.** Additive fields on `expenseDocuments`: `label` (≤60 chars) and
  `note` (≤500 chars), both optional, both customer-typed. Manifest CSV
  gains `label` and `note` columns (update
  `backend/convex/lib/accountantExport.ts`).
- **UX.** Typed in the document detail panel — Courier, data-on-form, on a
  ruled line like every other typed value. The label shows in the manifest
  register table as a small chip-less Courier string (no colored tags —
  this is a form, not Notion). Label autocomplete offers only the
  customer's *own previous labels* — their vocabulary, never ours.
- **Law (DESIGN.md + CONTEXT.md amendment).** *Metadata is typed by the
  customer, never machine-suggested from document contents. There is no
  reading; there is only the customer's own filing vocabulary.*

**Scope cuts.** No categories taxonomy, no bulk-labeling, no filtering UI
in v1 — just capture and export. Filtering by label comes only if beta
customers ask.

**Metrics.** % of documents labeled; accountant interview feedback on the
new columns.

---

## 3. The Year Export — ARQUIVO ANUAL

**Problem/opportunity.** IRS/IES season (March–June in PT) is the
month-end ritual at annual scale, and the year register is already the
dashboard's spine. Nothing serves the "hand your accountant the whole
year" moment — and it is the strongest seasonal marketing hook available
to the ICP.

**Shape.**

- **Product.** One ZIP per calendar year: a folder per Collection Month
  (each containing that month's primary PDFs + monthly `manifest.csv`),
  plus a top-level `manifest.csv` of every row with a `month` column.
  v2 (not v1): a composed cover-sheet PDF — the year register printed with
  counts and seals. v1 keeps it CSV-only to avoid a PDF-generation
  dependency.
- **UX.** The affordance lives on the year register itself — seal the
  year. The ritual is the seal dialog at annual scale: twelve-month
  manifest summary, the seal press, the download. Download is Free
  (consistent with the monthly ZIP); direct-send of the year is Pro.
- **Engineering risk (the real work).** Twelve months of PDFs can exceed
  what a synchronous Convex action comfortably assembles. Plan for an
  async path: a scheduled action builds the archive into storage, then the
  customer gets a signed URL (and optionally an email when ready). Design
  the seal ritual to cover the wait honestly — "sealing the year" is
  allowed to take a minute; the dialog shows month-by-month progress like
  a register being stamped.

**Timing.** Build January–February 2027; live before March. Pair with the
GTM seasonal push (SEO page: "entregar as faturas do ano ao
contabilista").

---

## 4. The accountant arc — channel becomes customer

The big bet, in three gated steps. The constraint throughout: accountants
get **read and receive**, never manage — customer accounts stay
single-person (`CONTEXT.md` Customer definition is untouched), and every
new visibility is customer-consented.

**Step 1 — the counter window (trigger: ~10 paying customers).**
Each dispatch also publishes to a stable, token-protected, no-login URL
per customer↔accountant pair: a list of that customer's sealed months
with download links, set in the CARIMBO world (the other side of the
counter). The dispatch email links to it alongside the attachment.
Engineering: additive `handoverLinks` table (unguessable token, revocable
from settings); a public Convex HTTP route serving metadata + signed
download URLs. Consent: creating the link is an explicit customer action
in settings.

**Step 2 — the accountant view (trigger: ≥3 accountants each receiving
from ≥3 customers).** An accountant identity (email + magic link — this
deliberately amends the MVP's "accountants do not sign in") seeing one
board: their MailToBills clients × month status (sealed / pending), plus
a nudge button that sends a polite chase email in the world's register.
Read-only + nudge. No document management, no workspace semantics.

**Step 3 — the Contabilista plan (trigger: step 2 shows weekly active
accountants).** Pricing per active client (order of €2/client/month,
validated in step-2 interviews), accountant-initiated client invites —
the referral loop becomes the product, and revenue flips B2B. At this
point the accountant pitch from the GTM plan ("one clean ZIP instead of
40 loose emails") upgrades to "one board instead of 40 folders."

**Risks.** GDPR: an accountant seeing month status is processing the
customer's data — consent toggle per customer, plain wording, revocable.
Scope: resist every "can the accountant upload/correct/manage" request
until step 3 proves itself.

---

## 5. Capture beyond email — the share sheet

**Problem.** The wedge is "the moment a document arrives" — but documents
also arrive on WhatsApp (enormous in PT), as paper, and as downloads. All
of those currently require a detour through email.

**Shape.**

- **PWA share target.** The dashboard becomes installable (manifest +
  `share_target`); sharing a PDF from any app on the phone lands it as a
  Collected Expense Document in the current month — with the stamp thunk
  on the phone screen, which is where the delight moment lives.
- **Direct upload path.** A new `ingestDirectUpload` mutation: same
  dedupe, same stamping, same Collection Month rules as email ingest —
  audit `createDemoExpenseDocument` (the existing non-email write path)
  for reuse. Desktop gets drag-and-drop onto the month sheet for free
  from the same mutation.
- **Paper.** A photo is filed as filed — accept images as primary
  attachments (amends `CONTEXT.md`'s PDF-only Attachment Set; accountants
  handle JPGs fine, and the manifest marks the type). Explicitly NO
  OCR, no auto-crop cleverness, no "scanning" language — it is a
  photograph of a receipt, certified and filed.

**Ordering note.** After spec 1: direct upload should land on the
hardened arrival contract (receipts/rejections), not beside the fragile
one.

**Metrics.** Share of documents arriving via non-email paths; mobile
activation rate change.

---

## 6. Spain — the second counter

**Trigger.** The PT motion is proven: ~20 paying customers and the
accountant channel demonstrably referring.

**Shape.**

- **Product.** `es-ES` as a third locale: one entry in
  `packages/i18n/src/locales.ts`, messages files in both apps, date/number
  locale mapping, e2e locale matrix extended. The **graphic layer stays
  postal Portuguese** (DESIGN.md §3 — brand vernacular like PAR AVION);
  happy accident: RECEBIDO reads one letter from the Spanish RECIBIDO and
  needs no explanation.
- **Copy.** Not a translation — an adaptation: autónomo/gestoría
  vocabulary, and the wedge reframed for Spain (the gestoría wants the
  PDFs; foreign SaaS invoices live outside the domestic e-invoicing
  rails). Requires a native-Spanish review pass, same standard as the PT
  founder read.
- **GTM.** Clone the PT playbook: gestoría as channel, concierge-style
  first ten, communities for autónomos. No paid ads, same discipline.

**Scope cut.** No new features for Spain — the product travels as-is.
If Spain demands a feature PT didn't, that's a signal to interrogate, not
a backlog item.
