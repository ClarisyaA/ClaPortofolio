import { motion } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/chrome/PageTransition";

/** A 404 you can play with: the digits can be thrown around. */
export const NotFound = () => {
  const boardRef = useRef(null);

  return (
    <PageTransition label="Oops">
      <main ref={boardRef} className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 text-center">
        <div className="flex select-none gap-2 sm:gap-6">
          {["4", "0", "4"].map((d, i) => (
            <motion.span
              key={i}
              drag
              dragConstraints={boardRef}
              dragElastic={0.4}
              whileDrag={{ scale: 1.1, rotate: i === 1 ? 20 : -15 }}
              initial={{ y: 200, opacity: 0, rotate: 20 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.5 + i * 0.12 }}
              className={i === 1 ? "serif-i text-[38vw] leading-none text-taupe sm:text-[16rem]" : "display text-[38vw] sm:text-[16rem]"}
            >
              {d}
            </motion.span>
          ))}
        </div>
        <p className="mt-6 max-w-sm text-lg text-muted">This page got lost somewhere. Throw the numbers around, then head home.</p>
        <Link to="/" className="btn-ink mt-8">
          ← Back home
        </Link>
      </main>
    </PageTransition>
  );
};
