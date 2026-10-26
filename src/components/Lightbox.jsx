import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CURTAIN } from "@/components/motion/primitives";
import { lockScroll } from "@/lib/scroll";
import { cn } from "@/lib/utils";

/** Fullscreen image viewer. Render inside <AnimatePresence> and unmount to close. */
export const Lightbox = ({ title, subtitle, images, startIndex = 0, onClose }) => {
  const [[index, dir], setState] = useState([startIndex, 0]);
  const many = images.length > 1;

  const go = useCallback(
    (step) => setState(([i]) => [(i + step + images.length) % images.length, step]),
    [images.length]
  );

  useEffect(() => {
    lockScroll(true);
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && many) go(1);
      if (e.key === "ArrowLeft" && many) go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [go, many, onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[85] flex flex-col bg-black/92 p-3 text-white backdrop-blur-md sm:p-6"
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      animate={{ clipPath: "inset(0% 0 0 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.7, ease: CURTAIN }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="flex items-start justify-between gap-4" onClick={(e) => e.stopPropagation()}>
        <div className="min-w-0">
          <p className="truncate text-lg font-medium sm:text-2xl">{title}</p>
          {subtitle && <p className="truncate text-sm text-white/60">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-3">
          {many && (
            <span className="font-mono text-sm text-white/60">
              {index + 1}/{images.length}
            </span>
          )}
          <button
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:rotate-90 hover:bg-white/20"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center py-4" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={`${title} ${index + 1}`}
            custom={dir}
            variants={{
              enter: (d) => ({ x: d >= 0 ? "40%" : "-40%", opacity: 0, scale: 0.92 }),
              center: { x: 0, opacity: 1, scale: 1 },
              exit: (d) => ({ x: d >= 0 ? "-40%" : "40%", opacity: 0, scale: 0.92 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            drag={many ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) go(1);
              else if (info.offset.x > 80) go(-1);
            }}
            className="max-h-full max-w-full rounded-md object-contain"
            draggable={false}
          />
        </AnimatePresence>
        {many && (
          <>
            <button type="button" onClick={() => go(-1)} className="absolute left-0 grid h-12 w-12 place-items-center rounded-full bg-white/10 backdrop-blur transition hover:bg-white/25 sm:left-4" aria-label="Previous">
              <ChevronLeft />
            </button>
            <button type="button" onClick={() => go(1)} className="absolute right-0 grid h-12 w-12 place-items-center rounded-full bg-white/10 backdrop-blur transition hover:bg-white/25 sm:right-4" aria-label="Next">
              <ChevronRight />
            </button>
          </>
        )}
      </div>

      {many && (
        <div className="no-scrollbar flex justify-start gap-2 overflow-x-auto pb-1 sm:justify-center" onClick={(e) => e.stopPropagation()}>
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setState([i, i > index ? 1 : -1])}
              className={cn(
                "h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition",
                i === index ? "border-white" : "border-transparent opacity-50 hover:opacity-100"
              )}
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </motion.div>,
    document.body
  );
};
