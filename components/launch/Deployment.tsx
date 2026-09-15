const STEPS = [
  {
    when: "Week 00",
    title: "Scope the workflow",
    body: "One working session on the process costing you the most. You get a written scope, a fixed price, and a straight answer on whether AI fits.",
  },
  {
    when: "Weeks 01–02",
    title: "Embed with your team",
    body: "An engineer sits with the people doing the job, maps the real flow including the workarounds, and connects to your systems read-only.",
  },
  {
    when: "Weeks 03–08",
    title: "Ship into production",
    body: "Agents go live behind approval gates. We tune on real volume, widen the gate as trust builds, and instrument everything.",
  },
  {
    when: "Ongoing",
    title: "Hand off or retain",
    body: "Your team gets the repo, the runbook, and the training to operate it. Keep us on a managed retainer or run it yourselves.",
  },
];

export default function Deployment() {
  return (
    <section id="how">
      <div className="wrap">
        <div className="sec-head">
          <div className="idx mono reveal">02 / Deployment</div>
          <h2 className="reveal">How an engagement runs.</h2>
          <p className="rise">
            Forward-deployed means we work where the work happens. Short scoping,
            fast embed, and a handoff that leaves your team in control.
          </p>
        </div>

        <div className="timeline" id="timeline">
          <div className="pipe">
            <i />
          </div>
          {STEPS.map((s) => (
            <div className="step" key={s.when}>
              <span className="valve" />
              <span className="when mono">{s.when}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
