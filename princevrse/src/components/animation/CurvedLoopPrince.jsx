import { useRef, useEffect } from "react";

/* ── Default hero text ─────────────────────────────────────────── */
const DEFAULT_TEXT =
    "Prince  ✦  Turns  ✦  Problems  ✦  Into  ✦  Products  ✦  ";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CurvedLoopPrince

   Horizontal infinite-scroll text loop — right to left.
   Text size matches About description (text-sm / md:text-base).
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function CurvedLoopPrince({
    text = DEFAULT_TEXT,
    speed = 60,
    className = "",
}) {
    const trackRef = useRef(null);
    const rafRef = useRef(null);
    const offsetRef = useRef(0);

    const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const effectiveSpeed = prefersReduced ? speed * 0.15 : speed;

    useEffect(() => {
        let last = performance.now();

        const tick = (now) => {
            const dt = (now - last) / 1000;
            last = now;

            offsetRef.current += effectiveSpeed * dt;

            if (trackRef.current) {
                // Reset when scrolled past half (seamless loop)
                const halfWidth = trackRef.current.scrollWidth / 2;
                if (offsetRef.current >= halfWidth) {
                    offsetRef.current -= halfWidth;
                }
                trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
            }

            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [effectiveSpeed]);

    // Repeat text enough times to fill screen + overflow for seamless loop
    const repeatedText = text.repeat(20);

    return (
        <div
            className={`w-full overflow-hidden select-none ${className}`}
            aria-hidden="true"
        >
            <div
                ref={trackRef}
                className="whitespace-nowrap will-change-transform
                    text-sm md:text-base
                    font-extrabold uppercase tracking-widest
                    text-gray-900 dark:text-gray-100"
                style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
            >
                {repeatedText}
            </div>
        </div>
    );
}
