import Console from "./Console";

const CAPS: [string, string][] = [
  ["Lease processing", "Parse applications, flag exceptions, prep documents for sign-off"],
  ["Maintenance routing", "Triage requests, match the vendor, schedule, follow up until closed"],
  ["Tenant communication", "On-brand replies across email and SMS, escalated when stakes rise"],
  ["Vendor coordination", "Collect quotes, track work orders, reconcile invoices against approved work"],
];

export default function Lab() {
  return (
    <section className="lab" id="lab">
      <div className="wrap">
        <div className="sec-head">
          <div className="idx mono reveal">03 / From the Lab</div>
          <h2 className="reveal">An agentic harness for property management.</h2>
          <p className="rise">
            Our first product runs the repetitive back office of a property
            management company — the email triage, the vendor chase, the document
            shuffle — as coordinated agents instead of manual queues.
          </p>
        </div>

        <div className="cols">
          <div className="rise">
            <span className="mono" style={{ color: "var(--amber)" }}>
              Pre-launch — taking design partners
            </span>
            <h3>Agents handle the routine. You approve what matters.</h3>
            <p>
              Requests come in the way they always do — an email, a maintenance
              ticket, a tenant text. The system handles the busywork and holds
              anything high-stakes for your sign-off: money out, lease terms,
              anything that carries risk. It plugs into the tools your team
              already uses.
            </p>
            <ul className="caps">
              {CAPS.map(([title, sub]) => (
                <li key={title}>
                  {title}
                  <small>{sub}</small>
                </li>
              ))}
            </ul>
            <div className="lab-cta">
              <a
                className="btn btn-amber"
                href="mailto:hello@novariclabs.com?subject=Property%20management%20harness%20%E2%80%94%20design%20partner"
              >
                Become a design partner
              </a>
            </div>
          </div>

          <Console />
        </div>

        <div className="lab-partners rise">
          <div>
            <h3>Have a product the Lab should build?</h3>
            <p>
              If you run an operations-heavy business and keep hitting the same
              wall, we want to hear about it. The best Lab products start as a
              client problem nobody has solved well.
            </p>
          </div>
          <div>
            <h3>Next in the pipeline</h3>
            <p>
              The property management pattern — high volume, rules-driven,
              document-heavy — repeats in financial services back office,
              healthcare admin, legal, and logistics. That&apos;s where we&apos;re
              looking next.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
