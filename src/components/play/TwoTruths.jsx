import { AnimatePresence, motion } from "motion/react";
import { Check, RotateCcw, X } from "lucide-react";
import { useState } from "react";
import { EASE } from "@/components/motion/primitives";
import { truthRounds } from "@/data/profile";
import { cn } from "@/lib/utils";

/** Two truths and a lie — spot the statement that isn't true. */
export const TwoTruths = () => {
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const finished = round >= truthRounds.length;
  const current = truthRounds[round];

  const pick = (i) => {
    if (picked !== null) return;
    setPicked(i);
    if (!current.statements[i].truth) setScore((s) => s + 1);
  };

  const next = () => {
    setPicked(null);
    setRound((r) => r + 1);
  };

  const restart = () => {
    setPicked(null);
    setRound(0);
    setScore(0);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <h3 className="text-3xl font-medium tracking-tight sm:text-4xl">
          Two truths and a lie
        </h3>
        <p className="mt-4 max-w-md text-muted">How well do you know me already? Pick the statement that's made up.</p>
        <div className="mt-8 flex items-center gap-3">
          {truthRounds.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-2 rounded-full transition-all duration-500",
                i < round ? "w-8 bg-accent" : i === round ? "w-8 bg-ink" : "w-2 bg-line"
              )}
            />
          ))}
          <span className="ml-2 font-mono text-sm text-muted">score {score}</span>
        </div>
      </div>

      <div className="min-h-[340px]">
        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={round}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="space-y-3"
            >
              <p className="eyebrow">Round {round + 1} of {truthRounds.length}</p>
              {current.statements.map((s, i) => {
                const revealed = picked !== null;
                const isLie = !s.truth;
                return (
                  <motion.button
                    key={s.text}
                    type="button"
                    onClick={() => pick(i)}
                    whileHover={!revealed ? { x: 6 } : undefined}
                    whileTap={!revealed ? { scale: 0.98 } : undefined}
                    animate={revealed && picked === i && !isLie ? { x: [0, -10, 10, -6, 6, 0] } : {}}
                    className={cn(
                      "flex w-full items-center gap-4 rounded-md border p-5 text-left text-lg transition-colors",
                      !revealed && "border-line hover:border-ink",
                      revealed && isLie && "border-accent bg-accent text-white",
                      revealed && !isLie && picked === i && "border-taupe bg-taupe/30",
                      revealed && !isLie && picked !== i && "border-line opacity-50"
                    )}
                  >
                    <span className="font-serif text-accent">{String.fromCharCode(65 + i)}</span>
                    <span className={cn("flex-1", revealed && isLie && "line-through decoration-2")}>{s.text}</span>
                    {revealed && (isLie ? <X size={20} /> : <Check size={20} className="text-emerald-600" />)}
                  </motion.button>
                );
              })}

              <AnimatePresence>
                {picked !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-4 pt-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <p className="text-muted">
                      <span className="font-medium text-ink">
                        {current.statements[picked].truth ? "Nope, that one's true! " : "Nailed it! "}
                      </span>
                      {current.reveal}
                    </p>
                    <button type="button" onClick={next} className="btn-ink shrink-0">
                      {round === truthRounds.length - 1 ? "See score" : "Next round"} →
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex h-full flex-col items-start justify-center gap-5 rounded-lg bg-ink p-8 text-bg"
            >
              <p className="font-serif text-7xl italic">
                {score}/{truthRounds.length}
              </p>
              <p className="text-xl">
                {score === truthRounds.length
                  ? "Okay, you clearly know me. Let's be friends."
                  : score >= truthRounds.length / 2
                    ? "Not bad! You're getting to know me."
                    : "Plot twist — now you know me a little better."}
              </p>
              <button type="button" onClick={restart} className="btn border border-bg/25 text-bg hover:border-bg">
                <RotateCcw size={15} /> Play again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
