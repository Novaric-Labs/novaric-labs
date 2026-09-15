import Image from "next/image";
import navyLogo from "@/public/novaric-logo.png";
import whiteLogo from "@/public/novaric-logo-white.png";

type LogoProps = {
  /** Wordmark color. The site runs on a dark hull, so "white" is the norm. */
  variant?: "white" | "navy";
  /** Rendered height in pixels; width scales with the ~4:1 wordmark ratio. */
  height?: number;
  className?: string;
  priority?: boolean;
};

/**
 * The Novaric wordmark (a four-point gold star over the i), rendered from the
 * supplied brand asset. The white recolor keeps the gold star intact on dark
 * backgrounds.
 */
export default function Logo({
  variant = "white",
  height = 28,
  className,
  priority = false,
}: LogoProps) {
  const width = Math.round(height * (1850 / 462));

  return (
    <Image
      alt="Novaric"
      src={variant === "white" ? whiteLogo : navyLogo}
      height={height}
      width={width}
      priority={priority}
      style={{ height, width: "auto" }}
      className={className}
    />
  );
}
