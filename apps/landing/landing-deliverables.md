# MailtoBills Landing – Deliverables

## 1) Homepage wireframe

### Desktop layout (mobile-first with responsive grid)
```
┌─────────────────────────────────────────────────────────────┐
│ Hero: headline + subheadline + Start Free / See How It Works │
│ ┌───────────────┐  ┌──────────────────────────────────────┐ │
│ │  Text stack    │  │ Inbox → MailtoBills → Drive diagram │ │
│ └───────────────┘  └──────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ Problem bullets (full-width cards)                          │
├─────────────────────────────────────────────────────────────┤
│ Workflow timeline (3 horizontal steps)                      │
├─────────────────────────────────────────────────────────────┤
│ Features grid (cards)                                       │
├─────────────────────────────────────────────────────────────┤
│ Ideal users grid                                            │
├─────────────────────────────────────────────────────────────┤
│ Pricing cards (Free, Pro) + CTA                             │
├─────────────────────────────────────────────────────────────┤
│ Testimonials placeholders (3 cards)                         │
├─────────────────────────────────────────────────────────────┤
│ FAQ grid                                                    │
├─────────────────────────────────────────────────────────────┤
│ Footer: Privacy / Terms / Contact / GitHub                  │
└─────────────────────────────────────────────────────────────┘
```

### Mobile layout
```
[Hero text]
[CTAs stacked]
[Diagram stacked under text]
[Problem list – single column cards]
[Workflow steps – vertical cards]
[Features – single column cards]
[Ideal users – single column]
[Pricing – stacked cards]
[Testimonials – stacked]
[FAQ – stacked]
[Footer links in a column]
```

## 2) Copywriting draft (section order)
- **Hero**: "Forward your bills. We handle the rest." + subheadline + Start Free / See How It Works.
- **Problem**: Bullets: Bills scattered across inboxes; Manual downloads every quarter; Accountant waiting on missing documents; Lost invoices = lost deductions; Repetitive admin work that shouldn’t exist. Punchline: “Email chaos is not bookkeeping.”
- **Solution / Workflow**: Step 1) Forward bills to your MailtoBills address. Step 2) We extract vendor, date, amount, due date, file. Step 3) We store it and notify your accountant (optional). CTA anchor from hero scrolls here.
- **Features**: Parsing from PDFs/images/email bodies; Smart categorization; Exports to Drive/Dropbox/OneDrive; Accountant mode; Deduplication; Audit trail/logs; Security (encryption).
- **Ideal Users**: Freelancers & contractors; Small business owners; Airbnb hosts; People with too many bills to track manually.
- **Pricing**: Free (up to X invoices/month, core extraction, manual export). Pro (unlimited, automatic Drive sync, monthly accountant summary, priority extraction). CTA: “Get Started Free – No credit card”.
- **Testimonials / Trust**: 3 placeholder quotes from beta users plus space for logos.
- **FAQ**: Safety, supported formats, any email provider, multiple sender emails, accountant access.
- **Footer**: Privacy Policy, Terms of Use, Contact email, GitHub link.

## 3) Images / diagrams
- **Hero visual**: Inline diagram showing "Inbox → MailtoBills → Drive & Accountant" with animated arrows, matching the palette. Implemented in `FlowDiagram` component inside `app/page.tsx`.
- **Workflow**: Horizontal timeline cards under the “One action: forward emails” section, visually representing the three numbered steps.

## 4) Dark mode
- Uses `prefers-color-scheme: dark` in `app/globals.css` to swap palette (deep navy background, softer blues/greens, higher-contrast text) without changing layout.
