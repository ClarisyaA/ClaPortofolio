import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { name: "Home", path: "/", sectionId: "hero" },
  { name: "About", path: "#about", sectionId: "about" },
  { name: "Skills", path: "#skills", sectionId: "skills" },
  { name: "Projects", path: "#projects", sectionId: "projects" },
  { name: "Contact", path: "#contact", sectionId: "contact" },
  { name: "Experience", path: "/experience" },
  { name: "Blog", path: "/blog" },
];

const homeSectionIds = navItems
  .map((item) => item.sectionId)
  .filter(Boolean);

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      if (location.pathname !== "/") return;

      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      const currentSection =
        homeSectionIds.findLast((sectionId) => {
          const section = document.getElementById(sectionId);
          return section && section.offsetTop <= scrollPosition;
        }) || "hero";

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const getIsActive = (item) => {
    if (item.sectionId) {
      return location.pathname === "/" && activeSection === item.sectionId;
    }

    return location.pathname === item.path;
  };

  const handleNavClick = (item) => {
    setIsMenuOpen(false);
    if (item.path.startsWith("#")) {
      setActiveSection(item.sectionId);
      if (location.pathname !== "/") {
        navigate("/", { replace: false });
        setTimeout(() => {
          const el = document.querySelector(item.path);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100); // kasih jeda biar udah sampai /
      } else {
        const el = document.querySelector(item.path);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setActiveSection(item.sectionId || "");
      navigate(item.path);
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      });
    }
  };

  return (
    <nav
      className={cn(
        "fixed w-full nav-layer transition-all duration-300",
        isMenuOpen
          ? "py-5 bg-transparent shadow-none"
          : isScrolled
            ? "py-3 bg-background/80 backdrop-blur-md shadow-xs"
            : "py-5"
      )}
    >
      <div className="container flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <button
            onClick={() => navigate("/")}
            className="min-w-0 text-lg sm:text-xl font-bold text-primary flex items-center"
          >
            <span className="content-raised truncate">
              <span className="text-glow text-foreground">Clarisya</span> Portfolio
            </span>
          </button>
          <ThemeToggle className="content-raised" />
        </div>

        {/* desktop nav */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item, key) => (
            <button
              key={key}
              onClick={() => handleNavClick(item)}
              className={cn(
                "text-foreground/80 hover:text-primary transition-colors duration-300",
                getIsActive(item) ? "text-primary" : ""
              )}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* mobile nav */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className={cn(
            "md:hidden shrink-0 p-2 text-foreground rounded-full bg-background/80 backdrop-blur-md",
            isMenuOpen ? "fixed right-6 top-5 overlay-layer" : "floating-control-layer"
          )}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={cn(
            "fixed inset-0 overlay-layer min-h-dvh bg-background flex flex-col items-center justify-center px-6 py-24",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto translate-y-0"
              : "opacity-0 pointer-events-none -translate-y-4"
          )}
        >
          <div className="flex w-full max-w-xs flex-col gap-3 text-xl">
            {navItems.map((item, key) => (
              <button
                key={key}
                onClick={() => handleNavClick(item)}
                className={cn(
                  "w-full rounded-2xl border border-border bg-card/80 px-5 py-3 text-center text-foreground/80 shadow-sm transition-colors duration-300 hover:border-primary/50 hover:text-primary",
                  getIsActive(item) ? "border-primary/60 bg-primary/10 text-primary" : ""
                )}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
