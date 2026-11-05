import Logo from "@/components/Logo";

/**
 * Centered wordmark on a 12-column row, mono section labels either side.
 * Below 900px the labels collapse and only the brand and Contact remain.
 */
export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap grid">
        <nav className="l mono" aria-label="Primary">
          <a href="#enablement">01 AI enablement</a>
          <a href="#work">02 Work</a>
        </nav>
        <a className="brand" href="#top" aria-label="Novaric Labs, back to top">
          <Logo variant="navy" height={24} priority />
        </a>
        <nav className="r mono" aria-label="Secondary">
          <a href="#fit">03 Fit check</a>
          <a className="ul" href="#contact">
            Contact →
          </a>
        </nav>
      </div>
    </header>
  );
}
