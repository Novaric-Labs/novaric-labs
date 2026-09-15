const PRINCIPLES = [
  {
    k: "Load path 01",
    title: "Production, not demos",
    body: "We ship systems that survive real volume, edge cases, and the messiness of live operations. A slick prototype isn't the goal.",
  },
  {
    k: "Load path 02",
    title: "Human-in-the-loop by default",
    body: "Agents handle the volume; people keep the decisions that carry risk. Approval gates are designed in from the start, not bolted on.",
  },
  {
    k: "Load path 03",
    title: "We integrate, we don't replace",
    body: "Your team keeps the tools they know. We connect AI into the systems you already run instead of forcing a migration nobody asked for.",
  },
  {
    k: "Load path 04",
    title: "You own what we build",
    body: "The code, the prompts, the evals, the runbook. Forward-deployed means we leave your team able to run it without us.",
  },
];

export default function Principles() {
  return (
    <section id="why">
      <div className="wrap">
        <div className="sec-head">
          <div className="idx mono reveal">04 / Principles</div>
          <h2 className="reveal">Operators who happen to build AI.</h2>
          <p className="rise">
            Plenty of teams can call an API. Fewer understand what it takes to run
            automation inside a business that can&apos;t afford to break.
            That&apos;s the gap we work in.
          </p>
        </div>

        <div className="principles">
          {PRINCIPLES.map((p) => (
            <div className="principle brushed rise" key={p.k}>
              <span className="k mono">{p.k}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>

        <blockquote className="rise">
          “The hard part was never the model. It was making automation that
          operations teams actually trust enough to run every day.”
          <footer>The principle behind everything we ship</footer>
        </blockquote>
      </div>
    </section>
  );
}
