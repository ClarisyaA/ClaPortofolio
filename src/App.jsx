import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from "motion/react";
import { Home } from "./pages/Home";
import { Toaster } from "./components/ui/toaster";
import { Navbar } from "./components/chrome/Navbar";
import { Footer } from "./components/chrome/Footer";
import { Preloader } from "./components/chrome/Preloader";
import { initSmoothScroll, scrollToTarget } from "./lib/scroll";

const Experience = lazy(() => import("./pages/Experience").then((m) => ({ default: m.Experience })));
const Blog = lazy(() => import("./pages/Blog").then((m) => ({ default: m.Blog })));
const NotFound = lazy(() => import("./pages/NotFound").then((m) => ({ default: m.NotFound })));

const knownRoutes = new Set(["/", "/experience", "/blog"]);

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div className="fixed inset-x-0 top-0 z-[65] h-[2px] origin-left bg-accent" style={{ scaleX }} />;
};

const shouldShowIntro = () => {
  try {
    if (sessionStorage.getItem("intro-seen")) return false;
    sessionStorage.setItem("intro-seen", "1");
  } catch {
    /* storage unavailable: still show once */
  }
  return true;
};

function AppContent() {
  const location = useLocation();
  const [intro, setIntro] = useState(shouldShowIntro);
  const showChrome = knownRoutes.has(location.pathname);
  const finishIntro = useCallback(() => setIntro(false), []);

  useEffect(() => initSmoothScroll(), []);

  return (
    <>
      <AnimatePresence>{intro && <Preloader onDone={finishIntro} />}</AnimatePresence>
      <ScrollProgress />
      {showChrome && <Navbar />}

      <div className="relative z-10 bg-bg">
        <AnimatePresence mode="wait" onExitComplete={() => scrollToTarget(0, { immediate: true })}>
          <Suspense fallback={<div className="min-h-screen" />} key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home ready={!intro} />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </div>

      {showChrome && <Footer />}
    </>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Toaster />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
