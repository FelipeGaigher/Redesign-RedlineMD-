/* Wordmark: "Redline" struck through in red, the product's own gesture. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-1 font-serif text-[22px] font-medium tracking-[-0.01em] text-ink ${className}`}>
      <span className="relative inline-block leading-none">
        Redline
        <span aria-hidden className="absolute left-[-2px] right-[-2px] top-[47%] h-[2px] bg-redline" />
      </span>
      <span className="font-sans text-[13px] font-semibold tracking-[0.08em] text-ink">MD</span>
    </span>
  );
}
