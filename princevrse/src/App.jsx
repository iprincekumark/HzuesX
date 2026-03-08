import { lazy, Suspense } from "react";
import Navbar from "./components/layout/Navbar";
import CurvedLoopBandHero from "./sections/home/CurvedLoopBandHero";
import GlassSection from "./components/layout/GlassSection";
import ScrollReveal from "./components/ui/ScrollReveal";
import ShuffleHeading from "./components/ui/ShuffleHeading";
import SplitClock from "./components/ui/SplitClock";
import CurvedLoopPrince from "./components/animation/CurvedLoopPrince";
import AppBackground from "./theme/AppBackground";
import SecurityShield from "./components/security/SecurityShield";
import useDevToolsDetect from "./hooks/useDevToolsDetect";

/* Lazy-load below-fold components for faster LCP */
const AboutSection = lazy(() => import("./components/sections/AboutSection"));
const TechLogoLoop = lazy(() => import("./components/sections/TechLogoLoop"));
const ProjectsSection = lazy(() => import("./components/sections/ProjectsSection"));
const ContactSection = lazy(() => import("./components/sections/ContactSection"));
const Footer = lazy(() => import("./components/layout/Footer"));
const CaughtYouModal = lazy(() => import("./components/ui/CaughtYouModal"));

/* ─── Section placeholder inside glass cards ──────────────────── */
function Section({ id, title, description }) {
  return (
    <GlassSection id={id}>
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <ShuffleHeading
          text={title}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
        />
        <ScrollReveal>
          <p className="max-w-xl text-center text-gray-500 dark:text-gray-300 text-lg">
            {description}
          </p>
        </ScrollReveal>
      </div>
    </GlassSection>
  );
}

/* ─── Scrolling text band at Home/About boundary ─────────────── */
import { useEffect, useRef, useState, useCallback } from "react";

function ScrollingTextBand() {
  const ref = useRef(null);
  const [topPx, setTopPx] = useState(0);

  useEffect(() => {
    const measure = () => {
      const home = document.getElementById("home");
      if (home && ref.current) {
        const parent = ref.current.offsetParent;
        if (parent) {
          const homeRect = home.getBoundingClientRect();
          const parentRect = parent.getBoundingClientRect();
          setTopPx(homeRect.bottom - parentRect.top);
        }
      }
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    const home = document.getElementById("home");
    if (home) ro.observe(home);
    return () => { window.removeEventListener("resize", measure); ro.disconnect(); };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute left-0 right-0 z-20 pointer-events-none"
      style={{ top: topPx, transform: "translateY(-50%)" }}
    >
      <CurvedLoopPrince />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   App — Aurora glass layout + Security Shield
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function App() {
  const devToolsOpen = useDevToolsDetect();
  const [modalOpen, setModalOpen] = useState(false);

  /* Show modal when DevTools detected — stays until DevTools is closed */
  useEffect(() => {
    setModalOpen(devToolsOpen);
  }, [devToolsOpen]);

  /* Triggered by keyboard shortcuts (F12, Ctrl+Shift+I, etc.) */
  const handleShortcutDetected = useCallback(() => {
    setModalOpen(true);
  }, []);

  return (
    <SecurityShield onDevToolsShortcut={handleShortcutDetected}>
      <AppBackground />

      {/* Skip to main content — Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      <div className="relative z-0 min-h-screen">
        <Navbar />

        <main id="main-content" className="pt-20 pb-12">
          {/* ── Home + Clock + About zone ──────────────────────── */}
          <div className="relative">
            {/* Home hero */}
            <CurvedLoopBandHero />

            {/* About in glass */}
            <div className="mt-8">
              <Suspense fallback={<div className="min-h-[40vh]" />}>
                <GlassSection id="about">
                  <AboutSection embedded />
                </GlassSection>
              </Suspense>
            </div>

            {/* Scrolling text band at boundary — BEHIND the clock */}
            <ScrollingTextBand />

            {/* Steampunk clock at section boundary — ABOVE the text */}
            <SplitClock />
          </div>

          {/* ── Remaining sections (lazy loaded) ───────────────── */}
          <Suspense fallback={<div className="min-h-[30vh]" />}>
            <GlassSection id="skills" noPadding>
              <TechLogoLoop embedded />
            </GlassSection>
          </Suspense>

          <Suspense fallback={<div className="min-h-[30vh]" />}>
            <GlassSection id="projects">
              <ProjectsSection embedded />
            </GlassSection>
          </Suspense>

          <Suspense fallback={<div className="min-h-[30vh]" />}>
            <GlassSection id="contact">
              <ContactSection embedded />
            </GlassSection>
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>

      {/* 3D popup modal — non-dismissable */}
      <Suspense fallback={null}>
        <CaughtYouModal isOpen={modalOpen} />
      </Suspense>
    </SecurityShield>
  );
}

export default App;
