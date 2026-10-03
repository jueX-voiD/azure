"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Effect = "fadeInUp" | "fadeInLeft" | "fadeInRight" | "fadeIn";
type Speed = "fast" | "normal" | "slow";

// Values read from the live Elementor site (animate.css keyframes):
// translate 100% of the element's own size, 1.25s default, ease timing.
const from: Record<Effect, { opacity: number; x?: string; y?: string }> = {
  fadeInUp: { opacity: 0, y: "100%" },
  fadeInLeft: { opacity: 0, x: "-100%" },
  fadeInRight: { opacity: 0, x: "100%" },
  fadeIn: { opacity: 0 },
};
const seconds: Record<Speed, number> = { fast: 0.75, normal: 1.25, slow: 2 };

// The outer wrapper never moves, so it is what gets observed; otherwise an
// element translated out of view (or clipped by a parent) would never trigger.
export default function Reveal({
  effect = "fadeInUp",
  delay = 0,
  speed = "normal",
  className,
  innerClassName,
  children,
}: {
  effect?: Effect;
  delay?: number; // ms, like Elementor's _animation_delay
  speed?: Speed;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={className}>
      <motion.div
        className={innerClassName}
        initial={from[effect]}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : from[effect]}
        transition={{
          duration: seconds[speed],
          delay: delay / 1000,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
