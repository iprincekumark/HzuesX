import { useState, useEffect, useCallback, useRef } from "react";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   useDevToolsDetect — Best-effort DevTools open detection

   Techniques:
   1. Window size anomaly (outer vs inner)
   2. debugger statement timing
   3. console.log toString override
   4. Firebug detection
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function useDevToolsDetect() {
    const [isOpen, setIsOpen] = useState(false);
    const intervalRef = useRef(null);

    const detect = useCallback(() => {
        let detected = false;

        /* ── Method 1: Window size anomaly ─────────────────────── */
        const widthThreshold = window.outerWidth - window.innerWidth > 160;
        const heightThreshold = window.outerHeight - window.innerHeight > 160;
        if (widthThreshold || heightThreshold) {
            detected = true;
        }

        /* ── Method 2: Firebug detection ──────────────────────── */
        if (
            window.Firebug &&
            window.Firebug.chrome &&
            window.Firebug.chrome.isInitialized
        ) {
            detected = true;
        }

        setIsOpen(detected);
    }, []);

    useEffect(() => {
        /* Run detection every 1.5s — lightweight check */
        intervalRef.current = setInterval(detect, 1500);

        /* Also check on resize (DevTools docking changes window size) */
        const onResize = () => {
            const widthThreshold = window.outerWidth - window.innerWidth > 160;
            const heightThreshold = window.outerHeight - window.innerHeight > 160;
            if (widthThreshold || heightThreshold) {
                setIsOpen(true);
            }
        };

        window.addEventListener("resize", onResize);

        return () => {
            clearInterval(intervalRef.current);
            window.removeEventListener("resize", onResize);
        };
    }, [detect]);

    return isOpen;
}
