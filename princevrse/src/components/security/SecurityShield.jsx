import { useEffect, useState } from "react";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SecurityShield — Client-side protection layer

   Blocks:
   • Right-click context menu
   • Text selection (CSS + JS)
   • Drag operations
   • Keyboard shortcuts: F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S
   • Bot / headless browser detection
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* ── Bot detection heuristics ─────────────────────────────────────── */
function detectBot() {
    const ua = navigator.userAgent.toLowerCase();
    const botPatterns = [
        "bot", "crawl", "spider", "scrape", "headless",
        "phantom", "selenium", "puppeteer", "playwright",
        "wget", "curl", "httpclient", "python-requests",
        "go-http-client", "java/", "libwww", "slurp",
    ];

    /* UA match */
    if (botPatterns.some((p) => ua.includes(p))) return true;

    /* WebDriver flag (Selenium, Puppeteer, Playwright) */
    if (navigator.webdriver) return true;

    /* No languages (most bots don't set this) */
    if (!navigator.languages || navigator.languages.length === 0) return true;

    /* Headless Chrome indicators */
    if (
        /headless/i.test(ua) ||
        (window.chrome && !window.chrome.runtime)
    ) {
        /* Chrome without runtime is suspicious but common in normal Chrome,
           so only flag if combined with webdriver */
        if (navigator.webdriver) return true;
    }

    /* Phantom detection */
    if (window._phantom || window.__nightmare || window.callPhantom) return true;

    return false;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function SecurityShield({ onDevToolsShortcut, children }) {
    const [isBot, setIsBot] = useState(false);

    useEffect(() => {
        /* ── Bot check (run once) ──────────────────────────────── */
        if (detectBot()) {
            setIsBot(true);
            return;
        }

        /* ── Block right-click ─────────────────────────────────── */
        const onContextMenu = (e) => {
            e.preventDefault();
            onDevToolsShortcut?.();
        };

        /* ── Block keyboard shortcuts ──────────────────────────── */
        const onKeyDown = (e) => {
            const key = e.key?.toLowerCase();
            const ctrl = e.ctrlKey || e.metaKey;
            const shift = e.shiftKey;

            /* F12 */
            if (e.keyCode === 123 || key === "f12") {
                e.preventDefault();
                onDevToolsShortcut?.();
                return;
            }

            /* Ctrl+Shift+I (Inspect) */
            if (ctrl && shift && (key === "i" || e.keyCode === 73)) {
                e.preventDefault();
                onDevToolsShortcut?.();
                return;
            }

            /* Ctrl+Shift+J (Console) */
            if (ctrl && shift && (key === "j" || e.keyCode === 74)) {
                e.preventDefault();
                onDevToolsShortcut?.();
                return;
            }

            /* Ctrl+Shift+C (Element picker) */
            if (ctrl && shift && (key === "c" || e.keyCode === 67)) {
                e.preventDefault();
                onDevToolsShortcut?.();
                return;
            }

            /* Ctrl+U (View source) */
            if (ctrl && (key === "u" || e.keyCode === 85)) {
                e.preventDefault();
                onDevToolsShortcut?.();
                return;
            }

            /* Ctrl+S (Save page) */
            if (ctrl && (key === "s" || e.keyCode === 83)) {
                e.preventDefault();
                return;
            }
        };

        /* ── Block drag ────────────────────────────────────────── */
        const onDragStart = (e) => e.preventDefault();

        /* ── Block copy ────────────────────────────────────────── */
        const onCopy = (e) => e.preventDefault();

        /* ── Attach listeners ──────────────────────────────────── */
        document.addEventListener("contextmenu", onContextMenu);
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("dragstart", onDragStart);
        document.addEventListener("copy", onCopy);

        /* ── CSS: disable text selection ───────────────────────── */
        document.body.style.userSelect = "none";
        document.body.style.webkitUserSelect = "none";

        return () => {
            document.removeEventListener("contextmenu", onContextMenu);
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("dragstart", onDragStart);
            document.removeEventListener("copy", onCopy);
            document.body.style.userSelect = "";
            document.body.style.webkitUserSelect = "";
        };
    }, [onDevToolsShortcut]);

    /* ── Bot detected overlay ──────────────────────────────────── */
    if (isBot) {
        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-950">
                <div className="text-center px-8">
                    <div className="text-5xl mb-4">🤖</div>
                    <h2 className="text-2xl font-bold text-white mb-3">
                        Automated Access Detected
                    </h2>
                    <p className="text-gray-400 text-sm max-w-sm">
                        This portfolio is designed for human visitors.
                        If you believe this is an error, please visit directly
                        in a standard browser.
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
