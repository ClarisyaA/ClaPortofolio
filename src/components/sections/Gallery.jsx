import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { EASE, FadeIn, Img, Magnetic, RevealText, RollButton, SectionLabel } from "@/components/motion/primitives";
import { Lightbox } from "@/components/Lightbox";
import { crochetOrderUrl, crochetProjects, photographyProjects } from "@/data/projects";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "crochet", label: "Crochet", items: crochetProjects, blurb: "Handmade amigurumi from my little shop, ClaviaCrochet." },
  { id: "photo", label: "Photography", items: photographyProjects, blurb: "Quiet moments — sunrises, forests, and home." },
];

const PAGE = 12;

export const Gallery = () => {
  const [tab, setTab] = useState(tabs[0].id);
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState(null);
  const current = tabs.find((t) => t.id === tab);
  const items = showAll ? current.items : current.items.slice(0, PAGE);

  return (
    <section id="gallery" className="relative overflow-hidden bg-ink py-24 text-bg sm:py-36">
      <div className="container-x">
        <SectionLabel className="!text-bg/50">
          Off-screen
        </SectionLabel>
        <div className="mt-6 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="display text-4xl sm:text-6xl">
            <RevealText text="Crochet and photography" />
          </h2>
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <div className="flex rounded-md border border-bg/15 p-1">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTab(t.id);
                    setShowAll(false);
                  }}
                  className={cn("relative rounded px-5 py-2 text-sm transition-colors", tab === t.id ? "text-ink" : "text-bg/60 hover:text-bg")}
                >
                  {tab === t.id && <motion.span layoutId="gallery-tab" className="absolute inset-0 rounded bg-bg" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                  <span className="relative">
                    {t.label} <span className="opacity-50">{t.items.length}</span>
                  </span>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={tab}
                className="max-w-xs text-bg/60 lg:text-right"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                {current.blurb}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <motion.div layout className="mt-14 columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.button
                key={`${tab}-${item.id}`}
                type="button"
                layout
                onClick={() => setOpen(item)}
                initial={{ opacity: 0, y: 60, rotate: i % 2 ? 3 : -3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "0px 0px -5% 0px" }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: EASE, delay: (i % 4) * 0.06 }}
                className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-md text-left sm:mb-4"
              >
                <Img
                  src={item.images[0]}
                  alt={item.title}
                  className={cn("w-full", i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]")}
                  imgClassName="transition-transform duration-[900ms] ease-[var(--ease-expo)] group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/0 to-transparent p-4 opacity-100 transition-opacity duration-500 sm:opacity-0 sm:group-hover:opacity-100">
                  <p className="translate-y-0 text-base font-medium text-white transition-transform duration-500 sm:translate-y-4 sm:group-hover:translate-y-0">
                    {item.title}
                  </p>
                  <p className="text-xs text-white/60">
                    {item.tags.filter((t) => t !== "Crochet" && t !== "Photography").join(" · ") || item.tags[0]}
                    {item.images.length > 1 && ` · ${item.images.length} photos`}
                  </p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {current.items.length > PAGE && (
            <button type="button" onClick={() => setShowAll((v) => !v)} className="btn border border-bg/20 text-bg hover:border-bg">
              {showAll ? "Show less" : `Show all ${current.items.length}`}
            </button>
          )}
          {tab === "crochet" && (
            <Magnetic>
              <RollButton as="a" href={crochetOrderUrl} target="_blank" rel="noopener noreferrer" className="bg-bg text-ink">
                Order a custom crochet <ArrowUpRight size={15} />
              </RollButton>
            </Magnetic>
          )}
        </div>
      </div>


      <AnimatePresence>
        {open && (
          <Lightbox
            key={open.title}
            title={open.title}
            subtitle={open.tags.join(" · ")}
            images={open.images}
            onClose={() => setOpen(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
