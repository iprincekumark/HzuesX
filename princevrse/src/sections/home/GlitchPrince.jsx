import GlitchText from "../../components/ui/GlitchText";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   GlitchPrince — Preconfigured GlitchText for the hero "Prince"

   Usage: <GlitchPrince className="text-[6rem] font-extrabold" />
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function GlitchPrince({ className = "" }) {
    return (
        <GlitchText
            text="Prince"
            speed={1}
            enableShadows={true}
            className={className}
        />
    );
}
