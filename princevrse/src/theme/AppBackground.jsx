import { useEffect, useState } from "react";
import Aurora from "../components/background/Aurora";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   AppBackground
   
   dark  → animated Aurora shader
   light → plain white
   
   Fixed behind all content at z-[-1].
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function AppBackground() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const root = document.documentElement;

        const check = () => setIsDark(root.classList.contains("dark"));
        check();

        /* Watch for class changes on <html> */
        const observer = new MutationObserver(check);
        observer.observe(root, { attributes: true, attributeFilter: ["class"] });

        return () => observer.disconnect();
    }, []);

    return (
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
    );
}
