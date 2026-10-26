import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { RevealText, SectionLabel } from "@/components/motion/primitives";
import { skillGroups, skills } from "@/data/profile";
import { cn } from "@/lib/utils";

export const Skills = () => {
  const [group, setGroup] = useState("All");
  const boardRef = useRef(null);
  // dragging is a mouse toy; on touch screens the pills must not trap page scrolling
  const [canDrag] = useState(() => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches);
  const visible = group === "All" ? skills : skills.filter((s) => s.group === group);

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8">
          <div>
            <SectionLabel>Skills</SectionLabel>
            <h2 className="display text-4xl sm:text-6xl mt-5 max-w-2xl">
              <RevealText text="Tools I work with" />
            </h2>
          </div>

          <div className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <div className="flex shrink-0 rounded-md border border-line bg-surface p-1">
              {skillGroups.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGroup(g)}
                  className={cn(
                    "relative whitespace-nowrap rounded px-4 py-2 text-sm transition-colors",
                    group === g ? "text-bg" : "text-muted hover:text-ink"
                  )}
                >
                  {group === g && (
                    <motion.span layoutId="skill-tab" className="absolute inset-0 rounded bg-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                  )}
                  <span className="relative">{g}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={boardRef}
          className="relative mt-12 min-h-[320px] overflow-hidden rounded-lg border border-line bg-surface p-5 sm:p-10"
          style={{
            backgroundImage: "radial-gradient(var(--line) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        >
          <p className="eyebrow mb-6">{canDrag ? "Psst — grab one and toss it around" : "Tap a filter to shuffle my toolbox"}</p>
          <motion.ul layout className="flex flex-wrap gap-3">
            <AnimatePresence mode="popLayout">
              {visible.map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <motion.li
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.4, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24, delay: i * 0.015 }}
                    drag={canDrag}
                    dragConstraints={boardRef}
                    dragElastic={0.6}
                    dragSnapToOrigin
                    dragTransition={{ bounceStiffness: 300, bounceDamping: 14 }}
                    whileHover={{ y: -4, rotate: i % 2 ? 3 : -3 }}
                    whileDrag={{ scale: 1.15, rotate: i % 2 ? 10 : -10, zIndex: 10, boxShadow: "0 20px 40px rgba(0,0,0,0.18)" }}
                    className="flex select-none items-center gap-2.5 rounded-md border border-line bg-bg px-4 py-2.5 text-sm font-medium"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-accent" />
                    {skill.name}
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        </div>
      </div>
    </section>
  );
};
