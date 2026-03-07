import ScrollReveal from "../ui/ScrollReveal";

/* ── Footer nav links ────────────────────────────────────────── */
const FOOTER_LINKS = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

/* ── Social links ────────────────────────────────────────────── */
const SOCIALS = [
    {
        label: "GitHub",
        href: "https://github.com/iprincekumark",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com/in/iprincekumark",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: "Email",
        href: "mailto:iprincekumark@gmail.com",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
        ),
    },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Footer — Professional end-of-page footer
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer
            className="relative w-full border-t border-gray-200/30 dark:border-gray-800/40"
            aria-label="Site footer"
        >
            <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                    {/* ── Brand column ──────────────────────────── */}
                    <ScrollReveal>
                        <div className="space-y-4">
                            <a
                                href="#home"
                                className="inline-block text-2xl font-extrabold tracking-tight"
                            >
                                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                    Princevrse
                                </span>
                            </a>
                            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 max-w-xs">
                                Full-stack developer crafting scalable systems
                                and premium digital experiences.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* ── Quick links ───────────────────────────── */}
                    <ScrollReveal delay={0.1}>
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-4">
                                Quick Links
                            </h4>
                            <ul className="space-y-2.5">
                                {FOOTER_LINKS.map(({ label, href }) => (
                                    <li key={href}>
                                        <a
                                            href={href}
                                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                                        >
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ScrollReveal>

                    {/* ── Connect ───────────────────────────────── */}
                    <ScrollReveal delay={0.2}>
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-4">
                                Connect
                            </h4>
                            <div className="flex gap-3">
                                {SOCIALS.map(({ label, href, icon }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="
                                            flex items-center justify-center w-10 h-10 rounded-xl
                                            text-gray-500 dark:text-gray-400
                                            bg-gray-100/60 dark:bg-white/5
                                            hover:bg-indigo-50 hover:text-indigo-600
                                            dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400
                                            border border-gray-200/50 dark:border-gray-700/40
                                            transition-all duration-200
                                        "
                                    >
                                        {icon}
                                    </a>
                                ))}
                            </div>
                            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                iprincekumark@gmail.com
                            </p>
                        </div>
                    </ScrollReveal>
                </div>

                {/* ── Bottom bar ────────────────────────────────── */}
                <div className="mt-10 pt-6 border-t border-gray-200/30 dark:border-gray-800/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        © {year} Princevrse. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        Designed & Built with ❤️
                    </p>
                </div>
            </div>
        </footer>
    );
}
