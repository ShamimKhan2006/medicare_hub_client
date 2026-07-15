"use client";

import { motion, type Variants } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  /** Direction the content travels in from */
  direction?: "up" | "down" | "left" | "right";
  /** How far it travels, in px */
  distance?: number;
  /** Delay before the animation starts, in seconds — use to stagger siblings */
  delay?: number;
  /** Animation duration, in seconds */
  duration?: number;
  /** Fraction of the element that must be visible before it triggers */
  amount?: number;
  /** If true, animates only the first time it enters view. If false (default), it replays every time you scroll past it — up or down. */
  once?: boolean;
  className?: string;
};

const OFFSETS: Record<NonNullable<RevealProps["direction"]>, (d: number) => { x?: number; y?: number }> = {
  up: (d) => ({ y: d }),
  down: (d) => ({ y: -d }),
  left: (d) => ({ x: d }),
  right: (d) => ({ x: -d }),
};

export default function Reveal({
  children,
  direction = "up",
  distance = 36,
  delay = 0,
  duration = 0.9,
  amount = 0.25,
  once = false,
  className,
}: RevealProps) {
  const offset = OFFSETS[direction](distance);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...offset,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        // A refined "expo out" curve — fast start, long gentle settle.
        // Reads far more premium than the default easeOut.
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Wrap a list (e.g. doctor cards) in <RevealGroup> and each direct child
 * will reveal in sequence as the group scrolls into view — no manual
 * delay math needed per item.
 */
export function RevealGroup({
  children,
  stagger = 0.1,
  amount = 0.15,
  once = false,
  className,
}: {
  children: React.ReactNode;
  stagger?: number;
  amount?: number;
  once?: boolean;
  className?: string;
}) {
  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}