/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   GlitchText — Subtle, always-active glitch animation

   Props:
     text          — string to display
     speed         — animation speed multiplier (default 1)
     enableShadows — show colored glitch shadows (default true)
     className     — additional classes
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function GlitchText({
    text = "",
    speed = 1,
    enableShadows = true,
    className = "",
}) {
    const duration = `${2.5 / speed}s`;

    return (
        <span
            className={`glitch-text ${className}`}
            data-text={text}
            style={{
                "--glitch-duration": duration,
                position: "relative",
                display: "inline-block",
                verticalAlign: "baseline",
            }}
        >
            {text}

            {/* Glitch shadow layers */}
            {enableShadows && (
                <>
                    <span
                        className="glitch-layer glitch-layer-1"
                        aria-hidden="true"
                        data-text={text}
                    />
                    <span
                        className="glitch-layer glitch-layer-2"
                        aria-hidden="true"
                        data-text={text}
                    />
                </>
            )}

            <style>{`
                .glitch-text {
                    animation: glitch-skew var(--glitch-duration, 2.5s) infinite linear alternate-reverse;
                }

                .glitch-layer {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: inline-block;
                    font-size: inherit;
                    font-weight: inherit;
                    line-height: inherit;
                    pointer-events: none;
                }

                .glitch-layer::before {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }

                .glitch-layer-1::before {
                    color: inherit;
                    text-shadow: -2px 0 rgba(99, 102, 241, 0.7);
                    animation: glitch-1 var(--glitch-duration, 2.5s) infinite linear alternate-reverse;
                    clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
                }

                .glitch-layer-2::before {
                    color: inherit;
                    text-shadow: 2px 0 rgba(236, 72, 153, 0.7);
                    animation: glitch-2 var(--glitch-duration, 2.5s) infinite linear alternate-reverse;
                    clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
                }

                @keyframes glitch-skew {
                    0%   { transform: skew(0deg); }
                    2%   { transform: skew(0.4deg); }
                    4%   { transform: skew(0deg); }
                    40%  { transform: skew(0deg); }
                    42%  { transform: skew(-0.3deg); }
                    44%  { transform: skew(0deg); }
                    80%  { transform: skew(0deg); }
                    82%  { transform: skew(0.5deg); }
                    84%  { transform: skew(0deg); }
                    100% { transform: skew(0deg); }
                }

                @keyframes glitch-1 {
                    0%   { transform: translate(0); }
                    2%   { transform: translate(-3px, 1px); }
                    4%   { transform: translate(0); }
                    20%  { transform: translate(0); }
                    22%  { transform: translate(2px, -1px); }
                    24%  { transform: translate(0); }
                    60%  { transform: translate(0); }
                    62%  { transform: translate(-2px, 0); }
                    64%  { transform: translate(0); }
                    100% { transform: translate(0); }
                }

                @keyframes glitch-2 {
                    0%   { transform: translate(0); }
                    10%  { transform: translate(0); }
                    12%  { transform: translate(3px, 1px); }
                    14%  { transform: translate(0); }
                    50%  { transform: translate(0); }
                    52%  { transform: translate(-2px, -1px); }
                    54%  { transform: translate(0); }
                    90%  { transform: translate(0); }
                    92%  { transform: translate(2px, 0); }
                    94%  { transform: translate(0); }
                    100% { transform: translate(0); }
                }

                /* Dark theme: brighter glitch shadows */
                :root.dark .glitch-layer-1::before {
                    text-shadow: -2px 0 rgba(129, 140, 248, 0.8);
                }
                :root.dark .glitch-layer-2::before {
                    text-shadow: 2px 0 rgba(244, 114, 182, 0.8);
                }
            `}</style>
        </span>
    );
}
