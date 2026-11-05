const ROWS: [string, string, string][] = [
  [
    "Property mgmt",
    "Leasing back office",
    "Lease processing, maintenance routing, tenant communication, vendor coordination. Human sign-off on money and lease terms. Building now with design partners.",
  ],
  [
    "Financial services",
    "Document intake",
    "High-volume, rules-driven, document-heavy review with a human approval gate. Next.",
  ],
  ["Healthcare admin", "Scheduling and follow-up", "Same pattern, same gate. Next."],
  ["Legal and logistics", "Intake and routing", "Watching. Tell us if this is you."],
];

const FIGURES: [string, string][] = [
  ["1", "engineer, on site"],
  ["8", "weeks, fixed price"],
  ["0", "new platforms to buy"],
  ["100%", "owned by your team at handoff"],
];

export default function Work() {
  return (
    <section className="work" id="work">
      <div className="wrap grid">
        <span className="label mono">02 / Where it applies</span>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th scope="col">Sector</th>
                <th scope="col">Workflow</th>
                <th scope="col">What runs</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([sector, workflow, detail]) => (
                <tr key={sector}>
                  <td>{sector}</td>
                  <td>{workflow}</td>
                  <td>{detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="figures">
          {FIGURES.map(([n, label]) => (
            <div className="fig" key={label}>
              <b>{n}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
