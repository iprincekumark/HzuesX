import { useState, useEffect } from "react";

/* ─── react-icons imports ──────────────────────────────────────── */
import { FaJava, FaShieldAlt } from "react-icons/fa";
import {
    SiCplusplus,
    SiJavascript,
    SiPython,
    SiGo,
    SiHtml5,
    SiCss3,
    SiSpringboot,
    SiSpring,
    SiHibernate,
    SiReact,
    SiBootstrap,
    SiMysql,
    SiMongodb,
    SiJenkins,
    SiDocker,
    SiGit,
    SiApachemaven,
    SiPostman,
    SiJira,
    SiJunit5,
    SiSonarqube,
} from "react-icons/si";
import { GiDuck } from "react-icons/gi";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Skills data — arranged in rows for centered pill layout
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const SKILL_ROWS = [
    [
        { icon: FaJava, label: "Java", color: "#E76F00" },
        { icon: SiCplusplus, label: "C++", color: "#00599C" },
        { icon: SiJavascript, label: "JavaScript", color: "#F7DF1E" },
        { icon: SiPython, label: "Python", color: "#3776AB" },
        { icon: SiGo, label: "Go", color: "#00ADD8" },
        { icon: SiHtml5, label: "HTML5", color: "#E34F26" },
        { icon: SiCss3, label: "CSS3", color: "#1572B6" },
    ],
    [
        { icon: SiSpringboot, label: "Spring Boot", color: "#6DB33F" },
        { icon: SiSpring, label: "Spring Framework", color: "#6DB33F" },
        { icon: SiSpring, label: "Spring Data JPA", color: "#6DB33F" },
        { icon: SiHibernate, label: "Hibernate", color: "#59666C" },
        { icon: SiReact, label: "React.js", color: "#61DAFB" },
        { icon: SiBootstrap, label: "Bootstrap", color: "#7952B3" },
    ],
    [
        { icon: SiMysql, label: "MySQL", color: "#4479A1" },
        { icon: SiMongodb, label: "MongoDB", color: "#47A248" },
        { icon: SiJenkins, label: "Jenkins", color: "#D24939" },
        { icon: SiDocker, label: "Docker", color: "#2496ED" },
        { icon: SiGit, label: "Git", color: "#F05032" },
        { icon: SiApachemaven, label: "Maven", color: "#C71A36" },
    ],
    [
        { icon: SiPostman, label: "Postman", color: "#FF6C37" },
        { icon: SiJira, label: "JIRA", color: "#0052CC" },
        { icon: SiJunit5, label: "JUnit", color: "#25A162" },
        { icon: FaShieldAlt, label: "Fortify", color: "#FF6D00" },
        { icon: GiDuck, label: "Black Duck", color: "#1a1a1a" },
        { icon: SiSonarqube, label: "SonarQube", color: "#4E9BCD" },
    ],
];

/* ── Carousel words for heading ───────────────────────────────── */
const MAGIC_WORDS = ["Behind", "Everything", "The Code", "The Stack"];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TechLogoLoop — Pill-badge skills grid
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function TechLogoLoop({ embedded = false }) {
    const [isDark, setIsDark] = useState(false);
    const [wordIdx, setWordIdx] = useState(0);

    useEffect(() => {
        const html = document.documentElement;
        const update = () => setIsDark(html.classList.contains("dark"));
        update();
        const obs = new MutationObserver(update);
        obs.observe(html, { attributes: true, attributeFilter: ["class"] });
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setWordIdx((p) => (p + 1) % MAGIC_WORDS.length);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const Tag = embedded ? "div" : "section";

    return (
        <Tag
            {...(!embedded && { id: "skills" })}
            aria-label="Technology expertise"
            className={`relative w-full py-16 sm:py-22 lg:py-28 transition-colors duration-300 ${embedded ? "" : "bg-white dark:bg-gray-950"
                }`}
        >
            {/* ── Heading area ─────────────────────────────────────── */}
            <div className="text-center mb-12 sm:mb-16 px-6">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-500 dark:text-indigo-400 mb-4">
                    My Skillset
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                    The Magic{" "}
                    <span
                        key={wordIdx}
                        className="italic bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent"
                        style={{ display: "inline-block", animation: "fadeInUp 0.3s ease-out" }}
                    >
                        {MAGIC_WORDS[wordIdx]}
                    </span>
                </h2>
            </div>

            {/* ── Skill pill rows ──────────────────────────────────── */}
            <div className="flex flex-col items-center gap-4 px-4 sm:px-8">
                {SKILL_ROWS.map((row, ri) => (
                    <div
                        key={ri}
                        className="flex flex-wrap justify-center gap-3"
                    >
                        {row.map(({ icon: Icon, label, color }) => (
                            <div
                                key={label}
                                className="
                                    group flex items-center gap-2
                                    px-4 py-2.5 rounded-full
                                    bg-gray-100/70 dark:bg-white/5
                                    border border-gray-200/50 dark:border-white/10
                                    hover:bg-gray-200/80 dark:hover:bg-white/10
                                    hover:border-gray-300 dark:hover:border-white/20
                                    hover:scale-105
                                    transition-all duration-200
                                    cursor-default select-none
                                "
                            >
                                <Icon
                                    className="w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200"
                                    style={{ color: isDark ? "#d1d5db" : color }}
                                />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* ── Animation keyframes ──────────────────────────────── */}
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </Tag>
    );
}
