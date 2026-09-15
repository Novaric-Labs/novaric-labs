const CHARTER: [string, string][] = [
  ["Funded", "by the client work"],
  ["Shaped", "by design partners"],
  ["Shipped", "into production"],
];

const STAGES: [string, string, string][] = [
  [
    "Pattern spotted",
    "Recurring",
    "The same workflow breaks the same way at a third client, and the workaround is always manual.",
  ],
  [
    "Worth building?",
    "Gated",
    "A pattern only graduates if nobody has solved it properly and operators say it's worth the trouble.",
  ],
  [
    "Built with partners",
    "Funded",
    "Services revenue pays for the build. Design partners scope it and run it on real volume.",
  ],
  [
    "Runs in production",
    "Shipped",
    "It leaves the Lab as a product, with the partners who shaped it first in line to run it.",
  ],
];

/**
 * The engine-bay panel. Same console chrome as before, but it now diagrams how
 * a problem becomes a Lab product instead of previewing one product's UI. The
 * stage pills ignite in sequence once the panel scrolls into view.
 */
export default function LabPanel() {
  return (
    <div className="console rise" aria-label="How a product enters the Lab">
      <div className="scanline" aria-hidden="true" />
      <div className="console-head mono">
        <b>Novaric Lab — Intake</b>
        <span className="live">
          <i aria-hidden="true" />
          Open
        </span>
      </div>

      <div className="gauges charter">
        {CHARTER.map(([word, sub]) => (
          <div className="gauge" key={word}>
            <b>{word}</b>
            <span className="mono">{sub}</span>
          </div>
        ))}
      </div>

      <ul>
        {STAGES.map(([title, pill, detail]) => (
          <li className="stage" key={title}>
            <span className="t">{title}</span>
            <span className="pill">{pill}</span>
            <span className="d">{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
