import { useEffect, useState } from "react";
import Aurora from "../components/background/Aurora";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   AppBackground
   
   dark  → animated OGL Aurora shader
   light → Aceternity Aurora (CSS repeating-linear-gradient)
   
   Fixed behind all content at z-[-1].
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function AppBackground() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        const check = () => setIsDark(root.classList.contains("dark"));
        check();
        const observer = new MutationObserver(check);
        observer.observe(root, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* Dark mode: OGL shader aurora */}
            <div
                className={`fixed inset-0 -z-10 transition-colors duration-500 ${isDark ? "bg-gray-950" : "bg-white"
                    }`}
                aria-hidden="true"
            >
                {isDark && (
                    <Aurora
                        colorStops={["#7cff67", "#B19EEF", "#5227FF"]}
                        blend={0.5}
                        amplitude={1.0}
                        speed={1}
                    />
                )}
            </div>

            {/* Light mode: Aceternity Aurora */}
            {!isDark && (
                <div
                    className="fixed inset-0 -z-[9] overflow-hidden"
                    aria-hidden="true"
                    style={{
                        "--white-gradient":
                            "repeating-linear-gradient(100deg, #fff 0%, #fff 7%, transparent 10%, transparent 12%, #fff 16%)",
                        "--aurora":
                            "repeating-linear-gradient(100deg, #bfdbfe 10%, #ddd6fe 15%, #c7d2fe 20%, #e9d5ff 25%, #bfdbfe 30%)",
                    }}
                >
                    {/* Layer 1: base aurora + white wash */}
                    <div
                        className="absolute -inset-[10px] opacity-30 will-change-transform animate-aurora"
                        style={{
                            backgroundImage: "var(--white-gradient), var(--aurora)",
                            backgroundSize: "300%, 200%",
                            backgroundPosition: "50% 50%, 50% 50%",
                            filter: "blur(10px)",
                        }}
                    />

                    {/* Layer 2: blurred mix-blend-difference */}
                    <div
                        className="absolute -inset-[10px] opacity-30 will-change-transform animate-aurora mix-blend-difference"
                        style={{
                            backgroundImage: "var(--white-gradient), var(--aurora)",
                            backgroundSize: "200%, 100%",
                            filter: "blur(30px)",
                        }}
                    />
                </div>
            )}
        </>
    );
}
