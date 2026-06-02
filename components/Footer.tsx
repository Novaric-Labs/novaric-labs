import { MapPin } from "lucide-react";
import Logo from "./Logo";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#platform", label: "Platform" },
  { href: "#industries", label: "Industries" },
  { href: "#why", label: "Why Novaric" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-panel-line bg-panel text-panel-fg">
      <div className="mx-auto max-w-content px-6 py-14 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo variant="white" height={26} />
            <p className="mt-4 text-sm leading-relaxed text-panel-muted">
              AI consulting and agentic infrastructure for operations teams.
              We build the systems that make AI work for your business.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-panel-muted">
              <MapPin size={15} className="text-accent" />
              Charlotte, North Carolina
            </p>
          </div>

          <nav className="flex flex-col gap-3" aria-label="Footer">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-panel-muted transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            ))}
            <a
              href="mailto:hello@novariclabs.com"
              className="text-sm text-panel-muted transition-colors hover:text-accent"
            >
              hello@novariclabs.com
            </a>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-panel-line pt-6 text-xs text-panel-muted/80 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Novaric Labs. All rights reserved.</p>
          <p>Built in Charlotte. Designed to run in production.</p>
        </div>
      </div>
    </footer>
  );
}
