import { motion } from "motion/react";
import { CURTAIN } from "@/components/motion/primitives";

/**
 * Wraps a routed page. Leaving: a panel rises over the page. Entering: the
 * panel lifts away revealing the new page underneath, with its label.
 */
export const PageTransition = ({ children, label }) => (
  <>
    {children}
    <motion.div
      className="pointer-events-none fixed inset-0 z-[80] origin-bottom bg-ink"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 0 }}
      exit={{ scaleY: 1 }}
      transition={{ duration: 0.7, ease: CURTAIN }}
    />
    <motion.div
      className="pointer-events-none fixed inset-0 z-[80] flex origin-top items-center justify-center bg-ink"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.8, ease: CURTAIN, delay: 0.15 }}
    >
      <motion.span
        className="serif-i text-5xl text-bg sm:text-7xl"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {label}
      </motion.span>
    </motion.div>
  </>
);
