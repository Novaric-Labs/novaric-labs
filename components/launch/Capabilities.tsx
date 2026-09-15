import Assessment from "./Assessment";

const MODULES = [
  {
    code: "SYS-01",
    system: "Enablement",
    title: "AI Enablement",
    tag: "For teams who want to build, not outsource",
    body: "We stand up the foundation your team needs to use AI safely, then teach them to build on it themselves. Model access, guardrails, evaluation, and the working habits that separate a pilot from a practice.",
    items: [
      "AI workflow audit with a ranked build list",
      "Model access, policy, and cost controls",
      "Evaluation harnesses for your use cases",
      "Hands-on training for engineers and operators",
      "Internal tooling and prompt libraries",
      "Vendor and platform selection",
    ],
  },
  {
    code: "SYS-02",
    system: "Automation",
    title: "Automation",
    tag: "For operations that run on queues, inboxes, and documents",
    body: "We design agents that do the work — routing, drafting, reconciling, escalating — inside your CRM, ticketing, email, and data. Every high-stakes action runs through an approval gate you control, and we stay until it runs without us.",
    items: [
      "Multi-step agents with human approval gates",
      "Integration with the systems you already run",
      "Document intake, extraction, exception handling",
      "Monitoring, logs, and a kill switch on day one",
      "Fixed-scope pilots that become managed retainers",
      "Code handed over, not held hostage",
    ],
  },
  {
    code: "SYS-03",
    system: "Incubator",
    title: "Incubator Lab",
    tag: "Where field patterns become products",
    body: "The same problems show up across clients. When one is worth solving properly, we build it as a product in the Lab — funded by our services work, shaped by real operators, and open to partners who want to co-build or be first to run it.",
    items: [
      "Products born from repeated client patterns",
      "Design partners get early access and a say in the roadmap",
      "First product: an agentic harness for property management",
      "Co-build and revenue-share for the right partner",
    ],
  },
];

export default function Capabilities() {
  return (
    <section id="what">
      <div className="wrap">
        <div className="sec-head">
          <div className="idx mono reveal">01 / Capabilities</div>
          <h2 className="reveal">Three systems. Deploy in any order.</h2>
          <p className="rise">
            Most clients start with one and end up using two. Enablement builds
            the capability, Automation puts it to work, and the Lab turns what we
            learn in the field into products.
          </p>
        </div>

        <div className="modules">
          {MODULES.map((m) => (
            <div key={m.code} className="module brushed rivets rise">
              <i className="rv tr" />
              <i className="rv bl" />
              <i className="led" />
              <div className="ports">
                <i />
                <i />
                <i />
              </div>
              <div className="code mono">
                <span>{m.code}</span>
                <span>{m.system}</span>
              </div>
              <h3>{m.title}</h3>
              <span className="tag">{m.tag}</span>
              <p>{m.body}</p>
              <ul>
                {m.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          <Assessment />
        </div>
      </div>
    </section>
  );
}
