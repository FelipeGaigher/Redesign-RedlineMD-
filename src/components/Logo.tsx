/* The Redline MD logo as the client uses it today (bolt + REDLINE red + MD navy), with the misspelled tagline cropped off. */
export function Logo({ className = "", tone = "color" }: { className?: string; tone?: "color" | "white" }) {
  const src = tone === "color" ? "/brand/redlinemd-logo.webp" : "/brand/redlinemd-logo-white.webp";
  return <img src={src} alt="Redline MD" width={560} height={126} className={`h-7 w-auto lg:h-8 ${className}`} />;
}
