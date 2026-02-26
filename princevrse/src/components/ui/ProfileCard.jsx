import { useRef, useState, useCallback } from "react";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ProfileCard — Interactive tilt + glow card with profile info
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function ProfileCard({
    imageSrc,
    name = "Prince Kanoujiya",
    title = "Software Engineer",
    handle = "@iprincekumark",
    status = "Available",
}) {
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);

    /* ── Mouse tracking for 3D tilt + glow ────────────────────── */
    const handleMouseMove = useCallback((e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        // Tilt: ±12deg range
        setTilt({
            x: (y - 0.5) * -24,
            y: (x - 0.5) * 24,
        });
        // Glow follows cursor
        setGlowPos({ x: x * 100, y: y * 100 });
    }, []);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
    };

    return (
        <div
            className="flex justify-center lg:justify-end w-full"
            style={{ perspective: "1000px" }}
        >
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="
          relative w-72 sm:w-80 rounded-2xl overflow-hidden
          bg-white dark:bg-gray-900
          border border-gray-200/60 dark:border-gray-800/60
          shadow-xl dark:shadow-2xl dark:shadow-indigo-500/5
          transition-shadow duration-500
          cursor-default select-none
        "
                style={{
                    transform: isHovered
                        ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.03, 1.03, 1.03)`
                        : "rotateX(0) rotateY(0) scale3d(1, 1, 1)",
                    transition: "transform 0.15s ease-out, box-shadow 0.5s ease",
                    willChange: "transform",
                }}
            >
                {/* ── Glow overlay ─────────────────────────────────── */}
                <div
                    className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300"
                    style={{
                        opacity: isHovered ? 0.15 : 0,
                        background: `radial-gradient(600px circle at ${glowPos.x}% ${glowPos.y}%, rgba(99,102,241,0.4), transparent 40%)`,
                    }}
                />

                {/* ── Profile image ────────────────────────────────── */}
                <div className="relative w-full aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                        src={imageSrc}
                        alt={`${name} — ${title}`}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                    />
                    {/* Subtle bottom gradient for text readability */}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
                </div>

                {/* ── Info section ──────────────────────────────────── */}
                <div className="relative z-10 px-5 pb-5 -mt-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        {title}
                    </p>
                    <p className="text-xs text-indigo-500 dark:text-indigo-400 font-medium mt-1">
                        {handle}
                    </p>

                    {/* Status badge */}
                    <div className="mt-3 flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        </span>
                        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                            {status}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
