import Lenis from "lenis";

let lenis = null;

export const initSmoothScroll = () => {
  if (typeof window === "undefined") return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 });
  let frame = 0;
  const raf = (time) => {
    lenis?.raf(time);
    frame = requestAnimationFrame(raf);
  };
  frame = requestAnimationFrame(raf);

  return () => {
    cancelAnimationFrame(frame);
    lenis?.destroy();
    lenis = null;
  };
};

export const scrollToTarget = (target, { immediate = false, offset = -24 } = {}) => {
  if (lenis) {
    lenis.scrollTo(target, {
      offset,
      immediate,
      duration: 1.6,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    });
    return;
  }

  if (target === 0 || target === "top") {
    window.scrollTo({ top: 0, behavior: immediate ? "instant" : "smooth" });
    return;
  }

  const el = typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: immediate ? "instant" : "smooth" });
};

/** Pause smooth scrolling while a modal / menu is open. */
export const lockScroll = (locked) => {
  if (locked) {
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
  } else {
    lenis?.start();
    document.documentElement.style.overflow = "";
  }
};
