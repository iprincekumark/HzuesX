import { useRef, useEffect, useCallback, useState } from "react";
import { gsap } from "gsap";

/* ── Character set for the shuffle scramble ──────────────────────── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   NavItemShuffle — Nav link with text-scramble animation on hover
   
   On hover: characters scramble through random glyphs before
   resolving to the original label (like a slot-machine / hacker
   terminal effect). Desktop only — mobile gets plain text.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function NavItemShuffle({
    label,
    href,
    isActive = false,
    onClick,
    className = "",
    duration = 0.4,
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

            // Kill any existing tween on this span
            gsap.killTweensOf(span);

            const tween = gsap.to(
                {},
                {
                    duration: duration,
                    delay,
                    onUpdate: function () {
                        count++;
                        if (count < iterations * 0.7) {
                            span.textContent =
                                CHARS[Math.floor(Math.random() * CHARS.length)];
                        } else {
                            span.textContent = targetChar;
                        }
                    },
                    onComplete: () => {
                        span.textContent = targetChar;
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
        // Kill previous tweens
        tweensRef.current.forEach((t) => t.kill());
        tweensRef.current = [];

        charsRef.current.forEach((span, i) => {
            if (span) {
                scrambleChar(span, label[i], i * stagger);
            }
        });
    }, [label, stagger, scrambleChar, prefersReduced]);

    /* ── Initial reveal animation (once) ────────────────────────── */
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
            { threshold: 0.5 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [hasRevealed, triggerShuffle, prefersReduced]);

    /* ── Cleanup tweens on unmount ───────────────────────────────── */
    useEffect(() => {
        return () => {
            tweensRef.current.forEach((t) => t.kill());
        };
    }, []);

    return (
        <a
            ref={containerRef}
            href={href}
            onClick={onClick}
            onMouseEnter={triggerShuffle}
            className={`
        relative px-3 py-2 text-sm font-medium rounded-lg
        transition-colors duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
        dark:focus-visible:ring-offset-gray-950
        ${isActive
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                }
        ${className}
      `}
            aria-current={isActive ? "page" : undefined}
        >
            {/* Character spans for desktop scramble */}
            <span className="hidden md:inline-flex" aria-hidden="true">
                {label.split("").map((char, i) => (
                    <span
                        key={i}
                        ref={(el) => (charsRef.current[i] = el)}
                        className="inline-block"
                        style={{ minWidth: char === " " ? "0.25em" : undefined }}
                    >
                        {char}
                    </span>
                ))}
            </span>

            {/* Screen-reader accessible + mobile fallback */}
            <span className="md:hidden">{label}</span>
            <span className="sr-only">{label}</span>

            {/* Animated underline */}
            <span
                className={`
          absolute inset-x-2 -bottom-0 h-0.5 rounded-full
          bg-gradient-to-r from-indigo-500 to-purple-500
          transition-transform duration-300 origin-left
          ${isActive ? "scale-x-100" : "scale-x-0"}
        `}
            />
        </a>
    );
}
