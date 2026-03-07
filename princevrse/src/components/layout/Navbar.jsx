import { useState, useEffect, useCallback } from "react";

/* ─── Nav Items Configuration ─────────────────────────────────── */
const NAV_ITEMS = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

/* ─── Theme Helper ────────────────────────────────────────────── */
const getInitialTheme = () => {
    if (typeof window === "undefined") return "dark";
    const stored = localStorage.getItem("princevrse-theme");
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Navbar Component
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState(getInitialTheme);

    /* ── Theme persistence & DOM sync ───────────────────────────── */
    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("princevrse-theme", theme);
    }, [theme]);

    const toggleTheme = () =>
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));

    /* ── Scroll shadow detection ────────────────────────────────── */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* ── IntersectionObserver for active section ────────────────── */
    useEffect(() => {
        const sectionIds = NAV_ITEMS.map((item) => item.href.slice(1));
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
        );

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    /* ── Close mobile menu on link click ────────────────────────── */
    const handleLinkClick = useCallback(() => {
        setMobileOpen(false);
    }, []);

    /* ── Close mobile menu on Escape key ────────────────────────── */
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") setMobileOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <nav
            role="navigation"
            aria-label="Main navigation"
            className={`
        fixed top-4 left-1/2 -translate-x-1/2 z-50
        w-[calc(100%-2rem)] max-w-5xl
        glass rounded-2xl md:rounded-full
        transition-all duration-300
        ${scrolled ? "shadow-lg shadow-black/10 dark:shadow-black/30" : ""}
      `}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* ── Logo ──────────────────────────────────────────── */}
                    <a
                        href="#home"
                        onClick={handleLinkClick}
                        className="group flex items-center gap-2 text-xl font-extrabold tracking-tight"
                        aria-label="Princevrse — Go to top"
                    >
                        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent transition-all duration-300 group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-indigo-500">
                            Princevrse
                        </span>
                    </a>

                    {/* ── Desktop Nav Links (left-aligned after logo) ─────── */}
                    <ul className="hidden md:flex items-center gap-1 ml-6">
                        {NAV_ITEMS.map(({ label, href }) => {
                            const isActive = activeSection === href.slice(1);
                            return (
                                <li key={href}>
                                    <a
                                        href={href}
                                        className={`
                                            relative px-3 py-2 text-sm font-medium rounded-lg
                                            transition-colors duration-200
                                            focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
                                            dark:focus-visible:ring-offset-gray-950
                                            ${isActive
                                                ? "text-indigo-600 dark:text-indigo-400"
                                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                                            }
                                        `}
                                        aria-current={isActive ? "page" : undefined}
                                    >
                                        {label}
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
                                </li>
                            );
                        })}
                    </ul>

                    {/* Spacer to push right controls to the end */}
                    <div className="flex-1" />

                    {/* ── Right controls ────────────────────────────────── */}
                    <div className="flex items-center gap-2">
                        {/* Theme toggle */}
                        <button
                            onClick={toggleTheme}
                            aria-label={
                                theme === "dark"
                                    ? "Switch to light mode"
                                    : "Switch to dark mode"
                            }
                            className="
                relative flex h-9 w-9 items-center justify-center rounded-lg
                text-gray-600 dark:text-gray-400
                hover:bg-gray-100 dark:hover:bg-gray-800
                hover:text-gray-900 dark:hover:text-gray-100
                transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
              "
                        >
                            <span
                                className={`absolute transition-all duration-300 text-lg ${theme === "dark"
                                    ? "rotate-0 scale-100 opacity-100"
                                    : "rotate-90 scale-0 opacity-0"
                                    }`}
                            >
                                🌙
                            </span>
                            <span
                                className={`absolute transition-all duration-300 text-lg ${theme === "light"
                                    ? "rotate-0 scale-100 opacity-100"
                                    : "-rotate-90 scale-0 opacity-0"
                                    }`}
                            >
                                ☀️
                            </span>
                        </button>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen((prev) => !prev)}
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-menu"
                            className="
                md:hidden flex h-9 w-9 items-center justify-center rounded-lg
                text-gray-600 dark:text-gray-400
                hover:bg-gray-100 dark:hover:bg-gray-800
                transition-colors duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
              "
                        >
                            {/* Animated hamburger → X */}
                            <div className="relative w-5 h-4 flex flex-col justify-between">
                                <span
                                    className={`block h-0.5 w-full rounded-full bg-current transition-all duration-300 origin-center ${mobileOpen ? "translate-y-[7px] rotate-45" : ""
                                        }`}
                                />
                                <span
                                    className={`block h-0.5 w-full rounded-full bg-current transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""
                                        }`}
                                />
                                <span
                                    className={`block h-0.5 w-full rounded-full bg-current transition-all duration-300 origin-center ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
                                        }`}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Mobile Drawer ──────────────────────────────────────── */}
            <div
                id="mobile-menu"
                role="menu"
                className={`
          md:hidden overflow-hidden
          transition-all duration-300 ease-in-out
          ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          border-t border-gray-200/50 dark:border-gray-800/50
        `}
            >
                <ul className="space-y-1 px-4 py-3">
                    {NAV_ITEMS.map(({ label, href }) => {
                        const isActive = activeSection === href.slice(1);
                        return (
                            <li key={href} role="none">
                                <a
                                    href={href}
                                    role="menuitem"
                                    onClick={handleLinkClick}
                                    className={`
                    block rounded-lg px-3 py-2.5 text-sm font-medium
                    transition-all duration-200
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                    ${isActive
                                            ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-100"
                                        }
                  `}
                                    aria-current={isActive ? "page" : undefined}
                                >
                                    {label}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}
