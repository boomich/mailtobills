const problemPoints = [
  "Bills scattered across inboxes",
  "Manual downloads every quarter",
  "Accountant waiting on missing documents",
  "Lost invoices = lost deductions",
  "Repetitive admin work that shouldn’t exist",
];

const workflowSteps = [
  {
    title: "Forward bills to your MailtoBills address",
    detail: "Send invoices from any inbox. No new tools or logins required.",
  },
  {
    title: "We extract vendor, date, amount, due date, file",
    detail: "Automatic parsing from PDFs, images, or the email body itself.",
  },
  {
    title: "We store it and notify your accountant (optional)",
    detail: "Everything lands in organized folders with an audit trail.",
  },
];

const features = [
  "Automatic parsing from PDFs, images, and email bodies",
  "Smart categorization around suppliers (water, electricity, rent, etc)",
  "Exports to Google Drive / Dropbox / OneDrive",
  "Accountant mode: automatic forwarding + monthly summary",
  "Invoice deduplication",
  "Full audit trail and logs",
  "Secure by design: data encrypted in transit and at rest",
];

const idealUsers = [
  "Freelancers & contractors",
  "Small business owners",
  "Airbnb hosts",
  "People with too many bills to track manually",
];

const pricing = [
  {
    name: "Free",
    price: "$0",
    bullets: [
      "Up to X invoices per month",
      "Core extraction",
      "Manual export",
    ],
    cta: "Get Started Free",
  },
  {
    name: "Pro",
    price: "$19",
    bullets: [
      "Unlimited invoices",
      "Automatic Drive sync",
      "Monthly accountant summary",
      "Priority extraction",
    ],
    cta: "Upgrade to Pro",
  },
];

const testimonials = [
  {
    quote: "MailtoBills removed an entire day of monthly admin. My accountant finally has everything on time.",
    name: "Ana, freelancer",
  },
  {
    quote: "Forwarding receipts is easier than logging into five supplier portals. It just works.",
    name: "Carlos, small business owner",
  },
  {
    quote: "No more missing invoices. The audit trail saves me every tax season.",
    name: "Rita, Airbnb host",
  },
];

const faqs = [
  {
    question: "Is my data safe?",
    answer: "Yes. Data is encrypted in transit and at rest, with detailed access logs.",
  },
  {
    question: "What formats do you support?",
    answer: "PDFs, images, and structured email bodies are automatically parsed.",
  },
  {
    question: "Does MailtoBills work with any email provider?",
    answer: "You can forward from Gmail, Outlook, iCloud, or any SMTP/IMAP inbox.",
  },
  {
    question: "Can I add multiple sender emails?",
    answer: "Yes. Add teammates or vendors so we recognize and auto-file their messages.",
  },
  {
    question: "Can my accountant access everything?",
    answer: "Invite them in Accountant Mode to receive exports and monthly summaries automatically.",
  },
];

const SectionHeader = ({
  title,
  subtitle,
  id,
}: {
  title: string;
  subtitle?: string;
  id?: string;
}) => (
  <div className="section-header">
    <h2 className="section-title" id={id}>
      {title}
    </h2>
    {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
  </div>
);

const FlowDiagram = () => (
  <div className="flow-diagram" aria-label="Email to archive visual">
    <div className="diagram-node">
      <strong>Inbox</strong>
      <span>Forward bills</span>
    </div>
    <div className="diagram-arrow" aria-hidden>
      →
    </div>
    <div className="diagram-node">
      <strong>MailtoBills</strong>
      <span>Extract & organize</span>
    </div>
    <div className="diagram-arrow" aria-hidden>
      →
    </div>
    <div className="diagram-node">
      <strong>Drive & Accountant</strong>
      <span>Synced copies</span>
    </div>
  </div>
);

const KPIRow = () => (
  <div className="kpi-row">
    <div className="kpi">
      <strong>5 min setup</strong>
      <span>No integrations required</span>
    </div>
    <div className="kpi">
      <strong>100% traceable</strong>
      <span>Audit trail & logs</span>
    </div>
    <div className="kpi">
      <strong>Less inbox chaos</strong>
      <span>Auto filing on arrival</span>
    </div>
  </div>
);

const HomePage = () => (
  <main>
    <section className="section hero" id="top">
      <div className="content hero-grid">
        <div>
          <div className="hero-pill">Built for email-first invoices</div>
          <h1 className="hero-title">Forward your bills. We handle the rest.</h1>
          <p className="hero-subtitle">
            Automatic extraction, storage and organization of every invoice you email to
            MailtoBills.
          </p>
          <div className="actions">
            <a className="button-primary" href="#pricing">
              Start Free
            </a>
            <a className="button-secondary" href="#workflow">
              See How It Works
            </a>
          </div>
          <KPIRow />
        </div>
        <div className="hero-visual" aria-labelledby="hero-visual-title">
          <div>
            <div className="tag" id="hero-visual-title">
              Live sync preview
            </div>
            <p style={{ marginTop: 10 }}>
              A simple flow from your inbox to organized storage and your accountant.
            </p>
          </div>
          <FlowDiagram />
        </div>
      </div>
    </section>

    <section className="section" aria-labelledby="problem-title">
      <div className="content">
        <SectionHeader
          id="problem-title"
          title="Email chaos is not bookkeeping."
          subtitle="Stop chasing PDFs across inboxes and supplier portals."
        />
        <ul className="bullet-list" aria-labelledby="problem-title">
          {problemPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </section>

    <section className="section" id="workflow">
      <div className="content">
        <SectionHeader
          title="One action: forward emails"
          subtitle="We take it from there with structured data and organized files."
        />
        <div className="timeline" aria-label="Workflow steps">
          {workflowSteps.map((step) => (
            <div key={step.title} className="card timeline-step">
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section" aria-labelledby="features-title">
      <div className="content">
        <SectionHeader
          id="features-title"
          title="Features that keep your accountant happy"
          subtitle="Credibility and breadth without the clutter."
        />
        <div className="cards-grid">
          {features.map((feature) => (
            <div key={feature} className="card">
              <h3>{feature}</h3>
              <p>Ready for email-first accounting workflows.</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section" aria-labelledby="ideal-users-title">
      <div className="content">
        <SectionHeader
          id="ideal-users-title"
          title="Built for people drowning in emailed bills"
          subtitle="MailtoBills is not a generic accounting tool."
        />
        <div className="cards-grid">
          {idealUsers.map((user) => (
            <div key={user} className="card">
              <h3>{user}</h3>
              <p>Hand off the inbox chaos to a workflow that never forgets.</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section" id="pricing" aria-labelledby="pricing-title">
      <div className="content">
        <SectionHeader
          id="pricing-title"
          title="Simple pricing"
          subtitle="Get started free. No credit card. Upgrade when ready."
        />
        <div className="pricing-grid">
          {pricing.map((plan) => (
            <div key={plan.name} className="price-card">
              <div className="tag">{plan.name} Plan</div>
              <div className="price">{plan.price}</div>
              <ul className="bullet-list">
                {plan.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a className="button-primary" href="#top">
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section" aria-labelledby="testimonials-title">
      <div className="content">
        <SectionHeader
          id="testimonials-title"
          title="Trusted by people who hate admin"
          subtitle="Placeholder quotes from beta users."
        />
        <div className="testimonials">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="testimonial">
              <p>“{testimonial.quote}”</p>
              <strong>{testimonial.name}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section" aria-labelledby="faq-title">
      <div className="content">
        <SectionHeader
          id="faq-title"
          title="Frequently asked"
          subtitle="Clear answers to common questions."
        />
        <div className="faq-grid">
          {faqs.map((faq) => (
            <div key={faq.question} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <footer className="footer">
      <div className="content">
        <div>
          <strong>MailtoBills</strong>
          <p>Built for inbox-first bookkeeping.</p>
        </div>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Use</a>
          <a href="mailto:hello@mailtobills.com">Contact</a>
          <a href="https://github.com/mailtobills">GitHub</a>
        </div>
      </div>
    </footer>
  </main>
);

export default HomePage;
