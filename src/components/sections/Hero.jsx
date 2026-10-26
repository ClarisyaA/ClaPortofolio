import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDownRight, Camera } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import cutout from "@/assets/img/isya-cutout.webp";
import { EASE, Magnetic, RollButton, VelocityMarquee } from "@/components/motion/primitives";
import { profile, roles } from "@/data/profile";
import { crochetProjects, photographyProjects } from "@/data/projects";
import { scrollToTarget } from "@/lib/scroll";

// alternate crochet pieces and photos for the film strip
const filmFrames = crochetProjects
  .slice(0, 8)
  .flatMap((c, i) => [c, photographyProjects[i % photographyProjects.length]])
  .map((p) => ({ title: p.title, src: p.images[0] }));

const Letters = ({ word, ready, delay = 0, className }) => (
  <span className={className} aria-label={word}>
    {word.split("").map((char, i) => (
      <span key={i} className="-mb-[0.1em] inline-block overflow-hidden pb-[0.16em] align-bottom" aria-hidden="true">
        <motion.span
          className="inline-block will-change-transform"
          initial={{ y: "105%" }}
          animate={ready ? { y: "0%" } : { y: "105%" }}
          transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.04 }}
        >
          {char}
        </motion.span>
      </span>
    ))}
  </span>
);

const RotatingRole = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % roles.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={roles[i]}
          className="whitespace-nowrap font-medium text-accent"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/** 35mm-style strip of real crochet pieces and photos; speed follows scroll velocity. */
const FilmStrip = () => (
  <div
    className="relative bg-ink py-3"
    style={{
      backgroundImage:
        "radial-gradient(circle, var(--bg) 2.2px, transparent 2.6px), radial-gradient(circle, var(--bg) 2.2px, transparent 2.6px)",
      backgroundSize: "18px 10px, 18px 10px",
      backgroundPosition: "0 2px, 0 calc(100% - 2px)",
      backgroundRepeat: "repeat-x",
    }}
  >
    <VelocityMarquee baseVelocity={-1.2}>
      {filmFrames.map((f, i) => (
        <button
          key={`${f.src}-${i}`}
          type="button"
          onClick={() => scrollToTarget("#gallery")}
          className="group mx-1 shrink-0 text-left"
          aria-label={`${f.title} — open gallery`}
        >
          <span className="block h-24 w-32 overflow-hidden bg-line sm:h-28 sm:w-40">
            <img
              src={f.src}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover grayscale-[35%] transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
            />
          </span>
          <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-bg/50">
            {String(i + 1).padStart(2, "0")}A · {f.title}
          </span>
        </button>
      ))}
    </VelocityMarquee>
  </div>
);

export const Hero = ({ ready }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const lineLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const lineRight = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // pointer-driven tilt for the photo (mouse only)
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });

  const onPointerMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onPointerMove}
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24 sm:pt-28"
    >
      <div className="container-x relative flex flex-1 flex-col">
        <motion.div
          className="flex items-center justify-between text-sm text-muted"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <span>{profile.university}</span>
          <span className="hidden sm:inline">{profile.location}</span>
        </motion.div>

        <div className="relative mt-6 flex flex-1 flex-col justify-center sm:mt-2">
          <motion.h1 style={{ x: lineLeft }} className="display relative z-[1] text-[22vw] sm:text-[16vw] lg:text-[13.5vw]">
            <Letters word={profile.firstName} ready={ready} />
          </motion.h1>
          <motion.p
            style={{ x: lineRight }}
            className="serif-i relative z-[3] -mt-[2vw] self-end pr-[2vw] text-[22vw] leading-[0.9] text-taupe sm:text-[16vw] lg:text-[13.5vw]"
            aria-hidden="true"
          >
            <Letters word={profile.lastName} ready={ready} delay={0.2} />
          </motion.p>

          <motion.div
            className="pointer-events-none relative order-first z-[2] mx-auto -mb-4 w-[56vw] max-w-[420px] sm:absolute sm:left-1/2 sm:top-1/2 sm:order-none sm:mb-0 sm:w-[32vw] sm:-translate-x-1/2 sm:-translate-y-[46%]"
            style={{ y: photoY, perspective: 900 }}
            initial={{ opacity: 0, y: 40 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
          >
            <motion.img
              src={cutout}
              alt="Clarisya holding a digital camera and waving"
              className="w-full drop-shadow-[0_24px_30px_rgba(43,36,32,0.22)]"
              style={{ rotateX, rotateY }}
              draggable={false}
            />
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: fade }}
          className="relative z-[4] grid items-end gap-6 pb-8 pt-6 sm:grid-cols-[1fr_auto] sm:gap-10"
        >
          <motion.p
            className="max-w-md text-lg leading-snug sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: EASE, delay: 0.9 }}
          >
            I build <RotatingRole />
            <span className="mt-1 block text-base text-muted sm:text-lg">Away from the keyboard, I crochet and take photos.</span>
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: EASE, delay: 1 }}
          >
            <Magnetic>
              <RollButton className="btn-ink" onClick={() => scrollToTarget("#work")}>
                See projects <ArrowDownRight size={16} />
              </RollButton>
            </Magnetic>
            <Magnetic>
              <RollButton className="btn-ghost" onClick={() => scrollToTarget("#play")}>
                <Camera size={16} /> Try the photobooth
              </RollButton>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      <FilmStrip />
    </section>
  );
};
