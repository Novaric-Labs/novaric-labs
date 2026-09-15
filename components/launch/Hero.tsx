import Supernova from "./Supernova";

const CHECKLIST: [string, string][] = [
  ["[ok]", "engineer embedded with ops team"],
  ["[ok]", "connected to existing stack, read-only"],
  ["[ok]", "approval gate armed"],
  ["[go]", "ignition, shipping to production"],
];

const STRIP: [string, string][] = [
  ["AI Enablement", "Your team learns to build with it"],
  ["Automation", "Agents that take real action"],
  ["Incubator Lab", "New products from the field"],
];

/**
 * Payload bay. The boot sequence is pure CSS: the checklist types out on a
 * 0.5s cadence so the `[go]` line lands at ~2.05s, in sync with the core
 * ignition in <Supernova />, and the headline lifts in right behind it.
 */
export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap cols">
        <div>
          <div className="checklist mono" aria-hidden="true">
            {CHECKLIST.map(([state, line]) => (
              <div key={line}>
                <span className="ok">{state}</span>
                <span>{line}</span>
              </div>
            ))}
          </div>

          <h1>
            <span className="line">
              <span>Forward-deployed</span>
            </span>
            <span className="line">
              <span>engineers for AI</span>
            </span>
            <span className="line">
              <span>
                that <em>ships.</em>
              </span>
            </span>
          </h1>

          <p className="lede">
            Novaric Labs embeds senior engineers with your team. We learn the
            workflow, build inside the stack you already run, and leave you with
            systems your people operate — not a deck and a demo.
          </p>

          <div className="actions">
            <a className="btn btn-amber" href="#contact">
              Start an engagement
            </a>
            <a className="btn" href="#what">
              See the capabilities
            </a>
          </div>

          <div className="strip brushed">
            {STRIP.map(([title, sub]) => (
              <div key={title}>
                <b>{title}</b>
                <span>{sub}</span>
              </div>
            ))}
          </div>
        </div>

        <Supernova />
      </div>
    </section>
  );
}
