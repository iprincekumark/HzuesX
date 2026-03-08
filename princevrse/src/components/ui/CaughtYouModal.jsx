import { useEffect, useState, useRef } from "react";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CaughtYouModal — Interactive Aceternity-style popup

   Features:
   • Mouse-tracking spotlight effect
   • Aurora gradient inside the card
   • Animated border gradient (conic spin)
   • Floating particles
   • Contact CTA that scrolls to #contact section
   • Non-dismissable — blocks page permanently
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function CaughtYouModal({ isOpen }) {
    const [show, setShow] = useState(false);
    const [animate, setAnimate] = useState(false);
    const cardRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

    useEffect(() => {
        if (isOpen) {
            setShow(true);
            requestAnimationFrame(() =>
                requestAnimationFrame(() => setAnimate(true))
            );
        } else {
            setAnimate(false);
            const t = setTimeout(() => setShow(false), 400);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    /* ── Mouse-tracking spotlight ──────────────────────────────── */
    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
    };

    /* ── Contact scroll handler ───────────────────────────────── */
    const handleConnect = () => {
        const contactEl = document.getElementById("contact");
        if (contactEl) {
            contactEl.scrollIntoView({ behavior: "smooth" });
        }
    };

    if (!show) return null;

    return (
        <div
            className={`
                fixed inset-0 z-[9999] flex items-center justify-center
                transition-all duration-500 ease-out
                ${animate ? "bg-black/80 backdrop-blur-xl" : "bg-transparent backdrop-blur-0"}
            `}
        >
            {/* ── Main card ───────────────────────────────────────── */}
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                className={`
                    relative max-w-lg w-[92%] overflow-hidden rounded-2xl
                    transition-all duration-600 ease-out cursor-default
                    ${animate
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-75 translate-y-12"
                    }
                `}
                style={{
                    transform: animate
                        ? "perspective(800px) rotateX(1deg)"
                        : "perspective(800px) rotateX(12deg) scale(0.75)",
                }}
            >
                {/* ── Animated border glow (conic gradient) ───────── */}
                <div
                    className="absolute -inset-[2px] rounded-2xl opacity-80"
                    style={{
                        background:
                            "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #d946ef, #f43f5e, #f97316, #eab308, #22c55e, #3b82f6)",
                        animation: "borderSpin 4s linear infinite",
                    }}
                />

                {/* ── Card body ────────────────────────────────────── */}
                <div
                    className="relative rounded-2xl bg-black p-8 sm:p-10"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(99,102,241,0.15) 0%, transparent 50%),
                            radial-gradient(circle at 20% 80%, rgba(139,92,246,0.08) 0%, transparent 40%),
                            radial-gradient(circle at 80% 20%, rgba(59,130,246,0.08) 0%, transparent 40%)
                        `,
                    }}
                >
                    {/* ── Grid pattern overlay ─────────────────────── */}
                    <div
                        className="absolute inset-0 opacity-[0.03] rounded-2xl pointer-events-none"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                        }}
                    />

                    {/* ── Content ──────────────────────────────────── */}
                    <div className="relative text-center">
                        {/* Animated eye */}
                        <div
                            className="text-6xl mb-6 inline-block"
                            style={{
                                animation: animate
                                    ? "bounce 2s ease-in-out infinite"
                                    : "none",
                            }}
                        >
                            👀
                        </div>

                        {/* Title with gradient */}
                        <h3 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
                            <span className="text-white">Caught you </span>
                            <span
                                style={{
                                    background:
                                        "linear-gradient(135deg, #6366f1, #a78bfa, #c084fc)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                peeking!
                            </span>
                        </h3>

                        {/* Divider line with glow */}
                        <div className="mx-auto w-24 h-[2px] mb-6 rounded-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

                        {/* Description */}
                        <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 max-w-sm mx-auto">
                            Curious how this was built?
                            <br />
                            <span className="text-gray-300 font-medium">
                                Let's connect and talk shop.
                            </span>
                        </p>

                        {/* ── CTA Button — scrolls to contact ──────── */}
                        <button
                            onClick={handleConnect}
                            className="
                                group relative inline-flex items-center gap-2
                                px-8 py-3.5 rounded-xl
                                text-white font-semibold text-sm
                                overflow-hidden
                                transition-all duration-300
                                hover:scale-105 active:scale-95
                            "
                            style={{
                                background:
                                    "linear-gradient(135deg, #4f46e5, #7c3aed)",
                                boxShadow:
                                    "0 0 20px rgba(99,102,241,0.3), 0 0 40px rgba(124,58,237,0.15)",
                            }}
                        >
                            {/* Shine effect on hover */}
                            <span
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background:
                                        "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.05) 55%, transparent 60%)",
                                    animation: "shine 2s ease-in-out infinite",
                                }}
                            />

                            {/* Arrow icon */}
                            <svg
                                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8 12h8m0 0l-3-3m3 3l-3 3"
                                />
                            </svg>
                            <span className="relative">Let's Connect</span>
                        </button>

                        {/* Subtle email hint */}
                        <p className="mt-4 text-gray-500 text-xs tracking-wide">
                            iprincekumark@gmail.com
                        </p>
                    </div>

                    {/* ── Floating particles ──────────────────────── */}
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full pointer-events-none"
                            style={{
                                width: `${3 + (i % 3) * 2}px`,
                                height: `${3 + (i % 3) * 2}px`,
                                background: `rgba(${130 + i * 15}, ${100 + i * 10}, 255, ${0.15 + (i % 3) * 0.1})`,
                                top: `${10 + i * 11}%`,
                                left: `${5 + i * 12}%`,
                                animation: `particleFloat ${2.5 + i * 0.4}s ease-in-out ${i * 0.2}s infinite`,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* ── Keyframes ───────────────────────────────────────── */}
            <style>{`
                @keyframes borderSpin {
                    to { transform: rotate(360deg); }
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                @keyframes particleFloat {
                    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
                    25% { transform: translateY(-6px) translateX(3px); opacity: 0.6; }
                    50% { transform: translateY(-12px) translateX(-2px); opacity: 0.3; }
                    75% { transform: translateY(-6px) translateX(4px); opacity: 0.5; }
                }
                @keyframes shine {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
}
