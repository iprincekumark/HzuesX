import { useState, useEffect, useRef } from "react";
import ScrollReveal from "../ui/ScrollReveal";

/* ── Project showcase images (scroll-cycled) ─────────────────── */
import rchHero from "../../assets/RCH.png";
import rchFeatures from "../../assets/RCH-01.png";
import rchAbout from "../../assets/RCH-02.png";
import rchStory from "../../assets/RCH-03.png";

const SHOWCASE_IMAGES = [rchHero, rchFeatures, rchAbout, rchStory];

/* ── Tech stack pills ────────────────────────────────────────── */
const TECH_TAGS = [
    { label: "React", color: "#61dafb", icon: "⚛️" },
    { label: "Java", color: "#f89820", icon: "☕" },
    { label: "Spring Boot", color: "#6db33f", icon: "🍃" },
    { label: "Microservices", color: "#a78bfa", icon: "🔗" },
    { label: "REST APIs", color: "#ef4444", icon: "🌐" },
    { label: "PostgreSQL", color: "#336791", icon: "🐘" },
    { label: "Redis", color: "#dc382d", icon: "⚡" },
    { label: "Docker", color: "#2496ed", icon: "🐳" },
    { label: "RabbitMQ", color: "#ff6600", icon: "🐰" },
];

/* ── Feature highlights ──────────────────────────────────────── */
const FEATURES = [
    "Multi-tenant SaaS with strict data isolation, supporting 5 user roles and scalable to enterprise workloads",
    "Real-time visitor management with QR-code entry passes, vehicle tracking, and host notifications",
    "Priority-routed maintenance workflows, payment processing, and community social networking",
];

/* ── Description (100–150 words) ─────────────────────────────── */
const DESCRIPTION = `Residential Community Hub is a full-stack SaaS platform that streamlines how residential societies manage daily operations. Built with Java 17, Spring Boot 3 microservices, and a React 19 frontend, the system replaces fragmented tools with a single unified solution. Key modules include real-time visitor management with QR-based entry passes, priority-routed maintenance workflows, role-based announcements, secure payment processing, and a private community social network. The multi-tenant architecture ensures strict data isolation across societies while supporting 5 distinct user roles. Backed by PostgreSQL, Redis caching, and RabbitMQ messaging, the platform handles high concurrency with enterprise-grade reliability. The responsive UI features interactive dashboards, real-time analytics, and a clean component-driven design — delivering a production-ready product that demonstrates end-to-end full-stack development capability.`;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ProjectsSection — Venture Showcase
   Matches the reference design: section header, two-column project
   card (text left / scroll-cycling screenshot right), dark + light.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function ProjectsSection({ embedded = false }) {
    const Tag = embedded ? "div" : "section";
    const sectionRef = useRef(null);
    const [imageIndex, setImageIndex] = useState(0);

    /* ── Auto-cycle images every 0.4s ────────────────────────── */
    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndex((prev) => (prev + 1) % SHOWCASE_IMAGES.length);
        }, 400);
        return () => clearInterval(interval);
    }, []);

    return (
        <Tag
            ref={sectionRef}
            {...(!embedded && { id: "projects" })}
            aria-label="Projects — Venture Showcase"
            className="relative w-full py-10 sm:py-16 lg:py-28 px-4 sm:px-6"
        >
            <div className="mx-auto max-w-6xl">
                {/* ── Section header ──────────────────────────── */}
                <ScrollReveal>
                    <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 mb-3">
                        Crafting Modern Experiences
                    </p>
                </ScrollReveal>

                <ScrollReveal delay={0.05}>
                    <h2 className="venture-showcase-title text-center text-gray-900 dark:text-white mb-10 sm:mb-16 lg:mb-20">
                        VENTURE{" "}
                        <span className="italic-gradient">SHOWCASE</span>
                    </h2>
                </ScrollReveal>

                {/* ── Project card ────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                    {/* LEFT — Text content */}
                    <div className="flex flex-col gap-6">
                        {/* Title with red dash */}
                        <ScrollReveal delay={0.1}>
                            <div className="project-title-accent">
                                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Residential Community Hub
                                </h3>
                            </div>
                        </ScrollReveal>

                        {/* Description */}
                        <ScrollReveal delay={0.15}>
                            <p className="text-sm sm:text-[0.92rem] leading-relaxed text-gray-600 dark:text-gray-400">
                                {DESCRIPTION}
                            </p>
                        </ScrollReveal>

                        {/* Feature highlights */}
                        <ScrollReveal delay={0.2}>
                            <ul className="space-y-3">
                                {FEATURES.map((feat, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="feature-bullet">✦</span>
                                        <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {feat}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </ScrollReveal>

                        {/* Tech tags */}
                        <ScrollReveal delay={0.25}>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {TECH_TAGS.map(({ label, icon }) => (
                                    <span key={label} className="tech-pill">
                                        <span className="text-sm">{icon}</span>
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* RIGHT — Scroll-cycling showcase image */}
                    <ScrollReveal delay={0.15}>
                        <div className="flex justify-center lg:justify-end">
                            <div className="device-frame device-desktop w-full max-w-lg">
                                <img
                                    src={SHOWCASE_IMAGES[imageIndex]}
                                    alt={`Residential Community Hub — Screenshot ${imageIndex + 1}`}
                                    className="transition-opacity duration-150"
                                />
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </Tag>
    );
}
