import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import { useRef, useState } from "react";
import { FadeIn, Img, Magnetic, RevealText, RollButton, SectionLabel } from "@/components/motion/primitives";
import { techProjects } from "@/data/projects";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const FEATURED = 5;
const featured = techProjects.slice(0, FEATURED);
const more = techProjects.slice(FEATURED);

const hasLink = (url) => url && url !== "#";
const primaryLink = (p) => (hasLink(p.demoUrl) ? p.demoUrl : hasLink(p.githubUrl) ? p.githubUrl : null);

const StackCard = ({ project, index, total, progress }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.35, 1]);
  const targetScale = 1 - (total - index) * 0.04;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const link = primaryLink(project);

  return (
    <div ref={ref} className="sticky top-0 flex h-[100svh] items-center justify-center">
      <motion.article
        style={{ scale, top: `calc(-5vh + ${index * 26}px)` }}
        className={cn(
          "relative grid h-[78svh] max-h-[680px] w-full origin-top grid-rows-[auto_1fr] overflow-hidden rounded-lg border border-line bg-surface text-ink shadow-[0_-20px_50px_-30px_rgba(43,36,32,0.4)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:grid-rows-1"
        )}
      >
        <div className="flex flex-col justify-between gap-6 p-6 sm:p-10">
          <div>
            <div className="flex items-center justify-between text-sm text-muted">
              <span className="font-mono text-xs">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
              <span>{project.role}</span>
            </div>
            <h3 className="mt-4 text-3xl font-semibold leading-[1.02] tracking-tight sm:mt-8 sm:text-5xl">
              {project.title.split(" - ")[0]}
            </h3>
            {project.title.includes(" - ") && (
              <p className="serif-i mt-1 text-xl text-muted sm:text-2xl">{project.title.split(" - ")[1]}</p>
            )}
            <p className="mt-4 hidden max-w-md text-muted sm:block">{project.description}</p>
          </div>
          <div className="space-y-5">
            <ul className="flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <li key={t} className="rounded border border-line px-2 py-0.5 text-xs text-muted">
                  {t}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {hasLink(project.demoUrl) && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md bg-ink px-4 py-2 text-sm font-medium text-bg transition hover:bg-accent"
                >
                  Live <ArrowUpRight size={14} />
                </a>
              )}
              {hasLink(project.githubUrl) && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-line px-4 py-2 text-sm font-medium transition hover:border-ink"
                >
                  <Github size={14} /> Code
                </a>
              )}
            </div>
          </div>
        </div>

        <a
          href={link || undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="relative m-3 mt-0 block min-h-0 min-w-0 overflow-hidden rounded-md md:m-3 md:ml-0"
        >
          <motion.div style={{ scale: imageScale }} className="h-full w-full">
            <Img src={project.image} alt={project.title} className="h-full w-full" />
          </motion.div>
        </a>
      </motion.article>
    </div>
  );
};

const HoverPreviewList = () => {
  const [hovered, setHovered] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 25 });
  const sy = useSpring(y, { stiffness: 200, damping: 25 });

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setHovered(null)}
    >
      <ul className="border-t border-line">
        {more.map((p, i) => {
          const link = primaryLink(p);
          return (
            <FadeIn as="li" key={p.id} delay={i * 0.05} className="border-b border-line">
              <a
                href={link || undefined}
                target="_blank"
                rel="noopener noreferrer"
                onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(p)}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 sm:grid-cols-[3rem_1fr_14rem_auto] sm:py-7"
              >
                <Img src={p.image} alt="" className="h-14 w-14 rounded-md sm:hidden" />
                <span className="hidden font-serif text-accent sm:block">{String(FEATURED + i + 1).padStart(2, "0")}</span>
                <span className="min-w-0">
                  <span className="block truncate text-xl font-medium tracking-tight transition-all duration-500 group-hover:translate-x-3 group-hover:text-accent sm:text-3xl">
                    {p.title}
                  </span>
                  <span className="text-sm text-muted sm:hidden">{p.role}</span>
                </span>
                <span className="hidden text-sm text-muted sm:block">{p.role}</span>
                <ArrowUpRight
                  size={22}
                  className={cn(
                    "transition-transform duration-500 group-hover:rotate-45",
                    !link && "opacity-20"
                  )}
                />
              </a>
            </FadeIn>
          );
        })}
      </ul>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-56 w-80 overflow-hidden rounded-md shadow-2xl [@media(hover:hover)]:block"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-115%" }}
        animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0, rotate: hovered ? -4 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <AnimatePresence mode="popLayout">
          {hovered && (
            <motion.img
              key={hovered.id}
              src={hovered.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export const Work = () => {
  const stackRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });

  return (
    <section id="work" className="relative pt-24 sm:pt-32">
      <div className="container-x">
        <SectionLabel>Projects</SectionLabel>
        <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="display text-4xl sm:text-6xl max-w-3xl">
            <RevealText text="Selected AI, data and web projects" />
          </h2>
          <FadeIn className="max-w-sm text-muted">
            Five in detail below, the rest in a list after them. Each one links to a live demo, video or repository where there is one.
          </FadeIn>
        </div>

        <div ref={stackRef} className="relative mt-10">
          {featured.map((p, i) => (
            <StackCard key={p.id} project={p} index={i} total={featured.length} progress={scrollYProgress} />
          ))}
        </div>

        <div className="pb-8 pt-16">
          <p className="eyebrow mb-6">More projects</p>
          <HoverPreviewList />
          <div className="mt-12 flex justify-center">
            <Magnetic>
              <RollButton as="a" href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <Github size={16} /> More on GitHub
              </RollButton>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
};
