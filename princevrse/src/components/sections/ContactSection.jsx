import { useState } from "react";
import emailjs from "@emailjs/browser";
import ScrollReveal from "../ui/ScrollReveal";
import worldmapImg from "../../assets/worldmap.webp";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ContactSection — Matching the reference design exactly
   Left: Icon + heading + description + email + world map with India pin
   Right: Contact form with grid background
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* ── World map using worldmap.png ─────────────────────────────────── */
function WorldMap() {
    /* India on a standard equirectangular world map ≈ 78°E, 20°N
       → left ≈ 60%, top ≈ 42% on the image                        */
    const pinLeft = "75%";
    const pinTop = "36%";

    return (
        <div className="relative mt-8 w-full max-w-lg">
            {/* Map image */}
            <img
                src={worldmapImg}
                alt="World map showing location in India"
                className="w-full h-auto opacity-40 dark:opacity-25 dark:invert"
                loading="lazy"
                width="600"
                height="300"
            />

            {/* ── India pointer: label + beam + ground halo ─────── */}
            <div
                className="absolute pointer-events-none"
                style={{ left: pinLeft, top: pinTop, transform: "translate(-50%, -100%)" }}
            >
                <div className="flex flex-col items-center">
                    {/* Pill label */}
                    <span className="
                        bg-gray-100 dark:bg-gray-700/80
                        text-gray-600 dark:text-gray-200
                        text-[11px] font-medium
                        px-2.5 py-0.5 rounded-full
                        border border-gray-200/80 dark:border-gray-600/60
                        shadow-sm dark:shadow-none
                        whitespace-nowrap mb-1
                    ">
                        India
                    </span>

                    {/* Vertical beam line — bright blue */}
                    <div className="relative" style={{ width: "2px", height: "55px" }}>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-sky-400 via-blue-400 to-cyan-300" />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-sky-400 via-blue-400 to-cyan-300 blur-[3px] opacity-70" />
                        <div className="absolute inset-y-0 rounded-full bg-gradient-to-b from-sky-400/20 via-blue-400/15 to-transparent blur-[5px]" style={{ left: "-4px", right: "-4px" }} />
                    </div>
                </div>
            </div>

            {/* Ground halo — elliptical glow at pin point */}
            <div
                className="absolute pointer-events-none"
                style={{ left: pinLeft, top: pinTop, transform: "translate(-50%, -50%)" }}
            >
                <div className="rounded-[50%] bg-cyan-300/15 dark:bg-cyan-400/15 blur-[10px]" style={{ width: "80px", height: "28px" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-sky-300/25 dark:bg-sky-400/25 blur-[5px]" style={{ width: "40px", height: "16px" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-white/40 dark:bg-white/30 blur-[2px]" style={{ width: "10px", height: "6px" }} />
            </div>
        </div>
    );
}

/* ── Grid background pattern ──────────────────────────────────────── */
function GridPattern() {
    return (
        <svg className="absolute inset-0 w-full h-16 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="contact-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-grid)" />
            {/* Fade bottom */}
            <defs>
                <linearGradient id="contact-grid-fade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="100%" stopColor="white" className="dark:[stop-color:rgb(17,17,17)]" />
                </linearGradient>
            </defs>
        </svg>
    );
}

/* ── Email icon ──────────────────────────────────────────────────── */
function EmailIcon() {
    return (
        <div className="w-14 h-14 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center mb-6">
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="3" />
                <path d="M2 7l10 7 10-7" />
            </svg>
        </div>
    );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ContactSection
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function ContactSection({ embedded = false }) {
    const Tag = embedded ? "div" : "section";
    const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: form.name,
                    from_email: form.email,
                    company: form.company || "Not specified",
                    message: form.message,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );
            setSubmitted(true);
            setForm({ name: "", email: "", company: "", message: "" });
            setTimeout(() => setSubmitted(false), 4000);
        } catch (err) {
            setError("Failed to send message. Please try again or email directly.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Tag
            {...(!embedded && { id: "contact" })}
            aria-label="Contact section"
            className={`relative w-full py-10 sm:py-16 lg:py-28 px-6 transition-colors duration-300 ${embedded ? "" : "bg-gray-50 dark:bg-[#111]"
                }`}
        >
            <div className="mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* ── LEFT COLUMN: Info ─────────────────────────── */}
                    <div>
                        <ScrollReveal>
                            <EmailIcon />
                        </ScrollReveal>

                        <ScrollReveal delay={0.05}>
                            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-5">
                                Contact us
                            </h2>
                        </ScrollReveal>

                        <ScrollReveal delay={0.1}>
                            <div className="max-w-md mb-8 space-y-4">
                                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                                    Whether you're a product company looking for a dependable full-stack
                                    engineer, a startup that needs scalable systems built right the first time,
                                    or a team with a challenging project — I'd genuinely like to hear from you.
                                </p>
                                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                                    I bring clean architecture, thoughtful UI and backend systems designed
                                    to handle real-world traffic. If that sounds like what your next project
                                    needs, drop me a note — I respond within 24 hours.
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Email info */}
                        <ScrollReveal delay={0.15}>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                iprincekumark@gmail.com
                            </p>
                        </ScrollReveal>

                        {/* World map with India pin */}
                        <ScrollReveal delay={0.2}>
                            <WorldMap />
                        </ScrollReveal>
                    </div>

                    {/* ── RIGHT COLUMN: Form ────────────────────────── */}
                    <ScrollReveal delay={0.1}>
                        <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 shadow-lg dark:shadow-none">
                            {/* Grid pattern at top */}
                            <div className="relative h-12 bg-gray-50 dark:bg-[#111] overflow-hidden">
                                <GridPattern />
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                                {/* Full name */}
                                <div>
                                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Full name
                                    </label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        required
                                        className="w-full px-4 py-3 rounded-lg
                                            bg-gray-50 dark:bg-[#2a2a2a]
                                            border border-gray-200 dark:border-gray-700
                                            text-gray-900 dark:text-gray-100
                                            placeholder-gray-400 dark:placeholder-gray-500
                                            text-sm
                                            outline-none
                                            focus:border-indigo-400 dark:focus:border-indigo-500
                                            focus:ring-1 focus:ring-indigo-400/30
                                            transition-colors duration-200"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email address"
                                        required
                                        className="w-full px-4 py-3 rounded-lg
                                            bg-gray-50 dark:bg-[#2a2a2a]
                                            border border-gray-200 dark:border-gray-700
                                            text-gray-900 dark:text-gray-100
                                            placeholder-gray-400 dark:placeholder-gray-500
                                            text-sm
                                            outline-none
                                            focus:border-indigo-400 dark:focus:border-indigo-500
                                            focus:ring-1 focus:ring-indigo-400/30
                                            transition-colors duration-200"
                                    />
                                </div>

                                {/* Company */}
                                <div>
                                    <label htmlFor="contact-company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Company
                                    </label>
                                    <input
                                        id="contact-company"
                                        type="text"
                                        name="company"
                                        value={form.company}
                                        onChange={handleChange}
                                        placeholder="Enter your company"
                                        className="w-full px-4 py-3 rounded-lg
                                            bg-gray-50 dark:bg-[#2a2a2a]
                                            border border-gray-200 dark:border-gray-700
                                            text-gray-900 dark:text-gray-100
                                            placeholder-gray-400 dark:placeholder-gray-500
                                            text-sm
                                            outline-none
                                            focus:border-indigo-400 dark:focus:border-indigo-500
                                            focus:ring-1 focus:ring-indigo-400/30
                                            transition-colors duration-200"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Type your message here"
                                        rows={4}
                                        required
                                        className="w-full px-4 py-3 rounded-lg resize-none
                                            bg-gray-50 dark:bg-[#2a2a2a]
                                            border border-gray-200 dark:border-gray-700
                                            text-gray-900 dark:text-gray-100
                                            placeholder-gray-400 dark:placeholder-gray-500
                                            text-sm
                                            outline-none
                                            focus:border-indigo-400 dark:focus:border-indigo-500
                                            focus:ring-1 focus:ring-indigo-400/30
                                            transition-colors duration-200"
                                    />
                                </div>

                                {/* Error message */}
                                {error && (
                                    <p className="text-red-500 dark:text-red-400 text-sm text-center">
                                        {error}
                                    </p>
                                )}

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`px-6 py-2.5 rounded-lg text-sm font-medium
                                        bg-gray-900 dark:bg-gray-100
                                        text-white dark:text-gray-900
                                        hover:bg-gray-800 dark:hover:bg-gray-200
                                        active:scale-[0.98]
                                        transition-all duration-200
                                        disabled:opacity-60 disabled:cursor-not-allowed`}
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : submitted ? "Sent ✓" : "Submit"}
                                </button>
                            </form>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </Tag>
    );
}
