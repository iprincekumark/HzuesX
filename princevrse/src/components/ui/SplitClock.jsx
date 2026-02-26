import { useEffect, useRef, useState } from "react";
import "../../styles/split-clock.css";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Helpers
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const CX = 250;
const CY = 250;
const DEG = Math.PI / 180;
const px = (r, deg) => CX + r * Math.sin(deg * DEG);
const py = (r, deg) => CY - r * Math.cos(deg * DEG);

/* 24-hour labels placed at each of the 12 positions */
const HOUR_24 = ["24", "02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22"];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SplitClock — Modern Luxury Watch Face
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function SplitClock() {
    const ref = useRef(null);
    const rafRef = useRef(null);
    const [angles, setAngles] = useState({ h: 0, m: 0, s: 0 });
    const [topPx, setTopPx] = useState(0);

    /* ── Realtime clock ──────────────────────────────────────────── */
    useEffect(() => {
        const tick = () => {
            const now = new Date();
            const h = now.getHours() % 12;
            const m = now.getMinutes();
            const s = now.getSeconds();
            const ms = now.getMilliseconds();
            setAngles({
                h: h * 30 + m * 0.5 + s * (0.5 / 60),
                m: m * 6 + s * 0.1,
                s: s * 6 + ms * 0.006,
            });
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    /* ── Position at Home / About boundary ───────────────────────── */
    useEffect(() => {
        const measure = () => {
            const home = document.getElementById("home");
            if (home && ref.current) {
                const parent = ref.current.offsetParent;
                if (parent) {
                    const homeRect = home.getBoundingClientRect();
                    const parentRect = parent.getBoundingClientRect();
                    setTopPx(homeRect.bottom - parentRect.top);
                }
            }
        };
        measure();
        window.addEventListener("resize", measure);
        const ro = new ResizeObserver(measure);
        const home = document.getElementById("home");
        if (home) ro.observe(home);
        return () => { window.removeEventListener("resize", measure); ro.disconnect(); };
    }, []);

    return (
        <div ref={ref} className="split-clock-wrapper" style={{ top: topPx }}>
            <svg viewBox="0 0 500 500" className="split-clock-svg" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    {/* ── Gradients ──────────────────────────────────── */}
                    {/* Outer case */}
                    <radialGradient id="caseGrad" cx="50%" cy="48%" r="50%">
                        <stop offset="0%" stopColor="#2a2a2a" />
                        <stop offset="80%" stopColor="#1a1a1a" />
                        <stop offset="100%" stopColor="#0a0a0a" />
                    </radialGradient>
                    {/* Bezel ring */}
                    <linearGradient id="bezelGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#555" />
                        <stop offset="30%" stopColor="#3a3a3a" />
                        <stop offset="70%" stopColor="#222" />
                        <stop offset="100%" stopColor="#444" />
                    </linearGradient>
                    {/* Inner bezel highlight ring */}
                    <linearGradient id="bezelInner" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#666" />
                        <stop offset="50%" stopColor="#333" />
                        <stop offset="100%" stopColor="#555" />
                    </linearGradient>
                    {/* Chrome hand gradient */}
                    <linearGradient id="handChrome" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#999" />
                        <stop offset="30%" stopColor="#eee" />
                        <stop offset="50%" stopColor="#fff" />
                        <stop offset="70%" stopColor="#eee" />
                        <stop offset="100%" stopColor="#999" />
                    </linearGradient>
                    {/* Luminous center for hands */}
                    <linearGradient id="handLume" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#bbb" />
                        <stop offset="50%" stopColor="#fff" />
                        <stop offset="100%" stopColor="#bbb" />
                    </linearGradient>
                    {/* Baton marker gradient */}
                    <linearGradient id="batonGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#888" />
                        <stop offset="30%" stopColor="#ddd" />
                        <stop offset="50%" stopColor="#fff" />
                        <stop offset="70%" stopColor="#ddd" />
                        <stop offset="100%" stopColor="#888" />
                    </linearGradient>
                    {/* Center hub */}
                    <radialGradient id="hubGrad" cx="45%" cy="40%" r="55%">
                        <stop offset="0%" stopColor="#ccc" />
                        <stop offset="60%" stopColor="#888" />
                        <stop offset="100%" stopColor="#555" />
                    </radialGradient>
                    {/* Glass sheen */}
                    <radialGradient id="glassSheen" cx="38%" cy="30%" r="60%">
                        <stop offset="0%" stopColor="white" stopOpacity="0.06" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </radialGradient>

                    {/* ── Filters ────────────────────────────────────── */}
                    <filter id="handGlow">
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="batonGlow">
                        <feGaussianBlur stdDeviation="1" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="outerShadow">
                        <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#000" floodOpacity="0.8" />
                    </filter>
                </defs>

                {/* ═══ Layer 1: Outer decorative ring ═══ */}
                <circle cx={CX} cy={CY} r={248} fill="none" stroke="#333" strokeWidth="1" opacity="0.5" />
                <circle cx={CX} cy={CY} r={244} fill="none" stroke="#222" strokeWidth="0.5" opacity="0.3" />

                {/* ═══ Layer 2: Case / bezel ═══ */}
                <circle cx={CX} cy={CY} r={238} fill="url(#caseGrad)" filter="url(#outerShadow)" />
                {/* Bezel ring */}
                <circle cx={CX} cy={CY} r={236} fill="none" stroke="url(#bezelGrad)" strokeWidth="6" />
                {/* Inner chrome ring */}
                <circle cx={CX} cy={CY} r={230} fill="none" stroke="url(#bezelInner)" strokeWidth="1.5" />
                <circle cx={CX} cy={CY} r={226} fill="none" stroke="#333" strokeWidth="0.5" opacity="0.6" />

                {/* ═══ Layer 3: Black dial face ═══ */}
                <circle cx={CX} cy={CY} r={224} fill="#0a0a0a" />
                {/* Subtle radial gradient for depth */}
                <circle cx={CX} cy={CY} r={224} fill="url(#caseGrad)" opacity="0.3" />

                {/* ═══ Layer 4: Minute tick marks (60) ═══ */}
                {Array.from({ length: 60 }, (_, i) => {
                    const angle = i * 6;
                    const isHour = i % 5 === 0;
                    if (isHour) return null; // hour markers handled separately
                    return (
                        <line
                            key={`mt-${i}`}
                            x1={px(218, angle)} y1={py(218, angle)}
                            x2={px(210, angle)} y2={py(210, angle)}
                            stroke="#666" strokeWidth="0.8" opacity="0.6"
                        />
                    );
                })}

                {/* ═══ Layer 5: 24-hour numbers ═══ */}
                {HOUR_24.map((num, i) => {
                    const angle = i * 30;
                    const r = 204;
                    return (
                        <text
                            key={`n24-${i}`}
                            x={px(r, angle)} y={py(r, angle)}
                            textAnchor="middle" dominantBaseline="central"
                            fill="#555"
                            fontFamily="'Inter', 'Helvetica Neue', sans-serif"
                            fontWeight="500"
                            fontSize="11"
                            letterSpacing="0.5"
                        >
                            {num}
                        </text>
                    );
                })}

                {/* ═══ Layer 6: Hour baton markers (12) ═══ */}
                <g filter="url(#batonGlow)">
                    {Array.from({ length: 12 }, (_, i) => {
                        const angle = i * 30;
                        const is12or6 = i === 0 || i === 6;
                        const outerR = 190;
                        const innerR = is12or6 ? 160 : 165;
                        const width = is12or6 ? 5 : 3.5;
                        const halfW = width / 2;

                        // Calculate baton corners
                        const cos = Math.cos(angle * DEG - Math.PI / 2);
                        const sin = Math.sin(angle * DEG - Math.PI / 2);
                        const perpX = -sin * halfW;
                        const perpY = cos * halfW;

                        const ox = CX + outerR * Math.sin(angle * DEG);
                        const oy = CY - outerR * Math.cos(angle * DEG);
                        const ix = CX + innerR * Math.sin(angle * DEG);
                        const iy = CY - innerR * Math.cos(angle * DEG);

                        return (
                            <polygon
                                key={`baton-${i}`}
                                points={`
                                    ${ox + perpX},${oy + perpY}
                                    ${ox - perpX},${oy - perpY}
                                    ${ix - perpX},${iy - perpY}
                                    ${ix + perpX},${iy + perpY}
                                `}
                                fill="url(#batonGrad)"
                                stroke="#555" strokeWidth="0.3"
                            />
                        );
                    })}
                </g>

                {/* ═══ Layer 7: Clock hands ═══ */}
                <g filter="url(#handGlow)">
                    {/* Hour hand — thick, shorter */}
                    <g transform={`rotate(${angles.h} ${CX} ${CY})`}>
                        {/* Shadow/body */}
                        <polygon
                            points={`
                                ${CX - 5},${CY + 18}
                                ${CX - 5.5},${CY}
                                ${CX - 4},${CY - 60}
                                ${CX - 1.5},${CY - 82}
                                ${CX},${CY - 88}
                                ${CX + 1.5},${CY - 82}
                                ${CX + 4},${CY - 60}
                                ${CX + 5.5},${CY}
                                ${CX + 5},${CY + 18}
                            `}
                            fill="url(#handChrome)" stroke="#666" strokeWidth="0.3"
                        />
                        {/* Luminous center strip */}
                        <line
                            x1={CX} y1={CY - 10}
                            x2={CX} y2={CY - 80}
                            stroke="url(#handLume)" strokeWidth="1.5" opacity="0.9"
                        />
                    </g>

                    {/* Minute hand — thinner, longer */}
                    <g transform={`rotate(${angles.m} ${CX} ${CY})`}>
                        <polygon
                            points={`
                                ${CX - 3.5},${CY + 22}
                                ${CX - 4},${CY}
                                ${CX - 3},${CY - 80}
                                ${CX - 1},${CY - 115}
                                ${CX},${CY - 122}
                                ${CX + 1},${CY - 115}
                                ${CX + 3},${CY - 80}
                                ${CX + 4},${CY}
                                ${CX + 3.5},${CY + 22}
                            `}
                            fill="url(#handChrome)" stroke="#666" strokeWidth="0.3"
                        />
                        <line
                            x1={CX} y1={CY - 10}
                            x2={CX} y2={CY - 112}
                            stroke="url(#handLume)" strokeWidth="1.2" opacity="0.9"
                        />
                    </g>

                    {/* Second hand — very thin, long */}
                    <g transform={`rotate(${angles.s} ${CX} ${CY})`}>
                        {/* Counterweight */}
                        <line
                            x1={CX} y1={CY + 35}
                            x2={CX} y2={CY - 140}
                            stroke="#ccc" strokeWidth="1" opacity="0.85"
                        />
                        {/* Counterweight circle */}
                        <circle cx={CX} cy={CY + 28} r={3} fill="none" stroke="#ccc" strokeWidth="0.8" opacity="0.7" />
                    </g>
                </g>

                {/* ═══ Layer 8: Center hub ═══ */}
                <circle cx={CX} cy={CY} r={8} fill="url(#hubGrad)" />
                <circle cx={CX} cy={CY} r={6} fill="#999" />
                <circle cx={CX} cy={CY} r={3} fill="#ccc" />
                <circle cx={CX} cy={CY} r={1.5} fill="#eee" opacity="0.8" />

                {/* ═══ Layer 9: Glass sheen overlay ═══ */}
                <circle cx={CX} cy={CY - 20} r={220} fill="url(#glassSheen)" />
            </svg>
        </div>
    );
}
