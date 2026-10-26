import { motion } from "motion/react";
import { useEffect, useState } from "react";
import cutout from "@/assets/img/isya-cutout.webp";
import { CURTAIN } from "@/components/motion/primitives";

const MIN_MS = 900;
const MAX_MS = 4000;

/**
 * First-visit intro styled as a camera shutter. It stays closed until the
 * fonts and the hero photo have actually loaded (or MAX_MS passes), then opens.
 */
export const Preloader = ({ onDone }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    const start = performance.now();
    const photo = new Promise((resolve) => {
      const img = new Image();
      img.onload = img.onerror = resolve;
      img.src = cutout;
    });
    const fonts = document.fonts?.ready ?? Promise.resolve();
    const timeout = new Promise((resolve) => setTimeout(resolve, MAX_MS));

    Promise.race([Promise.all([photo, fonts]), timeout]).then(() => {
      const wait = Math.max(0, MIN_MS - (performance.now() - start));
      setTimeout(() => {
        if (!alive) return;
        setLoaded(true);
        setTimeout(onDone, 250);
      }, wait);
    });
    return () => {
      alive = false;
    };
  }, [onDone]);

  const exit = { duration: 0.9, ease: CURTAIN };

  return (
    <motion.div className="fixed inset-0 z-[90]" exit={{ pointerEvents: "none" }} transition={{ duration: 0.9 }}>
      <motion.div className="absolute inset-x-0 top-0 h-1/2 bg-ink" exit={{ y: "-100%", transition: exit }} />
      <motion.div className="absolute inset-x-0 bottom-0 h-1/2 bg-ink" exit={{ y: "100%", transition: exit }} />

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        <div className="relative h-40 w-56 text-bg sm:h-48 sm:w-72">
          {[
            "left-0 top-0 border-l border-t",
            "right-0 top-0 border-r border-t",
            "bottom-0 left-0 border-b border-l",
            "bottom-0 right-0 border-b border-r",
          ].map((c) => (
            <span key={c} className={`absolute h-5 w-5 border-current opacity-60 ${c}`} />
          ))}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <p className="text-lg font-medium tracking-tight">Clarisya Adeline</p>
            <p className="flex items-center gap-2 font-mono text-xs text-bg/60">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-red-500"
                animate={{ opacity: loaded ? 1 : [1, 0.2, 1] }}
                transition={{ duration: 1, repeat: loaded ? 0 : Infinity }}
              />
              {loaded ? "ready" : "focusing…"}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
