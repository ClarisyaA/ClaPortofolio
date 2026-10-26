import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Magnetic } from "@/components/motion/primitives";
import { navItems, useNavGo } from "@/components/chrome/Navbar";
import { scrollToTarget } from "@/lib/scroll";
import { profile } from "@/data/profile";

const useJakartaTime = () => {
  const format = () =>
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Jakarta",
    }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
};

/** "Curtain" footer: it sits fixed behind the page and is uncovered as you reach the end. */
export const Footer = () => {
  const ref = useRef(null);
  const time = useJakartaTime();
  const go = useNavGo();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);
  const letterSpacing = useTransform(scrollYProgress, [0, 1], ["0.12em", "-0.05em"]);

  return (
    <footer
      ref={ref}
      className="relative h-[620px] sm:h-[560px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 h-[620px] w-full bg-ink text-bg sm:h-[560px]">
        <motion.div style={{ y }} className="container-x flex h-full flex-col justify-between pb-6 pt-16">
          <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <p className="eyebrow !text-bg/50">Email</p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-3 block text-2xl font-medium tracking-tight [overflow-wrap:anywhere] transition-colors hover:text-accent lg:text-4xl"
              >
                {profile.email}
              </a>
            </div>
            <div>
              <p className="eyebrow mb-4 !text-bg/50">Menu</p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-1">
                {[...navItems, { name: "Blog", path: "/blog" }].map((item) => (
                  <li key={item.name}>
                    <button type="button" onClick={() => go(item)} className="text-bg/70 transition-colors hover:text-bg">
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4 !text-bg/50">Socials</p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-1">
                {profile.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-bg/70 transition-colors hover:text-bg">
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-end justify-between gap-4 text-xs text-bg/50">
              <div className="space-y-1">
                <p>Local time · Jatinangor</p>
                <p className="font-mono text-sm text-bg tabular-nums">{time} WIB</p>
              </div>
              <Magnetic>
                <button
                  type="button"
                  onClick={() => scrollToTarget(0)}
                  className="grid h-14 w-14 place-items-center rounded-full border border-bg/20 text-bg transition-colors hover:bg-bg hover:text-ink"
                  aria-label="Back to top"
                >
                  <ArrowUp size={18} />
                </button>
              </Magnetic>
            </div>
            <motion.p
              style={{ letterSpacing }}
              className="select-none whitespace-nowrap text-center text-[19vw] font-semibold leading-[0.8] tracking-tighter sm:text-[17vw]"
              aria-hidden="true"
            >
              clarisya<span className="text-taupe">.</span>
            </motion.p>
            <div className="mt-4 flex justify-between text-[11px] text-bg/40">
              <span>© {new Date().getFullYear()} {profile.firstName} {profile.lastName}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
