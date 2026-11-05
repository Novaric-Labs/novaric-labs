const TIMELINE: [string, string, string][] = [
  ["week 00", "scope", "one workflow, fixed price"],
  ["week 01–02", "embed", "engineer on site, read-only access"],
  ["week 03–08", "ship", "live inside your stack, approvals widen as trust builds"],
  ["ongoing", "hand off", "your team runs it. or we stay."],
];

export default function Proof() {
  return (
    <section className="proof">
      <div className="wrap grid">
        <div className="head">
          <span className="mono">Building now · Property management</span>
          <h2>A back office that runs itself, mostly.</h2>
          <p>
            Lease processing, maintenance routing, tenant communication, and
            vendor coordination, with a human signing off on anything involving
            money or lease terms. Built with design partners, inside the tools
            they already use.
          </p>
        </div>
        <div className="panel">
          {TIMELINE.map(([when, what, detail]) => (
            <div key={what}>
              <span>{when}</span>
              <b>{what}</b>
              <span>{detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
