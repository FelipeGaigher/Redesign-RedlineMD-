import type { ButtonHTMLAttributes } from "react";
import { ArrowRight } from "./Icons";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "md" | "lg";
  icon?: React.ReactNode;
};

/* The one primary action style on the page: the brand's yellow with charcoal text (13:1). Hover deepens and slides the arrow 4px. */
export function CtaButton({ size = "lg", icon, className = "", children, ...rest }: Props) {
  const dims = size === "lg" ? "h-14 px-6 text-[17px]" : "h-12 px-5 text-[15px]";
  return (
    <button
      type="button"
      className={`group inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-ui bg-yellow font-semibold text-ink transition-colors duration-200 hover:bg-yellow-hover ${dims} ${className}`}
      {...rest}
    >
      {icon}
      <span>{children}</span>
      <ArrowRight className="size-[18px] transition-transform duration-200 ease-out group-hover:translate-x-1" />
    </button>
  );
}
