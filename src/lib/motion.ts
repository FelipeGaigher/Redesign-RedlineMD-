import type { Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const revealParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export const revealChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
