'use client';

import { Children, type ReactNode } from 'react';
import { motion, type Variants } from 'motion/react';

const container: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.1, staggerChildren: 0.12 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(14px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.33, 1, 0.68, 1] },
  },
};

/**
 * Staggers the hero's direct children in from a blur on first paint. The
 * children start at opacity 0 via CSS (`.hero > *` in page.module.css) so
 * there's nothing to flash before this effect attaches.
 */
export function HeroReveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.section className={className} initial="hidden" animate="visible" variants={container}>
      {Children.map(children, (child) => (
        <motion.div variants={item}>{child}</motion.div>
      ))}
    </motion.section>
  );
}
