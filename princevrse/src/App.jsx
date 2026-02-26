import Navbar from "./components/layout/Navbar";
import TechLogoLoop from "./components/sections/TechLogoLoop";
import AboutSection from "./components/sections/AboutSection";
import CurvedLoopBandHero from "./sections/home/CurvedLoopBandHero";
import GlassSection from "./components/layout/GlassSection";
import ShuffleHeading from "./components/ui/ShuffleHeading";
import ScrollReveal from "./components/ui/ScrollReveal";
import SplitClock from "./components/ui/SplitClock";
import CurvedLoopPrince from "./components/animation/CurvedLoopPrince";
import AppBackground from "./theme/AppBackground";

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
import { useEffect, useRef, useState } from "react";

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

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   App — Aurora glass layout
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function App() {
  return (
    <>
      <AppBackground />

      <div className="relative z-0 min-h-screen">
        <Navbar />

        <main className="pt-20 pb-12">
          {/* ── Home + Clock + About zone ──────────────────────── */}
          <div className="relative">
            {/* Home hero */}
            <CurvedLoopBandHero />

            {/* About in glass */}
            <div className="mt-8">
              <GlassSection id="about">
                <AboutSection embedded />
              </GlassSection>
            </div>

            {/* Scrolling text band at boundary — BEHIND the clock */}
            <ScrollingTextBand />

            {/* Steampunk clock at section boundary — ABOVE the text */}
            <SplitClock />
          </div>

          {/* ── Remaining sections ─────────────────────────────── */}
          <GlassSection id="skills" noPadding>
            <TechLogoLoop embedded />
          </GlassSection>

          <Section
            id="projects"
            title="Projects"
            description="Explore my work — from side projects to production apps."
          />
          <Section
            id="contact"
            title="Contact"
            description="Let's connect! Reach out for collaborations or just to say hi."
          />
          <Section
            id="resume"
            title="Resume"
            description="View my professional experience and qualifications."
          />
        </main>
      </div>
    </>
  );
}

export default App;
