# MailToBills Go-To-Market Plan

Status: v1 (2026-07-19). This plan supersedes `docs/launch-plan.md` §§3–5
where they conflict — that document predates the CARIMBO redesign and
several of its assumptions no longer hold:

| launch-plan.md said | Reality now |
| --- | --- |
| Don't build billing; use a manual Stripe Payment Link | Lemon Squeezy checkout, webhook, portal, and PRO gates are built and tested |
| Free trial = first month free | **Free is unlimited forever** (CONTEXT.md); Pro sells convenience, not access |
| Landing needs restructuring | The One Letter landing shipped (pain-led hero, export section, honesty block, tariff table, FAQ) |
| No second language | pt-PT shipped across both apps |
| No rebrand/redesign | CARIMBO shipped; the stamp world is now a marketing asset |

What still stands from launch-plan.md and is incorporated here: the ICP,
the e-Fatura objection and foreign-SaaS wedge, the accountant-as-channel
insight, the concierge beta motion, and the four metrics.

---

## 1. Positioning

**One-liner (EN):**

> Forward your expense emails as they arrive. At month end, send your
> accountant one clean ZIP — instead of digging through your inbox.

**One-liner (PT):**

> Reencaminhe as faturas por email assim que chegam. No fim do mês, entregue
> ao contabilista um ZIP organizado — em vez de escavar a caixa de correio.

**The differentiator is honesty, worn on the sleeve.** No OCR, no AI
guessing VAT, no accountant-side adoption. The stamp is the brand's way of
saying it: *a stamp does not read your document; it certifies it and files
it.* Dext/Hubdoc/AutoEntry cost €20–50/month and demand behavior change
from the accountant; MailToBills is the dumb, reliable, cheap option that
requires zero change from anyone except two seconds of forwarding.

**The wedge (PT market):** e-Fatura already captures Portuguese suppliers —
so lead with what it cannot capture: **foreign/SaaS invoices** (Google,
OpenAI, Adobe, AWS, Figma — every dev, designer and agency has 5–20 of
these) plus the fact that contabilistas still want **the actual PDFs**, not
e-Fatura line items.

## 2. ICP and channels

**Beachhead (be narrow on purpose):** Portuguese freelancer or unipessoal
Lda owner who works with an external contabilista, receives a meaningful
share of expenses by email as PDFs (especially foreign SaaS), and currently
does the month-end inbox dig personally. Non-PT freelancers work too — the
mechanism is universal and the product is bilingual — but the first
customers come from where the founder has network and domain knowledge.

**Channel map, in order of leverage:**

1. **The accountant.** One contabilista serves 50–300 clients and suffers
   the document chase monthly. They never have to log in — they just start
   receiving a clean ZIP + CSV instead of 40 loose emails, which makes the
   pitch to them frictionless: *"Tell your document-chasing clients to use
   this."* Pro's direct-send strengthens this: the accountant gets a
   consistent, predictable email from the system every month, customer
   CC'd. One warm accountant = 10–50 warm leads.
2. **Founder's own network** — the concierge beta pool (Phase B below).
3. **PT freelancer communities** — Facebook groups (recibos verdes /
   trabalhadores independentes), LinkedIn founding-story post in
   Portuguese. The pt-PT product makes this channel fully credible now.
4. **Build-in-public** — the CARIMBO brand is unusually showable: the
   stamp thunk, the seal ritual, the year register make excellent short
   clips for X/Twitter and LinkedIn. This channel sells the craft story to
   indie/international customers.
5. **SEO seed pages** (post-launch, low effort): "como organizar faturas
   para o contabilista" / "organize invoices for your accountant" — tiny
   volume, perfect intent, weak competition.

Product Hunt: optional, later — it brings tourists, not Portuguese
freelancers with accountants.

## 3. Pricing and packaging (as shipped)

- **Free — €0, forever, unlimited collection.** Collection Address,
  monthly dossiers, manual ZIP + manifest download. The landing promises
  unlimited free collection; that promise is binding (DESIGN.md §10.6).
- **Pro — €9/month** ("early-bird price" on the rate card): direct send to
  the accountant, Export Schedule (automatic monthly delivery, daily cron
  at 07:00 UTC), additional verified forwarding addresses.

**The conversion story follows from Free being truly unlimited:** nobody
pays for access — they pay when they want **the handover to run itself**.
The natural trigger moments, all already wired in-product:

- The PRO-tagged "Send to accountant" button in every month view → checkout.
- The schedule upsell line under the export actions.
- The `#plan` anchors in settings.

**Deliberately not now:** annual plan machinery, metered tiers, per-seat
anything. The first 20 customers should all be on one €9 plan so feedback
is comparable. Revisit an annual variant (€90/yr) after ~10 paying
customers, as a retention lever rather than an acquisition one.

## 4. Launch sequence

Phases, not weeks — each phase has an exit condition, and the calendar
should bend around the **month boundary**, because month end is when the
product proves itself.

### Phase A — Production (exit: deploy checklist done)

Run `docs/deploy-checklist.md` top to bottom. Nothing else in this plan
starts until Phase 8 of that checklist passes.

### Phase B — Concierge beta (exit: 5–10 activated users mid-month)

Recruit 5–10 nameable humans matching the ICP — ideally including clients
of the founder's own accountant (which simultaneously tests the accountant
channel). Not a public launch; no signup wall needed since Free is free.

- Onboard each one **live** (15-minute call): watch them copy the
  Collection Address and forward their first real email from their phone.
  Every hesitation is a product note; file it through the in-product
  feedback letter so it lands in Asana with the rest.
- State the model up front: *"Free forever for collecting; €9/month if you
  later want it delivered to your contabilista automatically."* Honest
  framing, and it plants the Pro seed on day one.
- Operational vigilance: `NeedsReview` folder checked daily. A silently
  dropped invoice during someone's first month is fatal to trust.
- Mid-month nudge to anyone who went quiet: "forwarded anything this
  week?" — the habit is the product.

### Phase C — The month-end moment (exit: ≥5 sealed months, ≥2 accountant interviews)

When the Collection Month closes, prompt every beta user to run the ritual:
seal the ZIP or — better — dispatch it to their real accountant.

- **Interview the accountants** who received exports, even 10 minutes: is
  the ZIP/manifest format right? Does the CSV open cleanly in their Excel?
  Would they recommend it to other document-chasing clients? This is
  product validation and channel development in one call.
- Fix the top 3 frictions only. Resist the backlog; the feedback letters
  in Asana are the backlog.

### Phase D — Convert and open up (exit: first paying customer, then public)

- **The ask**, to every beta user who sealed a month: *"You've done a
  month end with it. €9/month makes it automatic — the export mails
  itself."* Expect 2–4 of 8 to convert; anyone who dispatched to a real
  accountant has already felt the value. First payment = first proof.
- **Accountant referral motion:** offer the 1–2 friendliest contabilistas
  a simple thank-you deal for mentioning it to clients.
- **Public soft launch, only after first revenue:** PT communities +
  LinkedIn founding story (PT), build-in-public thread showing the stamp
  world (EN), SEO seed pages. Public launch is an amplifier, not a
  validator — the validation already happened in Phases B–D.

## 5. Messaging kit

Ready-to-use blocks; keep the honest register everywhere.

**Elevator (PT, for freelancers):**
> Sabes aquela hora no fim do mês à procura de faturas no email para
> mandar ao contabilista? O MailToBills dá-te um endereço próprio —
> reencaminhas as faturas quando chegam e no fim do mês está tudo num ZIP
> organizado, com índice. Sem OCR, sem IA a adivinhar IVA: os teus PDFs,
> arrumados. Grátis para organizar; €9/mês se quiseres que a entrega ao
> contabilista seja automática.

**The accountant pitch (PT):**
> Em vez de 40 emails soltos de cada cliente, recebes um ZIP por mês com
> os PDFs e um CSV de índice. O cliente só reencaminha emails — tu não
> mudas nada.

**Objection handling:**

- *"O e-Fatura já faz isso."* — Para fornecedores portugueses, sim. E as
  faturas da OpenAI, Google, Adobe, AWS? Além disso o contabilista quer os
  PDFs, não linhas do e-Fatura.
- *"Where are my documents stored? Is this GDPR-safe?"* — Point at the
  privacy page (deploy checklist Phase 0): stored in Convex, never parsed,
  never shared, delete everything on request.
- *"No OCR? So it does nothing?"* — Reframe: tools that read your
  documents cost €20–50/month, need your accountant to adopt them, and
  still get numbers wrong. The accountant does the accounting; we kill the
  searching. (This is the landing's honesty block — reuse its copy.)
- *"Can my accountant log in?"* — No, on purpose. Zero adoption friction:
  they receive email, like they always have — just organized.

## 6. Metrics (four, no more)

1. **Activation:** signup → first *real* (non-demo) Collected Expense
   Document. Target >60% with concierge onboarding.
2. **Time to first document:** target <1 day.
3. **Month-2 seal:** did they export a second Collection Month? The
   retention signal, and the moment the Pro ask is earned.
4. **Free → Pro conversion** on the Phase D ask.

Instrumentation for all four is a Phase 0 item on the deploy checklist —
signup, first-collect, seal/dispatch, and checkout events. Until analytics
exist, the Convex data itself answers 1–3 (documents and users tables);
don't let missing tooling delay the beta.

## 7. Top risks and mitigations

| Risk | Mitigation |
| --- | --- |
| "e-Fatura já faz isso" | Lead with foreign SaaS + "o contabilista quer os PDFs"; it's in the FAQ and §5 |
| Ingestion fragility (mailbox polling, n8n on a VPS) | Daily `NeedsReview` checks through the beta; runbook failure checks; one dropped invoice kills trust |
| Trust with financial documents | Legal pages, no dead UI, honest copy, easy deletion promise, GDPR answer ready |
| Habit doesn't stick | Mid-month concierge nudges in Phase B; later a gentle email nudge (not before) |
| Free-is-unlimited cannibalizes Pro | It won't for the ICP — Pro sells automation, and the monthly ritual keeps resurfacing the upsell at the exact moment of pain. If conversion stalls, the lever is the Export Schedule pitch, not capping Free |

## 8. What NOT to do before the first paying customer

- No OCR/extraction, no team workspaces, no accountant login (unchanged
  from launch-plan.md, and still the discipline that defines the product).
- No paid ads.
- No annual plans, coupons, or pricing experiments.
- No Product Hunt.
- No new surfaces — the redesign is done; ship it.

Every one of these is a way to avoid the scary part: asking ten specific
humans to use it, and then asking the ones who sealed a month for €9.
