export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap grid">
        <div className="lines" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
        <div className="idx mono">
          AI enablement
          <br />
          Charlotte, NC
          <br />
          Est. 2025
        </div>
        <h1>
          <span>Actually</span>
          <span>use</span>
          <span className="gold">AI.</span>
        </h1>
        <p className="lede">
          A senior engineer embeds with your operations team, builds AI into the
          tools you already run, and leaves your people able to keep it going.
          Not a deck. Not a demo.
        </p>
        <div className="actions">
          <a className="btn fill" href="#contact">
            Talk to an engineer
          </a>
          <a className="ul" href="#fit">
            Two-minute fit check
          </a>
        </div>
      </div>
    </section>
  );
}
