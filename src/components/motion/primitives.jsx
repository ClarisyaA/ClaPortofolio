import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const EASE = [0.16, 1, 0.3, 1];
export const CURTAIN = [0.76, 0, 0.24, 1];

/** Words slide up from behind a mask when they enter the viewport. */
export const RevealText = ({ text, as: Tag = "span", className, delay = 0, stagger = 0.05, once = true }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "0px 0px -10% 0px" });
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true" className="-mb-[0.06em] inline-block overflow-hidden pb-[0.14em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotate: 4 }}
            animate={inView ? { y: "0%", rotate: 0 } : { y: "110%", rotate: 4 }}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * stagger }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

/** Generic fade-up on enter. */
export const FadeIn = ({ children, className, delay = 0, y = 32, as = "div", ...props }) => {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...props}
    >
      {children}
    </Comp>
  );
};

/** Paragraph whose words light up one by one as you scroll through it. */
export const ScrollHighlight = ({ text, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return <HighlightWord key={i} progress={scrollYProgress} range={[start, end]} word={word} />;
      })}
    </p>
  );
};

const HighlightWord = ({ progress, range, word }) => {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <span className="relative mr-[0.25em] mt-[0.05em]">
      <motion.span style={{ opacity }}>{word}</motion.span>
    </span>
  );
};

/** Element is gently pulled toward the pointer. */
export const Magnetic = ({ children, strength = 0.35, className }) => {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 180, damping: 14, mass: 0.2 });
  const y = useSpring(0, { stiffness: 180, damping: 14, mass: 0.2 });

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={(e) => e.pointerType === "mouse" && onMove(e)}
      onPointerLeave={reset}
      style={{ x, y }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
};

/** Button whose fill rises from the bottom on hover. */
export const RollButton = ({ children, className, as = "button", fill = "bg-accent", ...props }) => {
  const Comp = as;
  return (
    <Comp className={cn("group btn", className)} {...props}>
      <span
        className={cn(
          "absolute inset-0 translate-y-[101%] rounded-[inherit] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0",
          fill
        )}
        aria-hidden="true"
      />
      <span className="relative flex items-center gap-2 transition-colors duration-300 group-hover:text-white">{children}</span>
    </Comp>
  );
};

/** Counts up from 0 when visible. */
export const Counter = ({ value, suffix = "", className }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
};

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/** Marquee whose speed and direction follow your scroll velocity. */
export const VelocityMarquee = ({ children, baseVelocity = 2, className }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const skew = useTransform(smoothVelocity, [-2000, 0, 2000], [-8, 0, 8]);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) direction.current = -1;
    else if (velocityFactor.get() > 0) direction.current = 1;
    moveBy += direction.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <motion.div className="flex w-max flex-nowrap" style={{ x, skewX: skew }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="flex shrink-0 items-center" aria-hidden={i > 0}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/** Image that fades + unblurs once loaded. */
export const Img = ({ src, alt, className, imgClassName, eager = false, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-line/40", className)}>
      {!loaded && !failed && <div className="absolute inset-0 animate-pulse bg-line/50" />}
      {failed ? (
        <div className="absolute inset-0 grid place-items-center text-xs text-muted">image unavailable</div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            "h-full w-full object-cover transition-[opacity,filter,transform] duration-700",
            loaded ? "opacity-100 blur-0" : "opacity-0 blur-md",
            imgClassName
          )}
          {...props}
        />
      )}
    </div>
  );
};


export const SectionLabel = ({ children, className }) => (
  <FadeIn className={cn("eyebrow font-medium", className)} y={12}>
    <span className="h-2 w-2 rounded-[2px] bg-taupe" aria-hidden="true" />
    {children}
  </FadeIn>
);
