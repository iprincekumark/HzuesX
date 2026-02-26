import CurvedLoopPrince from "../../components/animation/CurvedLoopPrince";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CurvedLoopHero — Full-viewport red hero with curved looping text
   
   Always red background + white text regardless of theme.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function CurvedLoopHero() {
    return (
        <section
            id="home"
            aria-label="Prince Turns Problems Into Products"
            className="
        relative min-h-screen w-full overflow-hidden
        flex items-center justify-center
        bg-red-600
      "
        >
            {/* ── Subtle radial overlay for depth ──────────────────────── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 100%)",
                }}
            />

            {/* ── Curved loop SVG ──────────────────────────────────────── */}
            <div className="relative z-10 w-full h-full absolute inset-0">
                <CurvedLoopPrince speed={80} />
            </div>
        </section>
    );
}
