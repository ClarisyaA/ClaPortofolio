import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ScrollTopButton = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollableHeight > 0 ? Math.min((scrollTop / scrollableHeight) * 100, 100) : 0;

      setScrollProgress(progress);
      setIsVisible(scrollTop > 180);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-5 right-5 sm:bottom-8 sm:right-8 floating-control-layer grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-full p-1 shadow-lg shadow-primary/20 transition-all duration-300",
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 pointer-events-none"
      )}
      style={{
        background: `conic-gradient(hsl(var(--primary)) ${scrollProgress}%, hsl(var(--border)) ${scrollProgress}%)`,
      }}
      aria-label="Scroll to top"
    >
      <span className="grid h-full w-full place-items-center rounded-full bg-background text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
        <ArrowUp size={20} />
      </span>
    </button>
  );
};
