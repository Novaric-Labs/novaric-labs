import LabPanel from "./LabPanel";

const CAPS: [string, string][] = [
  [
    "Patterns, not bets",
    "A problem gets promoted only after it has cost several clients real time and money",
  ],
  [
    "Funded by the fieldwork",
    "Services revenue pays for the build, so the roadmap answers to operators, not a term sheet",
  ],
  [
    "Design partners from day zero",
    "The people who'll run it help scope it, test it on real volume, and set the order of work",
  ],
  [
    "Co-build or first to run",
    "Partners can take early access, a seat on the roadmap, or a revenue share in what gets built",
  ],
];

export default function Lab() {
  return (
    <section className="lab" id="lab">
      <div className="wrap">
        <div className="sec-head">
          <div className="idx mono reveal">03 / The Lab</div>
          <h2 className="reveal">The Lab turns repeat problems into products.</h2>
          <p className="rise">
            Every engagement leaves us with the same observation: some workflow
            breaks the same way at every client, and nobody has solved it
            properly. When a pattern shows up often enough, it graduates into the
            Lab and gets built as a product.
          </p>
        </div>

        <div className="cols">
          <div className="rise">
            <span className="mono" style={{ color: "var(--amber)" }}>
              The incubator model
            </span>
            <h3>Client work pays for it. Operators shape it.</h3>
            <p>
              The Lab isn&apos;t a research group or a side bet. It&apos;s funded
              by the services business, which means a product doesn&apos;t have to
              raise a round — it has to work for the people who asked for it.
              Design partners are in the room before the first line of code, and
              they keep a say in where it goes.
            </p>
            <ul className="caps">
              {CAPS.map(([title, sub]) => (
                <li key={title}>
                  {title}
                  <small>{sub}</small>
                </li>
              ))}
            </ul>

            <p className="lab-first">
              <span className="mono">Now in build</span>
              First out of the Lab: an agentic harness for property management —
              pre-launch, and taking design partners.
            </p>

            <div className="lab-cta">
              <a
                className="btn btn-amber"
                href="mailto:hello@novariclabs.com?subject=Incubator%20Lab%20%E2%80%94%20a%20problem%20worth%20building%20for"
              >
                Bring the Lab a problem
              </a>
              <a
                className="btn"
                href="mailto:hello@novariclabs.com?subject=Property%20management%20harness%20%E2%80%94%20design%20partner"
              >
                Become a design partner
              </a>
            </div>
          </div>

          <LabPanel />
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
