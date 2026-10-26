import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/chrome/ThemeToggle";
import { ArrowUpRight } from "lucide-react";
import { CURTAIN, EASE } from "@/components/motion/primitives";
import { lockScroll, scrollToTarget } from "@/lib/scroll";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export const navItems = [
  { name: "About", hash: "#about" },
  { name: "Work", hash: "#work" },
  { name: "Play", hash: "#play" },
  { name: "Gallery", hash: "#gallery" },
  { name: "Journey", path: "/experience" },
  { name: "Contact", hash: "#contact" },
];

/** Shared navigation logic: hashes scroll on the home page, or travel home first. */
export const useNavGo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (item) => {
    if (item.hash) {
      if (location.pathname === "/") scrollToTarget(item.hash);
      else navigate("/", { state: { scrollTo: item.hash } });
      return;
    }
    if (item.path !== location.pathname) navigate(item.path);
  };
};

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState(null);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const go = useNavGo();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 400 && !open);
  });

  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActive(location.pathname);
      return;
    }
    // "top" and "skills" are watched too so leaving a nav section clears the highlight
    const ids = [...navItems.filter((i) => i.hash).map((i) => i.hash.slice(1)), "top", "skills", "journey"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    const timer = setTimeout(() => {
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 500);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [location.pathname]);

  const handle = (item) => {
    setOpen(false);
    setTimeout(() => go(item), open ? 450 : 0);
  };

  const isActive = (item) => (item.hash ? active === item.hash : active === item.path);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[58]"
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="container-x flex items-center justify-between gap-4 py-4">
          <button
            type="button"
            onClick={() => handle({ hash: "#top" })}
            className="group relative z-[70] flex items-center gap-3 text-sm font-medium"
            aria-label="Clarisya Adeline — back to top"
          >
            <img src="/projects/Logo/png/LogoOri-mark.webp" alt="" className="h-8 w-auto dark:hidden" />
            <img src="/projects/Logo/png/LogoPutih-mark.webp" alt="" className="hidden h-8 w-auto dark:block" />
            <span className="hidden whitespace-nowrap transition-colors group-hover:text-accent sm:block">
              {profile.firstName} {profile.lastName}
            </span>
          </button>

          <nav
            className="hidden items-center rounded-md border border-line bg-surface/80 p-1 backdrop-blur-xl lg:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => handle(item)}
                onMouseEnter={() => setHovered(item.name)}
                className={cn(
                  "relative rounded px-4 py-2 text-sm transition-colors duration-300",
                  isActive(item) ? "text-bg" : "text-ink/70 hover:text-ink"
                )}
              >
                {isActive(item) && (
                  <motion.span layoutId="nav-active" className="absolute inset-0 rounded bg-ink" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                {hovered === item.name && !isActive(item) && (
                  <motion.span layoutId="nav-hover" className="absolute inset-0 rounded bg-accent-soft" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{item.name}</span>
              </button>
            ))}
          </nav>

          <div className="relative z-[70] flex items-center gap-2">
            <ThemeToggle />
            <a
              href={profile.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ink hidden !py-2.5 hover:bg-accent lg:inline-flex"
            >
              Résumé <ArrowUpRight size={14} />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="relative grid h-10 w-10 place-items-center rounded-md bg-ink text-bg lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className="relative block h-3 w-4">
                <motion.span
                  className="absolute left-0 top-0 h-[1.5px] w-full bg-current"
                  animate={open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 h-[1.5px] w-full bg-current"
                  animate={open ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[55] flex flex-col bg-ink text-bg lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 36px) 36px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 36px) 36px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 36px) 36px)" }}
            transition={{ duration: 0.7, ease: CURTAIN }}
          >
            <div className="container-x flex flex-1 flex-col justify-center gap-1 pt-20">
              
              {[{ name: "Home", hash: "#top" }, ...navItems, { name: "Blog", path: "/blog" }].map((item, i) => (
                <div key={item.name} className="overflow-hidden">
                  <motion.button
                    type="button"
                    onClick={() => handle(item)}
                    className="flex w-full items-baseline gap-4 py-1 text-left text-5xl font-medium tracking-tight"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.05 }}
                  >
                    <span className={cn(isActive(item) && "text-accent")}>{item.name}</span>
                  </motion.button>
                </div>
              ))}
            </div>
            <motion.div
              className="container-x flex flex-wrap gap-x-6 gap-y-2 pb-10 text-sm text-bg/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
            >
              {profile.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-bg">
                  {s.label} ↗
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
