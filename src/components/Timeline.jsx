import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Images } from "lucide-react";
import { useRef, useState } from "react";
import { EASE, Img } from "@/components/motion/primitives";
import { Lightbox } from "@/components/Lightbox";
import { cn } from "@/lib/utils";

const TimelineItem = ({ item, index, onOpen }) => {
  const right = index % 2 === 1;
  return (
    <motion.li
      className={cn("relative grid gap-4 pl-10 md:grid-cols-2 md:gap-16 md:pl-0")}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <motion.span
        className="absolute left-[7px] top-2 z-10 h-4 w-4 rounded-full border-[3px] border-bg bg-accent md:left-1/2 md:-translate-x-1/2"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.2 }}
      />

      <div className={cn("md:pt-0", right ? "md:order-2" : "md:text-right")}>
        <p className="font-serif text-lg italic text-accent">{item.date}</p>
        <h3 className="mt-1 text-2xl font-medium leading-tight tracking-tight sm:text-3xl">{item.title}</h3>
        <p className="mt-1 text-muted">{item.place}</p>
        <p className={cn("mt-4 max-w-md text-[15px] leading-relaxed text-ink/80", !right && "md:ml-auto")}>{item.description}</p>
        <div className={cn("mt-4 flex flex-wrap gap-2", !right && "md:justify-end")}>
          <span className="chip">{item.type}</span>
          {item.category && <span className="chip">{item.category}</span>}
        </div>
      </div>

      {item.images?.length > 0 && (
        <button
          type="button"
          onClick={() => onOpen(item)}
          className={cn("group relative block w-full max-w-md overflow-hidden rounded-md", right ? "md:order-1 md:ml-auto" : "")}
        >
          <Img
            src={item.images[0]}
            alt={item.title}
            className="aspect-[16/10] w-full"
            imgClassName="transition-transform duration-700 group-hover:scale-105"
          />
          {item.images.length > 1 && (
            <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded bg-black/60 px-3 py-1 text-xs text-white backdrop-blur">
              <Images size={13} /> {item.images.length}
            </span>
          )}
        </button>
      )}
    </motion.li>
  );
};

/** Vertical timeline whose spine draws itself as you scroll. */
export const Timeline = ({ items }) => {
  const ref = useRef(null);
  const [open, setOpen] = useState(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <div ref={ref} className="relative">
      <div className="absolute bottom-0 left-[14px] top-0 w-px bg-line md:left-1/2" />
      <motion.div className="absolute bottom-0 left-[14px] top-0 w-px origin-top bg-accent md:left-1/2" style={{ scaleY }} />
      <ul className="space-y-20 sm:space-y-28">
        {items.map((item, i) => (
          <TimelineItem key={`${item.title}-${item.place}`} item={item} index={i} onOpen={setOpen} />
        ))}
      </ul>

      <AnimatePresence>
        {open && (
          <Lightbox key={open.title} title={open.title} subtitle={`${open.place} · ${open.date}`} images={open.images} onClose={() => setOpen(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};
