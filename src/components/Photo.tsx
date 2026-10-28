import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  /* Shown on the placeholder until the real asset from IMAGE-MAP.md is dropped into /public/images. */
  slot: string;
  className?: string;
  priority?: boolean;
  /* Avatars: too small for the slot label. */
  compact?: boolean;
};

export function Photo({ src, alt, slot, className = "", priority = false, compact = false }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-end bg-[linear-gradient(135deg,#e9e6dd,#dcd8cc)] p-3 ${className}`}
      >
        {!compact && <span className="rounded-full bg-white/70 px-2.5 py-1 font-mono text-[11px] text-muted">{slot}</span>}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
