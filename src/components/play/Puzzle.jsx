import { AnimatePresence, motion } from "motion/react";
import { Eye, Shuffle, Timer, Trophy } from "lucide-react";
import confetti from "canvas-confetti";
import { useCallback, useEffect, useState } from "react";
import portrait from "@/assets/img/isya1.webp";
import { EASE } from "@/components/motion/primitives";
import { cn } from "@/lib/utils";

const pictures = [
  { id: "me", label: "Me", src: portrait, caption: "That's me — hi! 👋 Informatics @ Unpad, probably debugging something right now." },
  { id: "catfish", label: "Catfish", src: "/projects/Rajut/Catfish1.webp", caption: "I crocheted this catfish by hand, one stitch at a time 🧶" },
  { id: "miffy", label: "Miffy", src: "/projects/Rajut/Miffy Chibi.webp", caption: "Miffy Chibi — one of my favourite ClaviaCrochet pieces." },
  { id: "sunrise", label: "Sunrise", src: "/projects/foto/sunrise1.webp", caption: "A sunrise I shot — photography is my reset button 📷" },
];

const SIZE_PX = 600;

/** Center-crop an image to a square data URL so tiles line up exactly. */
const toSquare = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const s = Math.min(img.naturalWidth, img.naturalHeight);
      const canvas = document.createElement("canvas");
      canvas.width = SIZE_PX;
      canvas.height = SIZE_PX;
      canvas
        .getContext("2d")
        .drawImage(img, (img.naturalWidth - s) / 2, (img.naturalHeight - s) / 2.6, s, s, 0, 0, SIZE_PX, SIZE_PX);
      resolve(canvas.toDataURL("image/jpeg", 0.88));
    };
    img.onerror = reject;
    img.src = src;
  });

const shuffled = (n) => {
  const arr = Array.from({ length: n }, (_, i) => i);
  do {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  } while (arr.every((v, i) => v === i));
  return arr;
};

const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export const Puzzle = () => {
  const [picture, setPicture] = useState(pictures[0]);
  const [square, setSquare] = useState("");
  const [grid, setGrid] = useState(3);
  const [order, setOrder] = useState(() => shuffled(9));
  const [selected, setSelected] = useState(null);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const [peek, setPeek] = useState(false);
  const solved = order.every((v, i) => v === i);

  useEffect(() => {
    let alive = true;
    setSquare("");
    toSquare(picture.src)
      .then((url) => alive && setSquare(url))
      .catch(() => alive && setSquare(picture.src));
    return () => {
      alive = false;
    };
  }, [picture]);

  const restart = useCallback((n = grid) => {
    setOrder(shuffled(n * n));
    setSelected(null);
    setMoves(0);
    setSeconds(0);
    setStarted(false);
  }, [grid]);

  useEffect(() => {
    if (!started || solved) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [started, solved]);

  useEffect(() => {
    if (!solved || !started) return;
    const end = Date.now() + 900;
    const colors = ["#7457f0", "#ff8fab", "#ffd166", "#ffffff"];
    (function frame() {
      confetti({ particleCount: 4, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, [solved, started]);

  const tap = (pos) => {
    if (solved) return;
    setStarted(true);
    if (selected === null) {
      setSelected(pos);
      return;
    }
    if (selected !== pos) {
      setOrder((o) => {
        const next = [...o];
        [next[selected], next[pos]] = [next[pos], next[selected]];
        return next;
      });
      setMoves((m) => m + 1);
    }
    setSelected(null);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
      <div className="order-2 flex flex-col gap-6 lg:order-1">
        <div>
          <p className="eyebrow mb-3">Pick a picture</p>
          <div className="grid grid-cols-4 gap-2">
            {pictures.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setPicture(p);
                  restart();
                }}
                className={cn(
                  "group relative aspect-square overflow-hidden rounded-md border-2 transition-all",
                  picture.id === p.id ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"
                )}
              >
                <img src={p.src} alt={p.label} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 pb-1.5 pt-4 text-left text-[11px] font-medium text-white">
                  {p.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow mb-3">Difficulty</p>
          <div className="flex w-fit rounded-md border border-line p-1">
            {[3, 4].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setGrid(n);
                  restart(n);
                }}
                className={cn("relative rounded px-5 py-2 text-sm", grid === n ? "text-bg" : "text-muted")}
              >
                {grid === n && <motion.span layoutId="puzzle-size" className="absolute inset-0 rounded bg-ink" />}
                <span className="relative">{n === 3 ? "Easy · 3×3" : "Hard · 4×4"}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="card p-4">
            <p className="flex items-center gap-1.5 text-xs text-muted"><Timer size={13} /> Time</p>
            <p className="mt-1 font-mono text-3xl tabular-nums">{formatTime(seconds)}</p>
          </div>
          <div className="card p-4">
            <p className="flex items-center gap-1.5 text-xs text-muted"><Trophy size={13} /> Swaps</p>
            <p className="mt-1 font-mono text-3xl tabular-nums">{moves}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => restart()} className="btn-ink">
            <Shuffle size={16} /> Shuffle
          </button>
          <button
            type="button"
            onPointerDown={() => setPeek(true)}
            onPointerUp={() => setPeek(false)}
            onPointerLeave={() => setPeek(false)}
            onKeyDown={(e) => e.key === " " && setPeek(true)}
            onKeyUp={() => setPeek(false)}
            className="btn-ghost select-none"
          >
            <Eye size={16} /> Hold to peek
          </button>
        </div>
        <p className="text-sm text-muted">Tap two tiles to swap them. Put the picture back together!</p>
      </div>

      <div className="order-1 lg:order-2">
        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          <motion.div
            className="grid h-full w-full"
            style={{ gridTemplateColumns: `repeat(${grid}, 1fr)` }}
            animate={{ gap: solved ? 0 : 6 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {order.map((tile, pos) => {
              const row = Math.floor(tile / grid);
              const col = tile % grid;
              return (
                <motion.button
                  key={`${grid}-${tile}`}
                  layout
                  type="button"
                  onClick={() => tap(pos)}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  whileHover={!solved ? { scale: 0.96 } : undefined}
                  animate={{
                    borderRadius: solved ? 0 : 4,
                    scale: selected === pos ? 0.9 : 1,
                    rotate: selected === pos ? -3 : 0,
                  }}
                  className={cn(
                    "relative aspect-square overflow-hidden bg-accent-soft",
                    selected === pos && "z-10 ring-4 ring-accent"
                  )}
                  style={{
                    backgroundImage: square ? `url(${square})` : undefined,
                    backgroundSize: `${grid * 100}% ${grid * 100}%`,
                    backgroundPosition: `${(col / (grid - 1)) * 100}% ${(row / (grid - 1)) * 100}%`,
                  }}
                  aria-label={`Tile ${tile + 1}`}
                />
              );
            })}
          </motion.div>

          <AnimatePresence>
            {peek && square && (
              <motion.img
                src={square}
                alt=""
                className="pointer-events-none absolute inset-0 h-full w-full rounded-md object-cover"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {solved && started && (
              <motion.div
                className="absolute inset-x-3 bottom-3 rounded-md bg-ink/90 p-4 text-bg backdrop-blur"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ delay: 0.5, ease: EASE, duration: 0.7 }}
              >
                <p className="serif-i text-2xl">Solved in {moves} swaps, {formatTime(seconds)}!</p>
                <p className="mt-1 text-sm text-bg/70">{picture.caption}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
