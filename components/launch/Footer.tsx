import Logo from "@/components/Logo";

const LINKS = [
  { href: "#what", label: "Capabilities" },
  { href: "#how", label: "Deployment" },
  { href: "#lab", label: "The Lab" },
  { href: "#why", label: "Principles" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="row">
          <div>
            <div className="brand">
              <Logo variant="white" height={19} />
              Labs
            </div>
            <p style={{ maxWidth: "40ch" }}>
              Forward-deployed engineering for AI enablement, automation, and new
              products. Charlotte, North Carolina.
            </p>
          </div>
          <nav aria-label="Footer">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="fine mono">
          <span>© 2026 Novaric Labs</span>
          <span>Built in Charlotte. Designed to run in production.</span>
        </div>
      </div>
    </footer>
  );
}
