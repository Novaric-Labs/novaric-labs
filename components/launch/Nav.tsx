import Logo from "@/components/Logo";

/**
 * The instrument panel: sticky, translucent, with a live telemetry readout
 * that appears once there's room for it (≥1120px).
 */
export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-row">
        <a className="brand" href="#top" aria-label="Novaric Labs home">
          <Logo variant="white" height={19} priority />
          Labs
        </a>

        <nav className="nav-links" aria-label="Primary">
          <a href="#what">Capabilities</a>
          <a href="#how">Deployment</a>
          <a href="#lab">The Lab</a>
          <a href="#why">Principles</a>
        </nav>

        <span className="tele mono">
          <span>
            <i aria-hidden="true" />
            Sys <b>nominal</b>
          </span>
          <span>
            T-minus <b>Q4 2026</b>
          </span>
        </span>

        <a className="btn btn-amber" href="#contact">
          Start an engagement
        </a>
      </div>
    </header>
  );
}
