import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SplitText — Per-character scroll-triggered reveal animation

   Props:
     text       — string to animate
     delay      — base delay before animation starts (seconds)
     stagger    — delay between each character (seconds)
     className  — additional classes for the wrapper
     as         — HTML tag to render (default "span")
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function SplitText({
    text = "",
    delay = 0,
    stagger = 0.03,
    className = "",
    as: Tag = "span",
}) {
    const containerRef = useRef(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const chars = el.querySelectorAll(".split-char");
        if (!chars.length) return;

        const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReduced) {
            gsap.set(chars, { opacity: 1, y: 0 });
            return;
        }

        gsap.set(chars, { opacity: 0, y: 40 });

        const tween = gsap.to(chars, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay,
            stagger,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
            },
        });

        return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
        };
    }, [text, delay, stagger]);

    return (
        <Tag ref={containerRef} className={`inline-block ${className}`}>
            {text.split("").map((char, i) => (
                <span
                    key={`${char}-${i}`}
                    className="split-char inline-block"
                    style={{ whiteSpace: char === " " ? "pre" : undefined }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </Tag>
    );
}
