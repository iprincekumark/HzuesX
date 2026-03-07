import HeroIntro from "./HeroIntro";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CurvedLoopBandHero

   Home section with hero intro text.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function CurvedLoopBandHero() {
    return (
        <section
            id="home"
            aria-label="Prince Turns Problems Into Products"
            className="
        min-h-[55vh] sm:min-h-[75vh] lg:min-h-[110vh] w-full
        flex items-start justify-start
        transition-colors duration-300
        overflow-hidden
        pt-[6vh] sm:pt-[10vh] lg:pt-[12vh]
      "
        >
            <HeroIntro />
        </section>
    );
}
