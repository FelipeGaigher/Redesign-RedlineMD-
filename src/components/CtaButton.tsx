import type { ButtonHTMLAttributes } from "react";
import { ArrowRight } from "./Icons";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "inverse";
  size?: "md" | "lg";
  icon?: React.ReactNode;
};

/* The single primary action style. Hover darkens and slides the arrow 4px. */
export function CtaButton({ variant = "primary", size = "lg", icon, className = "", children, ...rest }: Props) {
  const tone =
    variant === "primary"
      ? "bg-ink text-paper hover:bg-ink-soft"
      : "bg-paper text-ink hover:bg-white";
  const dims = size === "lg" ? "h-14 px-6 text-[17px]" : "h-11 px-4 text-[15px]";
  return (
    <button
      type="button"
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-[-0.005em] transition-colors duration-200 ${tone} ${dims} ${className}`}
      {...rest}
    >
      {icon}
      <span>{children}</span>
      <ArrowRight className="size-[18px] transition-transform duration-200 ease-out group-hover:translate-x-1" />
    </button>
  );
}
