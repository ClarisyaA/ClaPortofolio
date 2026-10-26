import { AnimatePresence, motion, useMotionValue, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { useState } from "react";
import { funFacts } from "@/data/profile";

const SwipeCard = ({ fact, index, depth, onSwipe }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-18, 18]);
  const likeOpacity = useTransform(x, [20, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-120, -20], [1, 0]);
  const isTop = depth === 0;

  return (
    <motion.article
      className="absolute inset-0 flex touch-pan-y select-none flex-col rounded-lg border border-line bg-surface p-3 shadow-[0_18px_40px_-20px_rgba(43,36,32,0.45)]"
      style={{ x, rotate, zIndex: 10 - depth }}
      initial={{ scale: 0.9, y: 40, opacity: 0 }}
      animate={{ scale: 1 - depth * 0.05, y: depth * 18, opacity: depth > 2 ? 0 : 1 }}
      exit={(dir) => ({ x: dir * 600, rotate: dir * 30, opacity: 0, transition: { duration: 0.45 } })}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      drag={isTop ? "x" : false}
      dragSnapToOrigin
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 110 || Math.abs(info.velocity.x) > 600) onSwipe(info.offset.x > 0 ? 1 : -1);
      }}
    >
      <div className="relative h-[52%] shrink-0 overflow-hidden rounded bg-line">
        <img src={fact.image} alt="" draggable={false} className="h-full w-full object-cover" />
        {isTop && (
          <>
            <motion.span style={{ opacity: likeOpacity }} className="absolute right-3 top-3 rotate-6 rounded bg-surface px-2.5 py-1 text-sm font-semibold text-accent">
              cool
            </motion.span>
            <motion.span style={{ opacity: nopeOpacity }} className="absolute left-3 top-3 -rotate-6 rounded bg-surface px-2.5 py-1 text-sm font-semibold text-muted">
              next
            </motion.span>
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between px-2 pb-1 pt-4">
        <div>
          <h4 className="text-2xl font-semibold leading-tight tracking-tight">{fact.title}</h4>
          <p className="mt-2 text-sm text-muted">{fact.body}</p>
        </div>
        <span className="font-mono text-xs text-muted">
          {String(index + 1).padStart(2, "0")} / {String(funFacts.length).padStart(2, "0")}
        </span>
      </div>
    </motion.article>
  );
};

/** Tinder-style deck of facts about me — throw the cards away. */
export const FactDeck = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [liked, setLiked] = useState(0);
  const remaining = funFacts.slice(index, index + 3);
  const done = index >= funFacts.length;

  const swipe = (dir) => {
    setDirection(dir);
    if (dir > 0) setLiked((l) => l + 1);
    setIndex((i) => i + 1);
  };

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
      <div>
        <h3 className="text-3xl font-medium tracking-tight sm:text-4xl">
          {funFacts.length} things worth knowing about me.
        </h3>
        <p className="mt-4 max-w-md text-muted">
          Drag a card right if it's cool, left to skip. Or use the buttons — I won't take it personally.
        </p>
        <div className="mt-8 flex gap-3">
          <button type="button" onClick={() => !done && swipe(-1)} disabled={done} className="grid h-14 w-14 place-items-center rounded-md border border-line transition hover:border-ink disabled:opacity-30" aria-label="Skip">
            <ArrowLeft size={20} />
          </button>
          <button type="button" onClick={() => !done && swipe(1)} disabled={done} className="grid h-14 w-14 place-items-center rounded-md bg-ink text-bg transition hover:bg-accent disabled:opacity-30" aria-label="Cool">
            <ArrowRight size={20} />
          </button>
        </div>
        <div className="mt-8 h-1 w-full max-w-xs overflow-hidden rounded-full bg-line">
          <motion.div className="h-full bg-accent" animate={{ width: `${(index / funFacts.length) * 100}%` }} />
        </div>
      </div>

      <div className="relative mx-auto h-[400px] w-full max-w-[380px]">
        <AnimatePresence custom={direction}>
          {remaining
            .map((fact, i) => (
              <SwipeCard key={fact.title} fact={fact} index={index + i} depth={i} onSwipe={swipe} />
            ))
            .reverse()}
        </AnimatePresence>
        {done && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-line text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
                        <p className="text-xl font-medium">
              You found <span className="font-semibold text-accent">{liked}</span> of {funFacts.length} facts cool.
            </p>
            <button
              type="button"
              onClick={() => {
                setIndex(0);
                setLiked(0);
              }}
              className="btn-ghost"
            >
              <RotateCcw size={15} /> Deal again
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
