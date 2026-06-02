import Image from "next/image";
import navyLogo from "@/public/novaric-logo.png";
import whiteLogo from "@/public/novaric-logo-white.png";

type LogoProps = {
  /**
   * Wordmark color. "auto" shows navy in light mode and white in dark mode;
   * "navy"/"white" force a single variant (e.g. on always-dark panels).
   */
  variant?: "auto" | "navy" | "white";
  /** Rendered height in pixels; width scales with the ~4:1 wordmark ratio. */
  height?: number;
  className?: string;
  priority?: boolean;
};

/**
 * The Novaric wordmark (navy "Novaric" with a four-point gold star over the i),
 * rendered from the supplied brand asset. A white-recolored variant is used on
 * dark backgrounds so the gold star is preserved either way.
 */
export default function Logo({
  variant = "auto",
  height = 28,
  className,
  priority = false,
}: LogoProps) {
  const width = Math.round(height * (1850 / 462));
  const common = {
    alt: "Novaric Labs",
    height,
    width,
    priority,
    style: { height, width: "auto" as const },
  };

  if (variant === "auto") {
    return (
      <span className={`inline-flex ${className ?? ""}`}>
        <Image {...common} src={navyLogo} className="block dark:hidden" />
        <Image {...common} src={whiteLogo} className="hidden dark:block" />
      </span>
    );
  }

  return (
    <Image
      {...common}
      src={variant === "white" ? whiteLogo : navyLogo}
      className={className}
    />
  );
}
