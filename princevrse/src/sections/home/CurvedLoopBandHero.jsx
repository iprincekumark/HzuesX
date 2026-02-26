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
        min-h-[110vh] w-full
        flex items-start justify-start
        transition-colors duration-300
        overflow-hidden
        pt-[12vh]
      "
        >
            <HeroIntro />
        </section>
    );
}
