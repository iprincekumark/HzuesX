import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* Register GSAP plugin */
gsap.registerPlugin(ScrollTrigger);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ScrollReveal — Animates children on scroll via GSAP ScrollTrigger
   
   Props:
     children  — content to reveal
     delay     — stagger delay (seconds), default 0
     className — additional classes
     blur      — enable subtle blur (default true)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function ScrollReveal({
    children,
    delay = 0,
    className = "",
    blur = true,
}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        /* ── Respect prefers-reduced-motion ──────────────────── */
        const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReduced) {
            gsap.set(el, { opacity: 1, y: 0, filter: "blur(0px)" });
            return;
        }

        /* ── Initial hidden state ───────────────────────────── */
        gsap.set(el, {
            opacity: 0,
            y: 40,
            filter: blur ? "blur(6px)" : "blur(0px)",
        });

        /* ── Reveal animation ───────────────────────────────── */
        const tween = gsap.to(el, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            delay,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                end: "top 50%",
                toggleActions: "play none none reverse",
            },
        });

        return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
        };
    }, [delay, blur]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
