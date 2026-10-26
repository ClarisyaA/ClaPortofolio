/**
 * Photobooth filters. `css` drives the live preview; `apply` bakes the same
 * look into canvas pixels (ctx.filter is not supported in every browser).
 */
const clamp = (v) => (v < 0 ? 0 : v > 255 ? 255 : v);

const pixelPipeline = ({ gray = 0, sepia = 0, saturate = 1, contrast = 1, brightness = 1, tint = null, fade = 0 }) => (data) => {
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];

    if (saturate !== 1) {
      const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      r = l + (r - l) * saturate;
      g = l + (g - l) * saturate;
      b = l + (b - l) * saturate;
    }
    if (gray) {
      const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      r = r + (l - r) * gray;
      g = g + (l - g) * gray;
      b = b + (l - b) * gray;
    }
    if (sepia) {
      const sr = 0.393 * r + 0.769 * g + 0.189 * b;
      const sg = 0.349 * r + 0.686 * g + 0.168 * b;
      const sb = 0.272 * r + 0.534 * g + 0.131 * b;
      r = r + (sr - r) * sepia;
      g = g + (sg - g) * sepia;
      b = b + (sb - b) * sepia;
    }
    r *= brightness;
    g *= brightness;
    b *= brightness;
    if (contrast !== 1) {
      r = (r - 128) * contrast + 128;
      g = (g - 128) * contrast + 128;
      b = (b - 128) * contrast + 128;
    }
    if (tint) {
      const [tr, tg, tb, ta] = tint;
      r = r + (tr - r) * ta;
      g = g + (tg - g) * ta;
      b = b + (tb - b) * ta;
    }
    if (fade) {
      r = r + (235 - r) * fade * (1 - r / 255);
      g = g + (230 - g) * fade * (1 - g / 255);
      b = b + (225 - b) * fade * (1 - b / 255);
    }

    data[i] = clamp(r);
    data[i + 1] = clamp(g);
    data[i + 2] = clamp(b);
  }
};

export const filters = [
  { id: "natural", name: "Natural", css: "none", apply: () => {} },
  {
    id: "mono",
    name: "Mono",
    css: "grayscale(1) contrast(1.15)",
    apply: pixelPipeline({ gray: 1, contrast: 1.15 }),
  },
  {
    id: "vintage",
    name: "Vintage",
    css: "sepia(0.55) contrast(1.05) saturate(0.85) brightness(1.05)",
    apply: pixelPipeline({ sepia: 0.55, contrast: 1.05, saturate: 0.85, brightness: 1.05, fade: 0.12 }),
  },
  {
    id: "lilac",
    name: "Lilac",
    css: "saturate(1.1) brightness(1.05) hue-rotate(-12deg) contrast(0.95)",
    apply: pixelPipeline({ saturate: 1.1, brightness: 1.05, contrast: 0.95, tint: [168, 140, 255, 0.18] }),
    overlay: "rgba(168,140,255,0.18)",
  },
  {
    id: "peach",
    name: "Peach",
    css: "saturate(1.2) brightness(1.06) sepia(0.15)",
    apply: pixelPipeline({ saturate: 1.2, brightness: 1.06, sepia: 0.15, tint: [255, 150, 160, 0.12] }),
    overlay: "rgba(255,150,160,0.12)",
  },
  {
    id: "noir",
    name: "Noir",
    css: "grayscale(1) contrast(1.6) brightness(0.9)",
    apply: pixelPipeline({ gray: 1, contrast: 1.6, brightness: 0.9 }),
  },
  {
    id: "cool",
    name: "Cool",
    css: "saturate(0.9) contrast(1.05) brightness(1.03)",
    apply: pixelPipeline({ saturate: 0.9, contrast: 1.05, brightness: 1.03, tint: [110, 170, 255, 0.14] }),
    overlay: "rgba(110,170,255,0.14)",
  },
  {
    id: "pop",
    name: "Pop",
    css: "saturate(1.8) contrast(1.15)",
    apply: pixelPipeline({ saturate: 1.8, contrast: 1.15 }),
  },
];

export const frames = [
  // same colours as the CLA logos
  { id: "cream", name: "Cream", bg: "#f3eee8", ink: "#2b2420" },
  { id: "cocoa", name: "Cocoa", bg: "#2b2420", ink: "#f1e9e1" },
  { id: "taupe", name: "Taupe", bg: "#b5998f", ink: "#2b2420" },
  { id: "lavender", name: "Lavender", bg: "#cea6f6", ink: "#2b2420" },
  { id: "indigo", name: "Indigo", bg: "#6b5fb1", ink: "#f3eee8" },
];
