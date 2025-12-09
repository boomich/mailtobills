import ThemeToggle from "./components/theme-toggle";

const problemPoints = [
  "Bills scattered across inboxes",
  "Manual downloads every quarter",
  "Accountant waiting on missing documents",
  "Lost invoices = lost deductions",
  "Repetitive admin work that shouldn’t exist",
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

const faq = [
  {
    question: "Is my data safe?",
    answer:
      "Yes. Files and metadata are encrypted in transit and at rest, and every action is recorded in an audit trail.",
  },
  {
    question: "What formats do you support?",
    answer: "PDFs, images (JPG/PNG), and invoice details pulled directly from the email body.",
  },
  {
    question: "Does MailtoBills work with any email provider?",
    answer: "If you can forward an email, you can use MailtoBills—works with Gmail, Outlook, iCloud, and custom domains.",
  },
  {
    question: "Can I add multiple sender emails?",
    answer: "Yes. Add as many trusted sender addresses as you need for different inboxes or teammates.",
  },
  {
    question: "Can my accountant access everything?",
    answer: "You can enable Accountant Mode to auto-forward processed invoices and a monthly summary to your accountant.",
  },
];

const testimonials = [
  {
    name: "Beta user",
    role: "Freelance designer",
    quote: "I stopped hunting through my inbox for invoices. I just forward and forget.",
  },
  {
    name: "Placeholder client",
    role: "Small agency owner",
    quote: "My accountant finally gets everything on time—no more end-of-quarter scramble.",
  },
];

const HeroDiagram = () => (
  <svg className="hero-visual" viewBox="0 0 420 240" role="img" aria-label="Diagram of email flowing into organized storage">
    <defs>
      <linearGradient id="arrow" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#4f8ac7" />
        <stop offset="100%" stopColor="#53c2a7" />
      </linearGradient>
    </defs>
    <rect x="24" y="24" width="110" height="70" rx="12" fill="#eaf1fb" stroke="#cdd7e5" />
    <text x="44" y="65" fill="#0f172a" fontWeight="700" fontSize="16">Inbox</text>
    <path d="M170 60 H250" stroke="url(#arrow)" strokeWidth="6" strokeLinecap="round" />
    <rect x="250" y="36" width="110" height="110" rx="16" fill="#fff" stroke="#cdd7e5" />
    <text x="270" y="78" fill="#0f172a" fontWeight="700" fontSize="16">MailtoBills</text>
    <rect x="266" y="90" width="78" height="18" rx="6" fill="#dceafb" />
    <rect x="266" y="116" width="88" height="12" rx="6" fill="#e8f4ff" />
    <rect x="24" y="150" width="150" height="60" rx="14" fill="#fff" stroke="#cdd7e5" />
    <text x="40" y="185" fill="#0f172a" fontWeight="700" fontSize="14">Drive / Dropbox</text>
    <rect x="240" y="170" width="150" height="60" rx="14" fill="#fff" stroke="#cdd7e5" />
    <text x="260" y="205" fill="#0f172a" fontWeight="700" fontSize="14">Accountant</text>
    <path d="M205 95 C210 140 150 160 150 160" stroke="#53c2a7" strokeWidth="5" fill="none" strokeLinecap="round" />
    <path d="M215 95 C210 140 280 180 280 180" stroke="#4f8ac7" strokeWidth="5" fill="none" strokeLinecap="round" />
  </svg>
);

const WorkflowDiagram = () => (
  <svg className="workflow-visual" viewBox="0 0 520 140" role="img" aria-label="Workflow timeline from email to organized storage">
    <defs>
      <linearGradient id="timeline" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stopColor="#4f8ac7" />
        <stop offset="100%" stopColor="#53c2a7" />
      </linearGradient>
    </defs>
    <line x1="60" y1="70" x2="460" y2="70" stroke="url(#timeline)" strokeWidth="6" strokeLinecap="round" />
    {["Forward", "Extract", "Store"].map((label, index) => {
      const x = 60 + index * 200;
      return (
        <g key={label}>
          <circle cx={x} cy={70} r={26} fill="#fff" stroke="#cdd7e5" strokeWidth="4" />
          <text x={x - 24} y={76} fill="#0f172a" fontWeight="700" fontSize="14">
            {label}
          </text>
        </g>
      );
    })}
  </svg>
);

const HomePage = () => (
  <main>
    <header className="wrapper" style={{ paddingTop: "28px" }}>
      <div className="section-header">
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div className="badge">MailtoBills</div>
          <span style={{ color: "var(--muted)", fontWeight: 600 }}>
            Email-to-ledger automation
          </span>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <a className="button secondary" href="#pricing">
            Pricing
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>

    <section className="wrapper" id="hero">
      <div className="hero">
        <div>
          <div className="badge">Landing page wireframe + copy draft</div>
          <h1 style={{ fontSize: "42px", marginTop: "12px" }}>
            Forward your bills. We handle the rest.
          </h1>
          <p style={{ marginTop: "12px", fontSize: "18px" }}>
            Automatic extraction, storage and organization of every invoice you email to MailtoBills.
          </p>
          <div className="ctas">
            <a className="button primary" href="#pricing">Start Free</a>
            <a className="button secondary" href="#workflow">See How It Works</a>
          </div>
        </div>
        <HeroDiagram />
      </div>
    </section>

    <section className="wrapper" id="problem">
      <div className="section-header">
        <div>
          <p className="tagline">Problem</p>
          <h2>Make the pain obvious in 10 seconds.</h2>
        </div>
        <p>Email chaos is not bookkeeping.</p>
      </div>
      <ul className="bullet-list">
        {problemPoints.map((item) => (
          <li key={item} className="bullet-item">
            <span className="bullet-dot" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>

    <section className="wrapper" id="workflow">
      <div className="section-header">
        <div>
          <p className="tagline">Solution</p>
          <h2>Only one action: forward emails.</h2>
          <p>We do the rest—capture, extract, store, and notify.</p>
        </div>
      </div>
      <div className="timeline">
        {["Forward bills to your MailtoBills address", "We extract vendor, date, amount, due date, file", "We store it and notify your accountant (optional)"].map(
          (text, index) => (
            <div key={text} className="timeline-step">
              <div className="timeline-number">{index + 1}</div>
              <p>{text}</p>
            </div>
          ),
        )}
      </div>
      <WorkflowDiagram />
    </section>

    <section className="wrapper" id="features">
      <div className="section-header">
        <div>
          <p className="tagline">Features</p>
          <h2>Credibility without clutter.</h2>
        </div>
        <p>Security, automations, and handoffs for your accountant.</p>
      </div>
      <div className="features-grid">
        {features.map((feature) => (
          <div key={feature} className="card">
            <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>{feature.split(":")[0]}</h3>
            <p>{feature}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="wrapper" id="ideal-users">
      <div className="section-header">
        <div>
          <p className="tagline">Ideal users</p>
          <h2>Built for people drowning in emailed bills.</h2>
        </div>
      </div>
      <div className="card-grid">
        {idealUsers.map((user) => (
          <div key={user} className="card">
            <h3 style={{ fontSize: "18px", marginBottom: "4px" }}>{user}</h3>
            <p>Send invoices to one address and keep your deductions intact.</p>
          </div>
        ))}
      </div>
    </section>

    <section className="wrapper" id="pricing">
      <div className="section-header">
        <div>
          <p className="tagline">Simple pricing</p>
          <h2>Get started free. No credit card.</h2>
        </div>
        <p>Temporary model until Stripe is live.</p>
      </div>
      <div className="pricing">
        <div className="price-card">
          <p className="tagline">Free plan</p>
          <h3 style={{ fontSize: "22px", marginBottom: "8px" }}>Up to X invoices/month</h3>
          <ul className="bullet-list">
            <li className="bullet-item"><span className="bullet-dot" /> Core extraction</li>
            <li className="bullet-item"><span className="bullet-dot" /> Manual export</li>
          </ul>
          <div className="ctas" style={{ marginTop: "16px" }}>
            <a className="button primary" href="#cta">Get Started Free</a>
          </div>
        </div>
        <div className="price-card">
          <p className="tagline">Pro plan</p>
          <h3 style={{ fontSize: "22px", marginBottom: "8px" }}>Unlimited invoices</h3>
          <ul className="bullet-list">
            <li className="bullet-item"><span className="bullet-dot" /> Automatic Drive sync</li>
            <li className="bullet-item"><span className="bullet-dot" /> Monthly accountant summary</li>
            <li className="bullet-item"><span className="bullet-dot" /> Priority extraction</li>
          </ul>
          <div className="ctas" style={{ marginTop: "16px" }}>
            <a className="button secondary" href="#cta">Get Started Free – No credit card</a>
          </div>
        </div>
      </div>
    </section>

    <section className="wrapper" id="testimonials">
      <div className="section-header">
        <div>
          <p className="tagline">Trust</p>
          <h2>Testimonials & placeholders until live logos arrive.</h2>
        </div>
        <p>Rotating quotes from beta users.</p>
      </div>
      <div className="card-grid">
        {testimonials.map((testimonial) => (
          <div key={testimonial.quote} className="card">
            <p style={{ fontStyle: "italic", marginBottom: "8px" }}>
              “{testimonial.quote}”
            </p>
            <p>
              <strong>{testimonial.name}</strong> — {testimonial.role}
            </p>
          </div>
        ))}
        <div className="card" style={{ textAlign: "center" }}>
          <p style={{ fontWeight: 700 }}>Space reserved for partner logos.</p>
          <p style={{ marginTop: "6px" }}>Add logos once available.</p>
        </div>
      </div>
    </section>

    <section className="wrapper" id="faq">
      <div className="section-header">
        <div>
          <p className="tagline">FAQ</p>
          <h2>Remove common fears.</h2>
        </div>
      </div>
      <div className="faq">
        {faq.map((item) => (
          <details key={item.question} open>
            <summary>{item.question}</summary>
            <p style={{ marginTop: "8px" }}>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>

    <section className="wrapper" id="wireframes">
      <div className="section-header">
        <div>
          <p className="tagline">Wireframes & assets</p>
          <h2>Homepage wireframe (desktop + mobile) and diagrams.</h2>
        </div>
      </div>
      <div className="wireframe-grid">
        <div className="wireframe">
          <h3 style={{ marginBottom: "10px" }}>Desktop wireframe</h3>
          <div className="row">
            <div className="placeholder" style={{ height: "36px" }} />
            <div className="placeholder" style={{ height: "36px" }} />
          </div>
          <div className="row">
            <div className="placeholder" style={{ height: "120px" }} />
            <div className="placeholder" style={{ height: "120px" }} />
          </div>
          <div className="row">
            <div className="placeholder" />
            <div className="placeholder" />
            <div className="placeholder" />
          </div>
        </div>
        <div className="wireframe">
          <h3 style={{ marginBottom: "10px" }}>Mobile wireframe</h3>
          <div className="row">
            <div className="placeholder" style={{ height: "32px" }} />
          </div>
          <div className="row">
            <div className="placeholder" style={{ height: "140px" }} />
          </div>
          <div className="row">
            <div className="placeholder" />
          </div>
          <div className="row">
            <div className="placeholder" />
          </div>
        </div>
      </div>
      <p style={{ marginTop: "16px", color: "var(--muted)" }}>
        Hero diagram shows email → MailtoBills processing → Drive/Accountant. Workflow timeline illustrates the 3-step automation.
      </p>
    </section>

    <section className="wrapper" id="dark-mode">
      <div className="section-header">
        <div>
          <p className="tagline">Optional dark mode</p>
          <h2>One-click toggle for calm night reading.</h2>
        </div>
        <ThemeToggle />
      </div>
      <p style={{ marginTop: "12px" }}>
        Use the toggle to preview the entire landing page in a dark palette designed for focus.
      </p>
    </section>

    <footer className="footer">
      <div className="wrapper" style={{ display: "grid", gap: "12px" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <span className="badge">MailtoBills</span>
          <span style={{ color: "var(--muted)" }}>Privacy Policy</span>
          <span style={{ color: "var(--muted)" }}>Terms of Use</span>
          <a href="mailto:hello@mailtobills.com" style={{ color: "var(--primary)", fontWeight: 700 }}>
            hello@mailtobills.com
          </a>
          <a href="https://github.com" style={{ color: "var(--primary)", fontWeight: 700 }}>
            GitHub
          </a>
        </div>
        <p style={{ color: "var(--muted)", margin: 0 }}>Clean, minimalist, trustworthy. Built mobile-first.</p>
      </div>
    </footer>
  </main>
);

export default HomePage;
