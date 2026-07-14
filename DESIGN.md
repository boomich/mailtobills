# DESIGN.md — MailToBills · CARIMBO

⚠️ **Binding.** Every UI change in this repo must satisfy this document. If a
change conflicts with it, the change is wrong or this document gets amended
first — never silently. `CONTEXT.md` remains binding for all product copy in
both locales. `AGENTS.md` remains binding for engineering practice.

Status: v1 (2026-07-14). Locked: concept, world, language rule, color roles,
type roles, radius/rule system, motion laws, dark-mode policy. Open until
specimen/bake-off sign-off: final palette values, final mark geometry, hero
composition, display-type weight decisions. Amendments are recorded in §12.

---

## 1. Concept

**CARIMBO.** MailToBills is a franking machine for your expenses. A document
arrives by mail, receives the stamp — RECEBIDO, filed to its Collection
Month — and lands in the month's dossier. At month end the dossier is sealed
and handed to the accountant.

The stamp is the product's honesty made visible: **a stamp does not read your
document; it certifies it and files it.** No OCR, no AI guessing your VAT.
This is the differentiator, and the design must make it felt, not claimed.

Design register: **official but friendly** — the pleasure of paperwork done
right. Precision of a counter clerk, warmth of paper.

## 2. The world

Postal and administrative ephemera: reception stamps (carimbo de receção),
circular cancellation postmarks, registered-mail forms, franking-machine
impressions, counter stationery, manila envelopes, typewritten manifests.

**Never:** scrapbook collage, vintage-kitsch distressing, skeuomorphic
leather/wood/paper-texture backgrounds, drop-shadow "cards floating in
gradient mist", the shadcn-default aesthetic this replaces, or anything from
the Boomich brand (olive/amber, Panchang/Switzer/Martian Mono, the B mark —
zero shared DNA; each product owns its identity).

Restraint rule: the world supplies **structure and marks**, not decoration.
One postal motif carrying meaning per composition; whitespace does the rest.
If an element could appear in a wedding-invitation Etsy kit, it's out.

## 3. Language layers

- **Graphic layer** (stamps, postmarks, mark, ephemera): postal Portuguese —
  RECEBIDO, REGISTADO, VIA POSTAL — used the way PAR AVION is used on
  airmail: brand vernacular, identical in every locale, never load-bearing
  for comprehension.
- **UI layer** (all interactive/informational copy): fully localized EN/PT
  through the messages files, using `CONTEXT.md` domain terms (Expense
  Document, Collection Month, Accountant Export…). No Portuguese leaks into
  EN UI copy and vice versa.
- A graphic-layer word may never be the only carrier of meaning: the stamp
  says RECEBIDO, the row's accessible label says "Collected"/"Recolhido".

## 4. Color

Roles are law; exact OKLCH values are tuned in the specimen and then locked.

| Token | Role | Draft value (light) |
| --- | --- | --- |
| `--paper` | page ground — warm counter paper | `oklch(0.958 0.012 88)` |
| `--paper-raised` | sheets/panels laid on the ground | `oklch(0.985 0.006 92)` |
| `--kraft` | envelope/dossier surfaces, month tabs | `oklch(0.86 0.045 82)` |
| `--ink` | text, rules, icons — blue-black office ink | `oklch(0.27 0.025 268)` |
| `--ink-muted` | secondary text | `oklch(0.49 0.02 268)` |
| `--postal` | primary actions, links — registered-mail blue | `oklch(0.44 0.12 262)` |
| `--stamp` | **certification only** — aniline stamp-pad violet | `oklch(0.45 0.16 302)` |
| `--signal` | destructive only — postal red | `oklch(0.55 0.19 27)` |

Hard rules:

- **Violet is certification.** The reception stamp, the postmark on a
  collected row, the export seal, "document collected" confirmations —
  nothing else. Never buttons, never links, never decoration, never charts.
- **Red is destruction.** Delete and irreversible-warning states only. Red
  and violet never appear in the same composition except a destructive
  action inside a certified context.
- **Rules are ink, never gray.** Dividers and borders are `--ink` at reduced
  alpha (25% minor / 100% structural hairlines), like printed form rules.
  No `gray-200` hairlines anywhere.
- Kraft is a surface, not an accent: it appears as a *material* (a tab, an
  envelope area), never as a highlight color.

## 5. Type

Three faces, three registers. No other font enters the repo.

| Face | Register | Usage |
| --- | --- | --- |
| **Archivo** (variable, wdth axis) | The official voice | Display headlines; form labels in caps + tracking (condensed); stamp lettering |
| **Public Sans** | The counter clerk | Body, UI controls, paragraphs — the workhorse |
| **Courier Prime** | The typewriter | Anything that is *data on a form*: filenames, senders, dates, amounts-of-things, the Collection Address, manifest tables |

Rules:

- If a value would appear typed into a form field or on a manifest, it is
  set in Courier Prime. If it labels that field, it is Archivo caps with
  tracking. If it explains, it is Public Sans.
- Archivo display uses the width axis deliberately (condensed for labels,
  wide only at poster sizes); never faux-condensed via `transform: scaleX`.
- All fonts self-hosted via `next/font` (build-time, zero runtime requests).

## 6. The mark

A circular cancellation postmark: ring, "MAILTOBILLS" set on the circular
path, cancellation waves striking through. Doubles as the date-stamp motif
(center carries month/year in UI uses). Favicon/small sizes: ring + waves
only, no text.

- Geometry is **computed, never eyeballed** — circular text layout, wave
  paths, and perforation edges come from a generator script whose output is
  committed alongside the SVG (see §10).
- The mark prints in `--ink` or `--stamp` only. Never red, never kraft,
  never gradients, never rotated per-instance (stamps in *content* may
  jitter; the brand mark may not).

## 7. Signature elements

- **The Carimbo** — the reception-stamp component: boxed two-line stamp
  (RECEBIDO + date) in stamp violet, printed with the thunk (§8), with a
  per-instance deterministic rotation jitter of ±2° (seeded from document
  id, so a given row's stamp never dances between renders).
- **Month tabs** — the Dossier's structure: Collection Months as physical
  folder tabs; the active month is the open dossier. This is the dashboard's
  primary navigation (replaces the generic sidebar).
- **The manifest** — Courier Prime tables with ink rules; the export
  preview *is* a manifest, shown proudly, not hidden behind an icon.
- **Form rules** — crisp ink hairlines structuring sections the way a
  counter form is ruled. Layout reads as a well-designed form, not a card
  grid.
- **The seal** — the month-end export ritual: manifest review → seal (stamp
  thunk on the package) → handover. The climactic interaction of the
  product; it gets the most motion budget.
- Perforation edges are permitted **only** on the seal/export moment and in
  the brand's own ephemera — never as a general-purpose divider.

## 8. Motion

- **The thunk**: stamps land fast and settle — scale from ~1.12 to 1 with a
  small overshoot, opacity hard-in, 160–220ms total. Ink is *pressed*, not
  faded: no slow fades on certification moments.
- Micro-interactions 120–180ms; page-level choreography ≤ 400ms; nothing
  loops unless it is a seamless loop (first frame ≡ last frame, verified).
- **Content is never invisible before its entrance animation.** Entrances
  animate from a visible baseline, or visibility is toggled by an observer
  class (`.is-stamped`-style) with a no-JS/no-observer fallback to the final
  state. This is regression-tested (§11) — the previous landing shipped a
  blank hero to headless/first-paint clients.
- `prefers-reduced-motion`: every animation has a defined reduced variant —
  final states render immediately; the thunk becomes an instant print.

## 9. Layout & surfaces

- Radius baseline is **0** (paper is sharp). `2px` permitted on inputs and
  small controls where sharp corners render poorly; circles/pills only for
  postmark-derived elements. The 12px-rounded-card look is banned.
- Shadows: at most one paper-lift level (sheet on counter), flat and tight;
  no ambient/blur-heavy elevation stacks.
- Landing sections are composed with intent — no 3-col icon-card grids, no
  centered-eyebrow/H2/paragraph formula repeated per section. Each section
  earns its structure from its content (form, manifest, dossier, envelope).
- Icons: sparse. Prefer typographic labels and stamps. Where an icon is
  genuinely needed, it is drawn in the world's register (single-weight ink
  strokes), not defaulted from lucide's full set.
- Dark mode policy: **landing is light-only** (a letter is paper).
  **Dashboard ships light + dark**; dark is "the archive at night" — ink
  paper (`oklch(0.22 0.02 268)` draft ground), cream ink, stamp violet
  brightened for contrast, same roles and laws.

## 10. Craft rules (binding, grows only)

1. Geometry is computed, never eyeballed: circular text, wave lines,
   perforations, tab curves come from generator scripts; outputs committed
   with the script path noted in a comment at the top of the SVG/component.
2. Every visual milestone is reviewed via screenshot at 1440px and 390px
   before it merges. No visual work is accepted "described but not seen".
3. Certification violet and destructive red obey §4 with zero exceptions.
4. Rules are ink (§4). Fonts are the three of §5. Radius obeys §9.
5. Deterministic randomness only: any jitter/variation is seeded from stable
   data, never `Math.random()` at render.
6. Copy obeys `CONTEXT.md`; the Free Plan has **unlimited collection**
   (the old landing's "10 documents/month" cap was wrong and must not
   resurface).
7. Accessibility is part of craft: axe-clean, focus states designed (ink
   focus ring — visible on paper, not default blue glow), contrast AA+ for
   text on every surface including kraft.

## 11. Feel-regression tests (grows with every feel bug)

Live under `e2e/` and `apps/*/test`; a redesign surface is not done until
its feel rules are tested:

- **No blank first paint**: hero and dashboard month view render their
  headline/rows with JS disabled or before animation triggers.
- **Reduced motion = final state**: with `prefers-reduced-motion`, stamped
  states are present, no intermediate frames.
- **Stamp determinism**: a document's carimbo jitter is identical across
  two renders.
- **Seamless loops**: any looping animation's first and last computed
  frames match.

## 12. Amendments

- _(none yet — v1)_
