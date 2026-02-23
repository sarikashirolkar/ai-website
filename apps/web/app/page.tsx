"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  ChartLine,
  Check,
  CircleGauge,
  Globe,
  MessageSquare,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow
} from "lucide-react";

const services = [
  {
    title: "AI Agents",
    desc: "Autonomous agents to manage repetitive ops, internal support, and decision workflows.",
    points: ["24/7 execution", "Human-in-the-loop controls", "Channel integrations"],
    icon: Bot
  },
  {
    title: "Workflow Automation",
    desc: "Eliminate manual handoffs with event-driven automations across your systems.",
    points: ["Custom process maps", "API orchestration", "Audit-friendly logs"],
    icon: Workflow
  },
  {
    title: "Data Intelligence",
    desc: "Operational dashboards and AI-enhanced analytics for faster decisions.",
    points: ["Live KPI views", "Forecasting", "Executive reporting"],
    icon: ChartLine
  }
];

const benefits = [
  { label: "Faster delivery cycles", metric: "2.8x" },
  { label: "Lower operations overhead", metric: "-37%" },
  { label: "Improved response quality", metric: "+54%" },
  { label: "Automation reliability", metric: "99.9%" }
];

const faqs = [
  {
    q: "How fast can we launch our first workflow?",
    a: "Most teams launch their first production workflow in 2-4 weeks, depending on integrations and approval paths."
  },
  {
    q: "Can you integrate with our existing CRM and tools?",
    a: "Yes. We design around your current stack and connect CRMs, helpdesk platforms, internal APIs, and data warehouses."
  },
  {
    q: "Do we need an in-house AI team?",
    a: "No. We can operate as your execution partner while your team focuses on business outcomes and adoption."
  },
  {
    q: "Is this secure for enterprise use?",
    a: "Yes. We support role-based access, audit trails, scoped API keys, and deployment patterns aligned with enterprise security controls."
  }
];

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const [annual, setAnnual] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [contactStatus, setContactStatus] = useState("");
  const [contactLoading, setContactLoading] = useState(false);

  const plans = useMemo(
    () => [
      {
        name: "Starter",
        monthly: 699,
        annual: 559,
        tagline: "For early-stage teams building first AI workflows.",
        features: ["2 active automations", "Basic analytics", "Email support"]
      },
      {
        name: "Growth",
        monthly: 1499,
        annual: 1199,
        tagline: "For scaling companies standardizing AI operations.",
        features: ["10 active automations", "Workflow optimization", "Priority support"],
        featured: true
      },
      {
        name: "Enterprise",
        monthly: null,
        annual: null,
        tagline: "For global teams with advanced compliance and scale.",
        features: ["Unlimited automations", "Dedicated architect", "Custom SLAs"]
      }
    ],
    []
  );

  async function runWorkflow(e: FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;

    setChatLoading(true);
    setChatResponse("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt })
      });

      if (!res.ok) throw new Error("Workflow call failed");
      const data = (await res.json()) as { output: string };
      setChatResponse(data.output);
    } catch {
      setChatResponse("Unable to run workflow right now. Please try again.");
    } finally {
      setChatLoading(false);
    }
  }

  async function submitContact(e: FormEvent) {
    e.preventDefault();
    setContactStatus("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setContactStatus("Please fill in name, email, and message.");
      return;
    }

    setContactLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, message })
      });

      if (!res.ok) throw new Error("Contact request failed");
      const data = (await res.json()) as { detail: string };
      setContactStatus(data.detail);
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    } catch {
      setContactStatus("Unable to submit right now. Please email us directly.");
    } finally {
      setContactLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <div className="orb orb-one" />
      <div className="orb orb-two" />

      <header className="top-nav">
        <div className="brand">AI Workflow Automate</div>
        <nav>
          <a href="#services">Services</a>
          <a href="#proof">Impact</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">AI Workflow Studio</p>
          <h1>Scale operations with intelligent automation systems.</h1>
          <p>
            We build production-grade AI workflows for marketing, sales, support, and operations using modern
            orchestration patterns and measurable business outcomes.
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn solid">
              Book Strategy Call <ArrowRight size={16} />
            </a>
            <a href="#demo" className="btn ghost">
              Live Workflow Demo
            </a>
          </div>
        </div>
        <aside className="hero-panel" id="demo">
          <div className="panel-title">
            <Sparkles size={16} />
            Interactive Workflow Simulator
          </div>
          <form onSubmit={runWorkflow} className="panel-form">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe a workflow goal, e.g. automate inbound lead qualification"
            />
            <button type="submit" className="btn solid" disabled={chatLoading}>
              {chatLoading ? "Running..." : "Run Workflow"}
            </button>
          </form>
          <pre>{chatResponse || "Results from your workflow run appear here."}</pre>
        </aside>
      </section>

      <section className="stats-grid" id="proof">
        {benefits.map((item) => (
          <article key={item.label}>
            <span>{item.metric}</span>
            <p>{item.label}</p>
          </article>
        ))}
      </section>

      <section className="section" id="services">
        <div className="section-head">
          <p className="eyebrow">Core Services</p>
          <h2>Built for teams that want execution, not experimentation.</h2>
        </div>
        <div className="cards">
          {services.map((service) => (
            <article key={service.title} className="service-card">
              <service.icon size={18} />
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <ul>
                {service.points.map((point) => (
                  <li key={point}>
                    <Check size={14} />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section split">
        <div>
          <p className="eyebrow">How We Work</p>
          <h2>From business bottleneck to deployed AI workflow.</h2>
          <div className="timeline">
            <div>
              <BrainCircuit size={16} />
              <div>
                <h4>Discovery</h4>
                <p>Map high-friction operations and identify automation ROI opportunities.</p>
              </div>
            </div>
            <div>
              <Globe size={16} />
              <div>
                <h4>Integration</h4>
                <p>Connect your stack, orchestrate workflows, and establish monitoring baselines.</p>
              </div>
            </div>
            <div>
              <Rocket size={16} />
              <div>
                <h4>Scale</h4>
                <p>Roll out across functions with governance, alerts, and continuous optimization.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="trust-card">
          <div>
            <ShieldCheck size={17} />
            <p>Security-first architecture</p>
          </div>
          <div>
            <CircleGauge size={17} />
            <p>Performance monitoring</p>
          </div>
          <div>
            <MessageSquare size={17} />
            <p>Human approvals where needed</p>
          </div>
        </div>
      </section>

      <section className="section" id="pricing">
        <div className="section-head row">
          <div>
            <p className="eyebrow">Pricing</p>
            <h2>Simple plans with clear outcomes.</h2>
          </div>
          <button className="toggle" onClick={() => setAnnual((v) => !v)} type="button">
            {annual ? "Annual billing (save 20%)" : "Monthly billing"}
          </button>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <article key={plan.name} className={plan.featured ? "pricing-card featured" : "pricing-card"}>
              <h3>{plan.name}</h3>
              <p>{plan.tagline}</p>
              <div className="price">
                {plan.monthly ? `$${annual ? plan.annual : plan.monthly}/mo` : "Custom"}
              </div>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={14} />
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="btn solid">Get Started</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section faq">
        <div className="section-head">
          <p className="eyebrow">FAQs</p>
          <h2>What teams ask before they automate.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <article key={item.q}>
              <button type="button" onClick={() => setActiveFaq(activeFaq === index ? null : index)}>
                {item.q}
                <span>{activeFaq === index ? "−" : "+"}</span>
              </button>
              {activeFaq === index && <p>{item.a}</p>}
            </article>
          ))}
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="section-head">
          <p className="eyebrow">Contact</p>
          <h2>Let’s design your AI workflow roadmap.</h2>
        </div>
        <form className="contact-form" onSubmit={submitContact}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Work email" type="email" />
          <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company (optional)" />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us what you want to automate"
          />
          <button className="btn solid" type="submit" disabled={contactLoading}>
            {contactLoading ? "Submitting..." : "Send Request"}
          </button>
          {contactStatus && <p className="status">{contactStatus}</p>}
        </form>
      </section>
    </main>
  );
}
