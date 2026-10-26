import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { PageTransition } from "@/components/chrome/PageTransition";
import { EASE, FadeIn, Img, RevealText, SectionLabel } from "@/components/motion/primitives";
import { Timeline } from "@/components/Timeline";
import { certifications, experiences, timelineExperiences } from "@/data/experiences";
import { cn } from "@/lib/utils";

const filters = [
  { id: "all", label: "Everything", items: timelineExperiences },
  { id: "work", label: "Experience", items: experiences.work },
  { id: "org", label: "Organizational", items: experiences.org },
  { id: "volunteer", label: "Volunteer", items: experiences.volunteer },
];

export const Experience = () => {
  const [active, setActive] = useState("all");
  const current = filters.find((f) => f.id === active);

  return (
    <PageTransition label="Journey">
      <main className="pt-32 sm:pt-40">
        <section className="container-x">
          <SectionLabel>Work, organizations and volunteering</SectionLabel>
          <h1 className="display mt-5 text-6xl sm:text-8xl">
            <RevealText text="Experience" delay={0.6} />
          </h1>

          <div className="mt-12 grid gap-6 border-y border-line py-8 sm:grid-cols-3">
            {[
              [timelineExperiences.length, "roles & projects"],
              [experiences.org.length, "organizational roles"],
              [certifications.length, "certifications"],
            ].map(([n, label], i) => (
              <FadeIn key={label} delay={0.8 + i * 0.08}>
                <p className="text-5xl font-semibold tracking-tight">{n}</p>
                <p className="text-sm text-muted">{label}</p>
              </FadeIn>
            ))}
          </div>

          <div className="no-scrollbar -mx-4 mt-12 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <div className="flex w-max rounded-md border border-line bg-surface p-1">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActive(f.id)}
                  className={cn("relative whitespace-nowrap rounded px-5 py-2 text-sm", active === f.id ? "text-bg" : "text-muted hover:text-ink")}
                >
                  {active === f.id && <motion.span layoutId="exp-tab" className="absolute inset-0 rounded bg-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                  <span className="relative">
                    {f.label} <span className="opacity-50">{f.items.length}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <motion.div key={active} className="mt-20" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
            <Timeline items={current.items} />
          </motion.div>
        </section>

        <section className="container-x py-28 sm:py-40">
          <SectionLabel>Certifications</SectionLabel>
          <h2 className="display text-4xl sm:text-6xl mt-5">
            <RevealText text="Certifications" />
          </h2>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((c, i) => (
              <FadeIn key={c.title} delay={(i % 3) * 0.08}>
                <a
                  href={encodeURI(c.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group card flex h-full flex-col overflow-hidden p-2 transition-colors hover:border-ink"
                >
                  <Img src={c.image} alt={c.title} className="aspect-[4/3] rounded-md" imgClassName="object-contain bg-white p-2 transition-transform duration-700 group-hover:scale-105" />
                  <div className="flex flex-1 items-start justify-between gap-4 p-4">
                    <div>
                      <p className="font-medium leading-snug">{c.title}</p>
                      <p className="mt-1 text-sm text-muted">
                        {c.issuer} · {c.year}
                      </p>
                    </div>
                    <ArrowUpRight size={18} className="shrink-0 transition-transform duration-500 group-hover:rotate-45" />
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </section>
      </main>
    </PageTransition>
  );
};
