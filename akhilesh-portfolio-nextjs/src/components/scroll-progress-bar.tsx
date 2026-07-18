'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-0.5 origin-left bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500 z-[60] no-print"
    />
  );
}
