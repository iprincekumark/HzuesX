import { useRef, useEffect, useCallback } from "react";
import { Renderer, Program, Mesh, Triangle, Color } from "ogl";

/* ── Default color stops ───────────────────────────────────────── */
const DEFAULT_COLORS = ["#7cff67", "#B19EEF", "#5227FF"];

/* ── Vertex shader ─────────────────────────────────────────────── */
const VERT = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

/* ── Fragment shader — aurora-style plasma gradient ────────────── */
const FRAG = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uAmplitude;
  uniform float uBlend;
  uniform vec3 uColor0;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec2 uResolution;

  varying vec2 vUv;

  /*  noise helpers  */
  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                              + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                            dot(x12.zw,x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x_ = 2.0 * fract(p * C.www) - 1.0;
    vec3 h_ = abs(x_) - 0.5;
    vec3 ox = floor(x_ + 0.5);
    vec3 a0 = x_ - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h_*h_);
    vec3 g;
    g.x = a0.x * x0.x + h_.x * x0.y;
    g.yz = a0.yz * x12.xz + h_.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    uv.x *= aspect;

    float t = uTime * 0.12;

    /* multiple noise layers */
    float n1 = snoise(uv * 1.2 + vec2(t * 0.8, t * 0.6)) * uAmplitude;
    float n2 = snoise(uv * 2.4 - vec2(t * 0.5, t * 0.9)) * uAmplitude * 0.5;
    float n3 = snoise(uv * 0.8 + vec2(t * 0.3, -t * 0.4)) * uAmplitude * 0.7;

    float noise = (n1 + n2 + n3) * 0.33;

    /* blend between the three colors */
    float p = (noise + 1.0) * 0.5;
    vec3 col;
    if (p < 0.33) {
      col = mix(uColor0, uColor1, p * 3.0);
    } else if (p < 0.66) {
      col = mix(uColor1, uColor2, (p - 0.33) * 3.0);
    } else {
      col = mix(uColor2, uColor0, (p - 0.66) * 3.0);
    }

    /* edge darkening for depth */
    float vignette = 1.0 - length(vUv - 0.5) * 0.8;
    col *= mix(0.4, 1.0, vignette);

    /* blend towards darker base for readability */
    col = mix(col, vec3(0.02, 0.02, 0.06), 1.0 - uBlend);

    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Aurora — Full-screen animated shader background
   
   Props:
     colorStops   – array of 3 hex colors
     blend        – 0..1 (higher = more color, lower = darker)
     amplitude    – noise strength
     speed        – animation speed multiplier
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function Aurora({
    colorStops = DEFAULT_COLORS,
    blend = 0.5,
    amplitude = 1.0,
    speed = 1,
}) {
    const containerRef = useRef(null);
    const rendererRef = useRef(null);
    const programRef = useRef(null);
    const rafRef = useRef(null);
    const startTimeRef = useRef(Date.now());

    const hexToVec3 = useCallback((hex) => {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;
        return [r, g, b];
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        /* ── Create OGL renderer ────────────────────────────────────── */
        const renderer = new Renderer({
            alpha: false,
            antialias: false,
            dpr: Math.min(window.devicePixelRatio, 1.5),
        });
        rendererRef.current = renderer;
        const gl = renderer.gl;
        container.appendChild(gl.canvas);

        gl.canvas.style.width = "100%";
        gl.canvas.style.height = "100%";
        gl.canvas.style.display = "block";

        /* ── Geometry (fullscreen triangle) ─────────────────────────── */
        const geometry = new Triangle(gl);

        /* ── Shader program ─────────────────────────────────────────── */
        const program = new Program(gl, {
            vertex: VERT,
            fragment: FRAG,
            uniforms: {
                uTime: { value: 0 },
                uAmplitude: { value: amplitude },
                uBlend: { value: blend },
                uColor0: { value: new Color(...hexToVec3(colorStops[0])) },
                uColor1: { value: new Color(...hexToVec3(colorStops[1])) },
                uColor2: { value: new Color(...hexToVec3(colorStops[2])) },
                uResolution: { value: [gl.canvas.width, gl.canvas.height] },
            },
        });
        programRef.current = program;

        const mesh = new Mesh(gl, { geometry, program });

        /* ── Resize handler ─────────────────────────────────────────── */
        const resize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            renderer.setSize(w, h);
            program.uniforms.uResolution.value = [w * renderer.dpr, h * renderer.dpr];
        };

        resize();
        window.addEventListener("resize", resize);

        /* ── Animation loop ─────────────────────────────────────────── */
        const tick = () => {
            const elapsed = (Date.now() - startTimeRef.current) / 1000;
            program.uniforms.uTime.value = elapsed * speed;
            renderer.render({ scene: mesh });
            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener("resize", resize);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (gl.canvas.parentNode) gl.canvas.parentNode.removeChild(gl.canvas);
            gl.getExtension("WEBGL_lose_context")?.loseContext();
        };
    }, [colorStops, blend, amplitude, speed, hexToVec3]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: "none" }}
        />
    );
}
