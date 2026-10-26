import { AnimatePresence, motion } from "motion/react";
import { Camera, Download, ImagePlus, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { EASE } from "@/components/motion/primitives";
import { filters, frames } from "@/components/play/filters";
import { cn } from "@/lib/utils";

const SHOTS = 4;
const SHOT_W = 640;
const SHOT_H = 480;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/** Center-crop any drawable source into a 4:3 canvas (optionally mirrored). */
const grabFrame = (source, sw, sh, mirror) => {
  const canvas = document.createElement("canvas");
  canvas.width = SHOT_W;
  canvas.height = SHOT_H;
  const ctx = canvas.getContext("2d");
  const target = SHOT_W / SHOT_H;
  let cw = sw;
  let ch = sw / target;
  if (ch > sh) {
    ch = sh;
    cw = sh * target;
  }
  const cx = (sw - cw) / 2;
  const cy = (sh - ch) / 2;
  if (mirror) {
    ctx.translate(SHOT_W, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(source, cx, cy, cw, ch, 0, 0, SHOT_W, SHOT_H);
  return canvas;
};

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

/** Draw the shots onto a strip / grid with the chosen filter, frame and caption. */
const composeStrip = (shots, { filter, frame, layout, caption }) => {
  const pad = 36;
  const gap = 22;
  const footer = 150;
  const isGrid = layout === "grid";
  const pw = isGrid ? 520 : 600;
  const ph = pw * (SHOT_H / SHOT_W);
  const cols = isGrid ? 2 : 1;
  const rows = Math.ceil(SHOTS / cols);
  const width = pad * 2 + cols * pw + (cols - 1) * gap;
  const height = pad * 2 + rows * ph + (rows - 1) * gap + footer;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = frame.bg;
  ctx.fillRect(0, 0, width, height);

  shots.forEach((shot, i) => {
    const tmp = document.createElement("canvas");
    tmp.width = SHOT_W;
    tmp.height = SHOT_H;
    const tctx = tmp.getContext("2d");
    tctx.drawImage(shot, 0, 0);
    const img = tctx.getImageData(0, 0, SHOT_W, SHOT_H);
    filter.apply(img.data);
    tctx.putImageData(img, 0, 0);

    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = pad + col * (pw + gap);
    const y = pad + row * (ph + gap);
    ctx.save();
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(x, y, pw, ph, 14);
    else ctx.rect(x, y, pw, ph);
    ctx.clip();
    ctx.drawImage(tmp, x, y, pw, ph);
    ctx.restore();
  });

  const baseY = height - footer + 30;
  ctx.fillStyle = frame.ink;
  ctx.textAlign = "center";
  ctx.font = "italic 52px 'Instrument Serif', Georgia, serif";
  ctx.fillText(caption || "clarisya's booth", width / 2, baseY + 40);
  ctx.globalAlpha = 0.6;
  ctx.font = "500 18px Geist, system-ui, sans-serif";
  const date = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  ctx.fillText(`${date.toUpperCase()}  ·  CLARISYA ADELINE`, width / 2, baseY + 82);
  ctx.globalAlpha = 1;
  return canvas;
};

export const Photobooth = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileRef = useRef(null);
  const [stage, setStage] = useState("idle"); // idle | live | shooting | result
  const [error, setError] = useState("");
  const [filter, setFilter] = useState(filters[3]);
  const [frame, setFrame] = useState(frames[0]);
  const [layout, setLayout] = useState("strip");
  const [caption, setCaption] = useState("clarisya's booth");
  const [countdown, setCountdown] = useState(null);
  const [flash, setFlash] = useState(0);
  const [shots, setShots] = useState([]);
  const [stripUrl, setStripUrl] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => stopCamera, [stopCamera]);

  const startCamera = async () => {
    setError("");
    setVideoReady(false);
    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Your browser can't open the camera here — try uploading photos instead.");
      return;
    }
    setRequesting(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 960 } },
        audio: false,
      });
      streamRef.current = stream;
      setShots([]);
      setStage("live");
    } catch (err) {
      setError(
        err?.name === "NotAllowedError"
          ? "Camera permission was blocked. Allow it in your browser, or upload photos instead."
          : "Couldn't find a camera. You can still upload photos!"
      );
    } finally {
      setRequesting(false);
    }
  };

  // attach the stream once the <video> exists
  useEffect(() => {
    if (stage === "live" && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(() => {});
    }
  }, [stage]);

  const shoot = async () => {
    const video = videoRef.current;
    if (!videoReady || !video?.videoWidth) return;
    setStage("shooting");
    const taken = [];
    for (let i = 0; i < SHOTS; i++) {
      for (let c = 3; c >= 1; c--) {
        setCountdown(c);
        await wait(i === 0 ? 800 : 550);
      }
      setCountdown(null);
      taken.push(grabFrame(video, video.videoWidth, video.videoHeight, true));
      setShots([...taken]);
      setFlash((f) => f + 1);
      await wait(450);
    }
    stopCamera();
    setStage("result");
  };

  const onUpload = async (e) => {
    const files = [...(e.target.files || [])].slice(0, SHOTS);
    e.target.value = "";
    if (!files.length) return;
    try {
      const urls = files.map((f) => URL.createObjectURL(f));
      const images = await Promise.all(urls.map(loadImage));
      const canvases = Array.from({ length: SHOTS }, (_, i) => {
        const img = images[i % images.length];
        return grabFrame(img, img.naturalWidth, img.naturalHeight, false);
      });
      urls.forEach((u) => URL.revokeObjectURL(u));
      stopCamera();
      setShots(canvases);
      setStage("result");
      setError("");
    } catch {
      setError("Those files couldn't be read as images.");
    }
  };

  // recompose whenever the look changes on the result screen
  useEffect(() => {
    if (stage !== "result" || shots.length < SHOTS) return;
    const canvas = composeStrip(shots, { filter, frame, layout, caption });
    setStripUrl(canvas.toDataURL("image/png"));
  }, [stage, shots, filter, frame, layout, caption]);

  const download = () => {
    const a = document.createElement("a");
    a.href = stripUrl;
    a.download = `clarisya-photobooth-${Date.now()}.png`;
    a.click();
  };

  const reset = () => {
    setShots([]);
    setStripUrl("");
    setStage("idle");
    startCamera();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
      {/* viewfinder / result */}
      <div className="relative overflow-hidden rounded-lg border border-line bg-ink">
        <div className={cn("relative", stage === "result" ? "min-h-[520px]" : "aspect-[4/3]")}>
          {(stage === "live" || stage === "shooting") && (
            <>
              <video
                ref={videoRef}
                playsInline
                muted
                autoPlay
                onLoadedData={() => setVideoReady(true)}
                className="absolute inset-0 h-full w-full -scale-x-100 object-cover"
                style={{ filter: filter.css }}
              />
              {filter.overlay && (
                <div className="pointer-events-none absolute inset-0 mix-blend-soft-light" style={{ background: filter.overlay }} />
              )}
              <div className="pointer-events-none absolute inset-4 rounded-md border border-white/30">
                {[
                  "left-0 top-0 border-l-2 border-t-2",
                  "right-0 top-0 border-r-2 border-t-2",
                  "left-0 bottom-0 border-l-2 border-b-2",
                  "right-0 bottom-0 border-r-2 border-b-2",
                ].map((c) => (
                  <span key={c} className={cn("absolute h-6 w-6 rounded-sm border-white", c)} />
                ))}
              </div>
              <div className="absolute left-6 top-6 flex items-center gap-2 rounded bg-black/40 px-3 py-1 text-xs text-white backdrop-blur">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" /> LIVE · {filter.name}
              </div>
              <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
                {Array.from({ length: SHOTS }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="h-2.5 w-2.5 rounded-full border border-white"
                    animate={{ backgroundColor: i < shots.length ? "#ffffff" : "rgba(255,255,255,0)" }}
                  />
                ))}
              </div>
            </>
          )}

          {stage === "idle" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center text-bg">
              <motion.div
                className="grid h-20 w-20 place-items-center rounded-lg bg-bg text-ink"
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1 }}
              >
                <Camera size={30} />
              </motion.div>
              <div>
                <p className="text-2xl font-medium tracking-tight sm:text-3xl">
                  Photobooth
                </p>
                <p className="mt-2 text-sm text-bg/60">4 shots · pick a filter · download your strip</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <button type="button" onClick={startCamera} disabled={requesting} className="btn bg-bg text-ink hover:bg-accent hover:text-white">
                  <Camera size={16} /> {requesting ? "Waiting for permission…" : "Open camera"}
                </button>
                <button type="button" onClick={() => fileRef.current?.click()} className="btn border border-bg/25 text-bg hover:border-bg">
                  <ImagePlus size={16} /> Upload photos
                </button>
              </div>
              {error && <p className="max-w-sm text-sm text-taupe">{error}</p>}
              <p className="text-xs text-bg/40">Your photos never leave your device.</p>
            </div>
          )}

          {stage === "result" && (
            <div className="absolute inset-0 flex flex-col items-center overflow-hidden bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_60%)] pt-4">
              {/* the "printer slot" */}
              <div className="relative z-10 h-3 w-[72%] max-w-[300px] rounded-full bg-black shadow-[inset_0_2px_6px_rgba(255,255,255,0.15)]" />
              <div className="-mt-1.5 flex-1 overflow-hidden px-4 pb-4">
                <motion.img
                  key={`${layout}`}
                  src={stripUrl || undefined}
                  alt="Your photobooth strip"
                  className={cn(
                    "mx-auto rounded-sm shadow-2xl",
                    layout === "strip" ? "max-h-[480px] w-auto" : "max-h-[440px] w-auto"
                  )}
                  initial={{ y: "-105%" }}
                  animate={{ y: "0%", rotate: [0, 0, -2] }}
                  transition={{ duration: 2.4, ease: [0.45, 0, 0.2, 1], rotate: { duration: 2.8 } }}
                />
              </div>
            </div>
          )}

          <AnimatePresence>
            {countdown && (
              <motion.span
                key={`${countdown}-${shots.length}`}
                className="pointer-events-none absolute inset-0 grid place-items-center font-serif text-[9rem] italic text-white drop-shadow-lg"
                initial={{ scale: 2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {countdown}
              </motion.span>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {flash > 0 && (
              <motion.div
                key={flash}
                className="pointer-events-none absolute inset-0 bg-white"
                initial={{ opacity: 0.95 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* controls */}
      <div className="flex flex-col gap-6">
        <div>
          <p className="eyebrow mb-3">Filter</p>
          <div className="grid grid-cols-4 gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "relative overflow-hidden rounded-md border px-2 py-3 text-xs font-medium transition-colors",
                  filter.id === f.id ? "border-ink text-bg" : "border-line text-ink hover:border-ink"
                )}
              >
                {filter.id === f.id && (
                  <motion.span layoutId="booth-filter" className="absolute inset-0 bg-ink" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                )}
                <span
                  className="relative mx-auto mb-1.5 block h-7 w-9 rounded-sm bg-cover bg-center"
                  style={{ filter: f.css, backgroundImage: "url(/projects/foto/sunrise1.webp)" }}
                />
                <span className="relative">{f.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="eyebrow mb-3">Frame</p>
            <div className="flex flex-wrap gap-2">
              {frames.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFrame(f)}
                  className={cn(
                    "h-9 w-9 rounded-full border-2 transition-transform hover:scale-110",
                    frame.id === f.id ? "scale-110 border-accent" : "border-line"
                  )}
                  style={{ background: f.bg }}
                  aria-label={`${f.name} frame`}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow mb-3">Layout</p>
            <div className="flex rounded-md border border-line p-1">
              {["strip", "grid"].map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLayout(l)}
                  className={cn(
                    "relative flex-1 rounded py-1.5 text-xs font-medium capitalize",
                    layout === l ? "text-bg" : "text-muted"
                  )}
                >
                  {layout === l && <motion.span layoutId="booth-layout" className="absolute inset-0 rounded bg-ink" />}
                  <span className="relative">{l}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <label className="block">
          <span className="eyebrow mb-1 block">Caption</span>
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value.slice(0, 28))}
            className="field font-serif text-2xl italic"
            placeholder="write something cute"
          />
        </label>

        <div className="mt-auto flex flex-wrap gap-2">
          {stage === "live" && (
            <button type="button" onClick={shoot} disabled={!videoReady} className="btn-ink flex-1 !py-4 text-base disabled:opacity-50">
              <Camera size={18} /> {videoReady ? "Start 4-shot countdown" : "Starting camera…"}
            </button>
          )}
          {stage === "shooting" && (
            <p className="flex-1 rounded-md border border-line py-4 text-center text-sm text-muted">
              Smile! Shot {Math.min(shots.length + 1, SHOTS)} of {SHOTS}…
            </p>
          )}
          {stage === "result" && (
            <>
              <button type="button" onClick={download} disabled={!stripUrl} className="btn-ink flex-1 !py-4">
                <Download size={17} /> Download strip
              </button>
              <button type="button" onClick={reset} className="btn-ghost !py-4">
                <RotateCcw size={16} /> Retake
              </button>
            </>
          )}
          {stage === "idle" && (
            <p className="text-sm text-muted">Tip: filters and frames can still be changed after the strip prints.</p>
          )}
        </div>
      </div>

      <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={onUpload} />
    </div>
  );
};
