"use client";

import { motion } from "framer-motion";

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

export default function Reveal({
  effect = "fadeInUp",
  delay = 0,
  speed = "normal",
  className,
  children,
}: {
  effect?: Effect;
  delay?: number; // ms, like Elementor's _animation_delay
  speed?: Speed;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial={from[effect]}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: seconds[speed], delay: delay / 1000, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
