import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageTransition } from "@/components/chrome/PageTransition";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Work } from "@/components/sections/Work";
import { Playground } from "@/components/sections/Playground";
import { Gallery } from "@/components/sections/Gallery";
import { Journey } from "@/components/sections/Journey";
import { Contact } from "@/components/sections/Contact";
import { scrollToTarget } from "@/lib/scroll";

export const Home = ({ ready = true }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // arriving from another page with a section to jump to
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return;
    const t = setTimeout(() => {
      scrollToTarget(target);
      navigate(".", { replace: true, state: null });
    }, 900);
    return () => clearTimeout(t);
  }, [location.state, navigate]);

  return (
    <PageTransition label="Home">
      <main>
        <Hero ready={ready} />
        <About />
        <Skills />
        <Work />
        <Playground />
        <Gallery />
        <Journey />
        <Contact />
      </main>
    </PageTransition>
  );
};
