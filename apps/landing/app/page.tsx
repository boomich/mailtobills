const problems = [
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

const faqs = [
  {
    question: "Is my data safe?",
    answer:
      "Yes. All data is encrypted in transit and at rest, with access controls tailored for you and your accountant.",
  },
  {
    question: "What formats do you support?",
    answer: "PDFs, email bodies, and common image formats (JPG, PNG).",
  },
  {
    question: "Does MailtoBills work with any email provider?",
    answer: "If it can forward an email, it works. No complex setup required.",
  },
  {
    question: "Can I add multiple sender emails?",
    answer: "Yes. Share your MailtoBills address with any inbox that sends invoices to you.",
  },
  {
    question: "Can my accountant access everything?",
    answer:
      "Invite them in accountant mode to receive automatic forwards and monthly summaries.",
  },
];

const testimonials = [
  {
    name: "Patricia, designer",
    quote: "I forward everything the second it arrives. My accountant stopped chasing me.",
  },
  {
    name: "Miguel, Airbnb host",
    quote: "Utilities, cleaning, repairs – all sorted without me touching spreadsheets.",
  },
  {
    name: "Lena, small business owner",
    quote: "The monthly summary email is my new ritual. Zero chaos, just files ready to go.",
  },
];

const HomePage = () => (
  <main>
    <header className="hero" id="top">
      <div className="container">
        <div className="hero-card">
          <div className="hero-text">
            <div className="pill">Landing • Mobile first</div>
            <h1>Forward your bills. We handle the rest.</h1>
            <p>
              Automatic extraction, storage and organization of every invoice you
              email to MailtoBills.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#pricing">
                Start Free
              </a>
              <a className="button secondary" href="#workflow">
                See How It Works
              </a>
            </div>
            <div className="tag-row">
              <span className="tag">Secure by design</span>
              <span className="tag">Designed for accountants</span>
              <span className="tag">Dark-mode ready</span>
            </div>
          </div>

          <div className="hero-visual" aria-hidden>
            <svg
              viewBox="0 0 520 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
            >
              <rect x="14" y="18" width="490" height="284" rx="22" fill="#0f172a" opacity="0.06" />
              <rect x="36" y="44" width="180" height="140" rx="16" fill="#2f80ed" opacity="0.12" />
              <rect x="62" y="72" width="128" height="18" rx="9" fill="#2f80ed" opacity="0.65" />
              <rect x="62" y="100" width="96" height="12" rx="6" fill="#2f80ed" opacity="0.35" />
              <rect x="62" y="120" width="78" height="12" rx="6" fill="#2f80ed" opacity="0.35" />
              <rect x="260" y="90" width="196" height="40" rx="12" fill="#36c6a4" opacity="0.12" />
              <rect x="260" y="90" width="84" height="40" rx="12" fill="#2f80ed" opacity="0.16" />
              <rect x="260" y="180" width="196" height="40" rx="12" fill="#36c6a4" opacity="0.12" />
              <rect x="372" y="180" width="84" height="40" rx="12" fill="#2f80ed" opacity="0.16" />
              <path
                d="M220 112c34-6 56 10 70 32"
                stroke="#2f80ed"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="8 10"
              />
              <path
                d="M220 198c36 8 62-4 80-36"
                stroke="#36c6a4"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="8 10"
              />
              <circle cx="220" cy="112" r="7" fill="#2f80ed" />
              <circle cx="220" cy="198" r="7" fill="#36c6a4" />
              <rect x="110" y="220" width="300" height="20" rx="10" fill="#0f172a" opacity="0.08" />
              <text x="120" y="234" fill="#1f2937" fontSize="14" fontWeight="700">
                Inbox ➜ Processing ➜ Drive & Accountant
              </text>
            </svg>
          </div>
        </div>
      </div>
    </header>

    <section className="section" id="problem">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">Problem</div>
          <h2 className="section-title">Email chaos is not bookkeeping.</h2>
          <p className="section-subtitle">
            Make the pain obvious in 10 seconds. We collected the top frustrations
            people share before switching to MailtoBills.
          </p>
        </div>
        <div className="problem-bullets">
          {problems.map((item) => (
            <div key={item} className="bullet">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section" id="workflow">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">Solution</div>
          <h2 className="section-title">One action: forward emails.</h2>
          <p className="section-subtitle">
            Our 3-step flow keeps every invoice extractable, searchable, and
            ready for your accountant.
          </p>
        </div>
        <div className="timeline">
          <div className="timeline-step">
            <strong>1</strong>
            <h3>Forward to your MailtoBills address</h3>
            <p>Use the unique inbox we give you. No setup, no new habits.</p>
          </div>
          <div className="timeline-step">
            <strong>2</strong>
            <h3>We extract vendor, date, amount, due date, file</h3>
            <p>Smart parsing across PDFs, email bodies, and images.</p>
          </div>
          <div className="timeline-step">
            <strong>3</strong>
            <h3>We store it and notify your accountant</h3>
            <p>Automatic exports, audit trail, and optional accountant mode.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="section" id="features">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">Features</div>
          <h2 className="section-title">Built for people drowning in billed emails.</h2>
          <p className="section-subtitle">
            Show credibility and breadth without overwhelming: automation,
            storage, exports, and safety baked in.
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature} className="feature-item">
              <span className="feature-icon">•</span>
              <div>
                <h3>{feature}</h3>
                <p className="small-text">
                  Designed to keep invoices searchable, deduplicated, and
                  accountant-ready.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section" id="users">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">Ideal users</div>
          <h2 className="section-title">Who MailtoBills is perfect for</h2>
          <p className="section-subtitle">
            Not a generic accounting tool—purpose-built for anyone drowning in
            emailed bills.
          </p>
        </div>
        <div className="card-grid">
          {idealUsers.map((user) => (
            <div key={user} className="card">
              <h3>{user}</h3>
              <p>Spend less time hunting invoices, more time running your work.</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section" id="pricing">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">Simple pricing</div>
          <h2 className="section-title">Get started free – no credit card.</h2>
          <p className="section-subtitle">
            Remove friction now. We’ll refine tiers once Stripe is live.
          </p>
        </div>
        <div className="pricing-grid">
          <div className="price-card">
            <h3>Free Plan</h3>
            <p className="small-text">Test the workflow without commitments.</p>
            <ul>
              <li>Up to X invoices per month</li>
              <li>Core extraction</li>
              <li>Manual export</li>
            </ul>
            <a className="button secondary" href="#top">
              Get Started
            </a>
          </div>
          <div className="price-card highlight">
            <h3>Pro Plan</h3>
            <p className="small-text">For teams who forward dozens of bills.</p>
            <ul>
              <li>Unlimited invoices</li>
              <li>Automatic Drive sync</li>
              <li>Monthly accountant summary</li>
              <li>Priority extraction</li>
            </ul>
            <a className="button primary" href="#top">
              Get Started Free – No credit card
            </a>
          </div>
        </div>
      </div>
    </section>

    <section className="section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">Trust</div>
          <h2 className="section-title">Social proof, ready for your launch.</h2>
          <p className="section-subtitle">
            Tasteful placeholders until live testimonials arrive.
          </p>
        </div>
        <div className="testimonial-list">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="testimonial">
              <span className="badge">Beta user</span>
              <p>
                “{testimonial.quote}”
              </p>
              <strong>{testimonial.name}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section" id="faq">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">FAQ</div>
          <h2 className="section-title">Remove the common fears.</h2>
          <p className="section-subtitle">
            Straightforward answers for the most frequent questions.
          </p>
        </div>
        <div className="faq">
          {faqs.map((item) => (
            <details key={item.question} className="faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    <section className="section" id="wireframes">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">Wireframes</div>
          <h2 className="section-title">Homepage wireframe (desktop + mobile)</h2>
          <p className="section-subtitle">
            Quick visual guide for structure. Clean, minimalist, trustworthy—soft
            blues and greens, one idea per section.
          </p>
        </div>
        <div className="wireframes">
          <div className="wireframe-card">
            <h4>Desktop layout</h4>
            <div className="wireframe-visual" aria-hidden />
            <p className="small-text">Hero, pain, solution, features, pricing, proof, FAQ.</p>
          </div>
          <div className="wireframe-card">
            <h4>Mobile layout</h4>
            <div className="wireframe-visual" aria-hidden />
            <p className="small-text">Stacked sections with sticky CTAs for quick scroll.</p>
          </div>
        </div>
      </div>
    </section>

    <footer className="footer">
      <div className="container footer-content">
        <div>
          <strong>MailtoBills</strong>
          <p className="small-text">Forward your bills. We handle the rest.</p>
        </div>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="mailto:hello@mailtobills.com">hello@mailtobills.com</a>
          <a href="https://github.com">GitHub</a>
        </div>
      </div>
    </footer>
  </main>
);

export default HomePage;
