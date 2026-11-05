const STEPS: { n: string; title: string; when: string; body: string }[] = [
  {
    n: "01 / Find",
    title: "We sit with the people doing the work.",
    when: "Week 00–02",
    body: "One engineer, on site, mapping the real flow including the workarounds. Read-only access first, and a straight answer on whether AI fits.",
  },
  {
    n: "02 / Build",
    title: "Inside the tools you already run.",
    when: "Week 03–08",
    body: "Email, spreadsheets, your CRM, your property system. Agents handle the volume; people keep the decisions that carry risk.",
  },
  {
    n: "03 / Hand off",
    title: "Code handed over, not held hostage.",
    when: "Ongoing",
    body: "You own the code, the prompts, and the runbook. Training your team is part of the job. Stay on retainer, or don't.",
  },
];

export default function Steps() {
  return (
    <section id="approach">
      <div className="wrap">
        {STEPS.map((s) => (
          <div className="grid row" key={s.n}>
            <span className="n mono">{s.n}</span>
            <h2>{s.title}</h2>
            <div className="body">
              <b className="mono">{s.when}</b>
              {s.body}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
