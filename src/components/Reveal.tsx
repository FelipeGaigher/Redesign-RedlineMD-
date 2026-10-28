import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { revealChild, revealParent } from "../lib/motion";

/* Section-level reveal: children marked with <RevealItem> stagger in by 80ms. */
export function Reveal({ children, className = "", as = "div" }: { children: ReactNode; className?: string; as?: "div" | "ol" | "ul" }) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      variants={revealParent}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({ children, className = "", as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" | "p" | "h2" }) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={revealChild}>
      {children}
    </Comp>
  );
}
