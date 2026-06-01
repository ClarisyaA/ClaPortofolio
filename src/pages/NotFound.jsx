import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

const logoVariants = [
  "/projects/Logo/svg/LogoUngu.svg",
  "/projects/Logo/svg/LogoOri.svg",
  "/projects/Logo/svg/LogoGelap.svg",
  "/projects/Logo/svg/LogoPutih.svg",
];

const logoCloud = [
  { x: "6%", y: "12%", size: "h-14 w-14", rotate: "-10deg" },
  { x: "16%", y: "24%", size: "h-10 w-10", rotate: "8deg" },
  { x: "29%", y: "10%", size: "h-16 w-16", rotate: "14deg" },
  { x: "43%", y: "18%", size: "h-11 w-11", rotate: "-18deg" },
  { x: "60%", y: "9%", size: "h-14 w-14", rotate: "10deg" },
  { x: "76%", y: "22%", size: "h-12 w-12", rotate: "-8deg" },
  { x: "89%", y: "13%", size: "h-16 w-16", rotate: "18deg" },
  { x: "9%", y: "70%", size: "h-11 w-11", rotate: "12deg" },
  { x: "22%", y: "82%", size: "h-16 w-16", rotate: "-15deg" },
  { x: "36%", y: "68%", size: "h-12 w-12", rotate: "9deg" },
  { x: "51%", y: "80%", size: "h-14 w-14", rotate: "-12deg" },
  { x: "66%", y: "69%", size: "h-10 w-10", rotate: "16deg" },
  { x: "82%", y: "83%", size: "h-14 w-14", rotate: "-7deg" },
  { x: "93%", y: "66%", size: "h-10 w-10", rotate: "11deg" },
  { x: "4%", y: "45%", size: "h-9 w-9", rotate: "20deg" },
  { x: "94%", y: "41%", size: "h-12 w-12", rotate: "-20deg" },
].map((logo, index) => ({
  ...logo,
  src: logoVariants[index % logoVariants.length],
  delay: `${(index % 7) * 0.22}s`,
}));

export const NotFound = () => {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-16">
      <div className="pointer-events-none absolute inset-0 opacity-55">
        {logoCloud.map((logo, index) => (
          <img
            key={`${logo.src}-${index}`}
            src={logo.src}
            alt=""
            className={`not-found-logo-scattered absolute ${logo.size} bg-transparent object-contain p-0 shadow-none ring-0 border-0 rounded-none`}
            style={{
              left: logo.x,
              top: logo.y,
              rotate: logo.rotate,
              animationDelay: logo.delay,
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      <section className="container relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center text-center">
        <h1 className="not-found-title text-[6rem] font-black leading-none text-primary sm:text-[9rem] md:text-[12rem]">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
          Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Looks like this page drifted away from the portfolio path. Let&apos;s
          bring you back to the work that actually exists.
        </p>

        <div className="relative mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="cosmic-button inline-flex items-center justify-center gap-2"
          >
            <Home size={18} />
            Back Home
          </Link>

          <Link
            to="/experience"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-primary px-6 py-2 font-medium text-primary transition-colors duration-300 hover:bg-primary/10"
          >
            <ArrowLeft size={18} />
            View Experience
          </Link>
        </div>
      </section>
    </main>
  );
};