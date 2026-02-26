import SplitText from "../../components/ui/SplitText";
import GlitchPrince from "./GlitchPrince";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HeroIntro — Premium hero heading

   "Hello" + 👋🏻 emoji  — medium, left-aligned at 15%
   "I'm" + "Prince"     — Prince uses GlitchText animation
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function HeroIntro() {
    return (
        <div className="w-full flex flex-col justify-center">
            {/* Line 1 — Hello + emoji, left-aligned with 15% padding */}
            <h2
                className="leading-tight mb-3 sm:mb-4"
                style={{ paddingLeft: "15%" }}
            >
                <SplitText
                    text="Hello"
                    delay={0.1}
                    stagger={0.04}
                    className="
                        text-[clamp(2rem,4.6vw,4rem)]
                        font-bold
                        text-gray-800 dark:text-gray-200
                        tracking-tight
                    "
                    as="span"
                />
                <span className="inline-block ml-2 text-[clamp(2rem,4.6vw,4rem)]">
                    👋🏻
                </span>
            </h2>

            {/* Line 2 — I'm + Prince (Prince has glitch effect) */}
            <h1 className="leading-[1.1] text-center">
                <SplitText
                    text="I'm "
                    delay={0.35}
                    stagger={0.04}
                    className="
                        text-[clamp(2.9rem,6.7vw,5.8rem)]
                        font-bold
                        text-gray-900 dark:text-gray-100
                        tracking-tight
                    "
                    as="span"
                />
                <GlitchPrince
                    className="
                        text-[clamp(6.7rem,15.5vw,13.2rem)]
                        font-extrabold
                        text-gray-900 dark:text-gray-100
                        tracking-tight
                    "
                />
            </h1>
        </div>
    );
}
