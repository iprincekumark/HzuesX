import { useRef, useEffect, useCallback, useState } from "react";
import { gsap } from "gsap";

/* ── Character set for shuffle scramble ──────────────────────────── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ShuffleHeading — Section title with text-scramble on scroll reveal
   
   Characters scramble through random glyphs before resolving to the
   real text. Triggers once when the heading scrolls into view.
   
   Props:
     text        — the heading text
     as          — HTML tag ("h2" default)
     className   — additional Tailwind classes
     duration    — scramble duration per char (seconds)
     stagger     — delay between each character (seconds)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function ShuffleHeading({
    text,
    as: Tag = "h2",
    className = "",
    duration = 0.5,
    stagger = 0.03,
}) {
    const containerRef = useRef(null);
    const charsRef = useRef([]);
    const tweensRef = useRef([]);
    const [hasRevealed, setHasRevealed] = useState(false);

    /* ── Respect prefers-reduced-motion ─────────────────────────── */
    const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ── Scramble a single character span ───────────────────────── */
    const scrambleChar = useCallback(
        (span, targetChar, delay = 0) => {
            if (prefersReduced) return;

            const iterations = Math.floor(duration / 0.04);
            let count = 0;

            gsap.killTweensOf(span);

            const tween = gsap.to(
                {},
                {
                    duration,
                    delay,
                    onUpdate() {
                        count++;
                        if (count < iterations * 0.7) {
                            span.textContent =
                                CHARS[Math.floor(Math.random() * CHARS.length)];
                            span.style.opacity = "0.7";
                        } else {
                            span.textContent = targetChar;
                            span.style.opacity = "1";
                        }
                    },
                    onComplete() {
                        span.textContent = targetChar;
                        span.style.opacity = "1";
                    },
                }
            );

            tweensRef.current.push(tween);
        },
        [duration, prefersReduced]
    );

    /* ── Trigger shuffle on all characters ──────────────────────── */
    const triggerShuffle = useCallback(() => {
        if (prefersReduced) return;
        tweensRef.current.forEach((t) => t.kill());
        tweensRef.current = [];

        charsRef.current.forEach((span, i) => {
            if (span) scrambleChar(span, text[i], i * stagger);
        });
    }, [text, stagger, scrambleChar, prefersReduced]);

    /* ── ScrollTrigger: reveal once when heading enters viewport ── */
    useEffect(() => {
        if (hasRevealed || prefersReduced) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    triggerShuffle();
                    setHasRevealed(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [hasRevealed, triggerShuffle, prefersReduced]);

    /* ── Cleanup ────────────────────────────────────────────────── */
    useEffect(() => {
        return () => tweensRef.current.forEach((t) => t.kill());
    }, []);

    return (
        <Tag
            ref={containerRef}
            className={className}
            onMouseEnter={triggerShuffle}
        >
            <span
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                aria-hidden="true"
            >
                {text.split("").map((char, i) => (
                    <span
                        key={i}
                        ref={(el) => (charsRef.current[i] = el)}
                        className="inline-block transition-opacity duration-150"
                        style={{ minWidth: char === " " ? "0.25em" : undefined }}
                    >
                        {char}
                    </span>
                ))}
            </span>
            {/* Screen reader gets the plain text */}
            <span className="sr-only">{text}</span>
        </Tag>
    );
}
