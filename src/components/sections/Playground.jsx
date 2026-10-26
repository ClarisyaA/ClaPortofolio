import { AnimatePresence, motion } from "motion/react";
import { Camera, Puzzle as PuzzleIcon, Layers, Drama } from "lucide-react";
import { useState } from "react";
import { EASE, FadeIn, RevealText, SectionLabel } from "@/components/motion/primitives";
import { Photobooth } from "@/components/play/Photobooth";
import { Puzzle } from "@/components/play/Puzzle";
import { FactDeck } from "@/components/play/FactDeck";
import { TwoTruths } from "@/components/play/TwoTruths";
import { cn } from "@/lib/utils";

const games = [
  { id: "booth", name: "Photobooth", hint: "4 shots, 8 filters", icon: Camera, Comp: Photobooth },
  { id: "puzzle", name: "Puzzle", hint: "rebuild my pictures", icon: PuzzleIcon, Comp: Puzzle },
  { id: "facts", name: "Fact deck", hint: "swipe to know me", icon: Layers, Comp: FactDeck },
  { id: "truths", name: "Two truths", hint: "spot the lie", icon: Drama, Comp: TwoTruths },
];

export const Playground = () => {
  const [active, setActive] = useState(games[0].id);
  const game = games.find((g) => g.id === active);

  return (
    <section id="play" className="relative py-24 sm:py-36">
      <div className="container-x">
        <SectionLabel>Playground</SectionLabel>
        <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="display text-4xl sm:text-6xl">
            <RevealText text="Get to know me" />
          </h2>
          <FadeIn className="max-w-sm text-muted">
            A little arcade instead of a boring bio. Take a photo strip, solve a puzzle, or test how well you know me.
          </FadeIn>
        </div>

        <div className="no-scrollbar -mx-4 mt-12 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <div className="grid min-w-[640px] grid-cols-4 gap-2 sm:min-w-0">
            {games.map((g, i) => {
              const Icon = g.icon;
              const isActive = g.id === active;
              return (
                <FadeIn key={g.id} delay={i * 0.06} y={16}>
                  <button
                    type="button"
                    onClick={() => setActive(g.id)}
                    className={cn(
                      "group relative flex w-full items-center gap-3 overflow-hidden rounded-md border p-4 text-left transition-colors",
                      isActive ? "border-ink text-bg" : "border-line hover:border-ink"
                    )}
                  >
                    {isActive && (
                      <motion.span layoutId="play-tab" className="absolute inset-0 bg-ink" transition={{ type: "spring", stiffness: 380, damping: 34 }} />
                    )}
                    <span
                      className={cn(
                        "relative grid h-10 w-10 shrink-0 place-items-center rounded-md transition-transform duration-500 group-hover:rotate-12",
                        isActive ? "bg-accent text-white" : "bg-accent-soft text-accent"
                      )}
                    >
                      <Icon size={18} />
                    </span>
                    <span className="relative">
                      <span className="block font-medium">{g.name}</span>
                      <span className={cn("block text-xs", isActive ? "text-bg/60" : "text-muted")}>{g.hint}</span>
                    </span>
                  </button>
                </FadeIn>
              );
            })}
          </div>
        </div>

        <div className="card mt-4 overflow-hidden p-4 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <game.Comp />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
