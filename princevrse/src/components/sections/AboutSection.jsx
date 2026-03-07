import { useState, useEffect, useRef, useCallback } from "react";
import ScrollReveal from "../ui/ScrollReveal";

/* ── All profile photos (scroll-cycled) ──────────────────────────── */
import photo01 from "../../assets/Photo-01.webp";
import photo02 from "../../assets/Photo-02.webp";
import photo03 from "../../assets/Photo-03.webp";
import photo04 from "../../assets/Photo-04.webp";
import photo05 from "../../assets/Photo-05.webp";
import photo06 from "../../assets/Photo-06.webp";
import photo07 from "../../assets/Photo-07.webp";
import photo08 from "../../assets/Photo-08.webp";
import photo09 from "../../assets/Photo-09.webp";
import photo10 from "../../assets/Photo-10.webp";
import photo11 from "../../assets/Photo-11.webp";
import photo12 from "../../assets/Photo-12.webp";
import photo13 from "../../assets/Photo-13.webp";
import photo14 from "../../assets/Photo-14.webp";
import photo15 from "../../assets/Photo-15.webp";
import photo16 from "../../assets/Photo-16.webp";
import photo17 from "../../assets/Photo-17.webp";

const PHOTOS = [
    photo01, photo02, photo03, photo04, photo05,
    photo06, photo07, photo08, photo09, photo10,
    photo11, photo12, photo13, photo14, photo15,
    photo16, photo17,
];

/* ── Carousel words that cycle every 0.4s ────────────────────────── */
const CAROUSEL_WORDS = [
    "experiences",
    "solutions",
    "products",
    "systems",
    "platforms",
    "innovations",
];

/* ── Description paragraphs ──────────────────────────────────────── */
const ABOUT_PARAGRAPHS = [
    "I'm Prince Kanoujiya, an engineering-driven developer who turns complex technical challenges into high-speed web products. I manage the entire stack with a focus on clean, reusable code and seamless performance. I excel in Spring Boot and full-stack architecture, always delivering modern solutions that actually solve problems for every user.",
    "With 2+ years at Cognizant building production-grade systems for a Fortune 500 retail client, I've handled 50k+ concurrent users with API latency as low as 3ms.",
    "My code is built to last, helping your startup reach the next level!",
];

/* ── Social links ────────────────────────────────────────────────── */
const SOCIALS = [
    {
        label: "LinkedIn",
        href: "https://linkedin.com/in/iprincekumark",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: "GitHub",
        href: "https://github.com/iprincekumark",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
        ),
    },
    {
        label: "Twitter / X",
        href: "https://x.com/iprincekumark",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   AboutSection — Redesigned layout matching reference
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function AboutSection({ embedded = false }) {
    const Tag = embedded ? "div" : "section";

    /* ── Cycling carousel word ─────────────────────────────────── */
    const [wordIndex, setWordIndex] = useState(0);
    const [photoIndex, setPhotoIndex] = useState(0);
    const sectionRef = useRef(null);

    /* ── Cycling carousel word ─────────────────────────────────── */
    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % CAROUSEL_WORDS.length);
        }, 400);
        return () => clearInterval(interval);
    }, []);

    /* ── Scroll-based photo cycling ────────────────────────────── */
    const updatePhoto = useCallback(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight;
        // progress 0→1 as section scrolls through viewport
        const raw = 1 - (rect.bottom / (viewH + rect.height));
        const progress = Math.max(0, Math.min(1, raw));
        const idx = Math.min(
            PHOTOS.length - 1,
            Math.floor(progress * PHOTOS.length)
        );
        setPhotoIndex(idx);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", updatePhoto, { passive: true });
        updatePhoto();
        return () => window.removeEventListener("scroll", updatePhoto);
    }, [updatePhoto]);

    return (
        <Tag
            ref={sectionRef}
            {...(!embedded && { id: "about" })}
            aria-label="About Prince Kanoujiya"
            className={`relative w-full py-16 sm:py-22 lg:py-28 px-6 transition-colors duration-300 ${embedded ? "" : "bg-white dark:bg-gray-950"
                }`}
        >
            <div className="mx-auto max-w-6xl">
                {/* ── Two-column grid: text left + photo right ────── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* LEFT — Text content */}
                    <div>
                        {/* Subtitle */}
                        <ScrollReveal>
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-500 dark:text-indigo-400 mb-4">
                                A Quick Glance
                            </p>
                        </ScrollReveal>

                        {/* Main headline with cycling word */}
                        <ScrollReveal delay={0.05}>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-gray-100 mb-8">
                                Building the bridge between ideas and{" "}
                                <span
                                    className="italic bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent"
                                    key={wordIndex}
                                    style={{
                                        display: "inline-block",
                                        animation: "fadeInUp 0.3s ease-out",
                                    }}
                                >
                                    {CAROUSEL_WORDS[wordIndex]}
                                </span>
                            </h2>
                        </ScrollReveal>

                        {/* Description paragraphs */}
                        <div className="space-y-4 mb-8">
                            {ABOUT_PARAGRAPHS.map((paragraph, index) => (
                                <ScrollReveal key={index} delay={0.1 + index * 0.08}>
                                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {paragraph}
                                    </p>
                                </ScrollReveal>
                            ))}
                        </div>

                        {/* Social icons */}
                        <ScrollReveal delay={0.35}>
                            <div className="flex items-center gap-4">
                                {SOCIALS.map(({ label, href, icon }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200"
                                    >
                                        {icon}
                                    </a>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* RIGHT — Tilted profile photo */}
                    <ScrollReveal delay={0.15}>
                        <div className="flex justify-center lg:justify-end">
                            <div
                                className="
                                    relative w-64 sm:w-72 md:w-80 aspect-[3/4]
                                    rounded-2xl overflow-hidden
                                    shadow-2xl dark:shadow-indigo-500/10
                                    border-2 border-gray-200/30 dark:border-gray-700/30
                                    rotate-3 hover:rotate-0
                                    transition-transform duration-500 ease-out
                                "
                            >
                                <img
                                    src={PHOTOS[photoIndex]}
                                    alt={`Prince Kanoujiya — Photo ${photoIndex + 1}`}
                                    className="w-full h-full object-cover object-top transition-opacity duration-150"
                                    loading="lazy"
                                    width="400"
                                    height="500"
                                />
                                {/* Subtle gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>

            {/* ── Carousel word animation keyframes ──────────────── */}
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </Tag>
    );
}
