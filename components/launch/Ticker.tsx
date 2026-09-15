const ITEMS: [string, string][] = [
  ["Engineer ", "on-site"],
  ["Approval gate ", "armed"],
  ["Integration ", "read-only"],
  ["Evals ", "passing"],
  ["Kill switch ", "installed"],
  ["Handoff ", "scheduled"],
  ["Incubator lab ", "active"],
  ["Charlotte, NC ", "base"],
];

/**
 * Telemetry ticker. The track is rendered twice so the -50% scroll keyframe
 * loops seamlessly (the original did this by duplicating innerHTML at runtime).
 */
export default function Ticker() {
  return (
    <div className="ticker mono" aria-hidden="true">
      <div className="track" id="track">
        {[0, 1].map((pass) =>
          ITEMS.map(([label, value]) => (
            <span key={`${pass}-${label}`}>
              {label}
              <b>{value}</b>
              <i>/</i>
            </span>
          ))
        )}
      </div>
    </div>
  );
}
