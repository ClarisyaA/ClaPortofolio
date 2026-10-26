import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";
import portrait from "@/assets/img/isya1.webp";
import {
  Counter,
  EASE,
  FadeIn,
  Img,
  Magnetic,
  RollButton,
  ScrollHighlight,
  SectionLabel,
} from "@/components/motion/primitives";
import { aboutStatement, focusAreas, profile, stats } from "@/data/profile";
import { scrollToTarget } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const FocusRow = ({ area, index, open, onToggle }) => (
  <motion.li
    className="group relative overflow-hidden border-b border-line"
    onHoverStart={() => window.matchMedia("(hover: hover)").matches && onToggle(index)}
  >
    <span className="absolute inset-0 origin-bottom scale-y-0 bg-accent-soft transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-y-100" />
    <button
      type="button"
      onClick={() => onToggle(open ? null : index)}
      className="relative flex w-full items-center gap-4 py-5 text-left sm:gap-6 sm:px-3"
      aria-expanded={open}
    >
      <span className="font-serif text-sm text-accent">0{index + 1}</span>
      <span className="flex-1 text-2xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">
        {area.title}
      </span>
      <motion.span animate={{ rotate: open ? 45 : 0 }} className="grid h-9 w-9 place-items-center rounded-full border border-line">
        <Plus size={16} />
      </motion.span>
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative overflow-hidden"
        >
          <p className="max-w-xl pb-6 pl-9 text-muted sm:pl-[3.75rem]">{area.description}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.li>
);

export const About = () => {
  const [open, setOpen] = useState(0);

  return (
    <section id="about" className="relative py-24 sm:py-36">
      <div className="container-x">
        <SectionLabel>About me</SectionLabel>

        <ScrollHighlight
          text={aboutStatement}
          className="mt-8 max-w-[22ch] text-[2rem] font-medium leading-[1.08] tracking-[-0.03em] sm:max-w-[26ch] sm:text-5xl lg:text-[4.2rem]"
        />

        <div className="mt-20 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <FadeIn className="lg:sticky lg:top-28 lg:self-start">
            <div className="group relative">
              <Img
                src={portrait}
                alt="Portrait of Clarisya Adeline"
                className="aspect-[4/5] rounded-lg"
                imgClassName="transition-transform duration-[1.2s] group-hover:scale-105"
              />
              <motion.div
                className="absolute -bottom-5 -right-3 rotate-[-6deg] rounded-md bg-ink px-4 py-3 text-sm text-bg shadow-xl sm:-right-6"
                whileHover={{ rotate: 4, scale: 1.05 }}
              >
                <p className="text-bg/60">currently</p>
                <p className="font-medium">{profile.university}</p>
              </motion.div>
            </div>
            <div className="mt-12 flex flex-wrap gap-3">
              <Magnetic>
                <RollButton className="btn-ink" onClick={() => scrollToTarget("#contact")}>
                  Get in touch
                </RollButton>
              </Magnetic>
              <Magnetic>
                <RollButton as="a" className="btn-ghost" href={profile.cvUrl} target="_blank" rel="noopener noreferrer">
                  Download CV <ArrowUpRight size={15} />
                </RollButton>
              </Magnetic>
            </div>
          </FadeIn>

          <div>
            <FadeIn>
              <p className="eyebrow mb-4">What I do</p>
            </FadeIn>
            <ul className="border-t border-line">
              {focusAreas.map((area, i) => (
                <FocusRow key={area.title} area={area} index={i} open={open === i} onToggle={setOpen} />
              ))}
            </ul>

            <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10">
              {stats.map((s, i) => (
                <FadeIn key={s.label} delay={i * 0.08} className={cn("border-t border-line pt-4")}>
                  <Counter value={s.value} suffix={s.suffix} className="block text-5xl font-semibold tracking-tight sm:text-6xl" />
                  <p className="mt-2 max-w-[22ch] text-sm text-muted">{s.label}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
