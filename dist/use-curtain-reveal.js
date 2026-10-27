"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCurtainReveal = useCurtainReveal;
const react_1 = require("react");
/**
 * Section lists stay fully visible unless this hook opts into motion.
 * Reduced motion, a missing IntersectionObserver, or no JavaScript leave
 * the phase at "static", which renders the list with no hidden styles.
 * Lists already inside the viewport on load still play once.
 */
function useCurtainReveal() {
    const containerElementRef = (0, react_1.useRef)(null);
    const [phase, setPhase] = (0, react_1.useState)("static");
    const containerRef = (0, react_1.useCallback)((node) => {
        containerElementRef.current = node;
    }, []);
    (0, react_1.useLayoutEffect)(() => {
        const containerElement = containerElementRef.current;
        if (!containerElement || shouldSkipCurtainMotion()) {
            return;
        }
        if (isContainerInView(containerElement)) {
            setPhase("playing");
            return;
        }
        setPhase("armed");
        const listObserver = new IntersectionObserver((entries) => {
            const hasEntered = entries.some((entry) => entry.isIntersecting);
            if (!hasEntered) {
                return;
            }
            setPhase("playing");
            listObserver.disconnect();
        }, { threshold: 0 });
        listObserver.observe(containerElement);
        return () => {
            listObserver.disconnect();
        };
    }, []);
    return { containerRef, phase };
}
function shouldSkipCurtainMotion() {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
        return true;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function isContainerInView(containerElement) {
    const bounds = containerElement.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
}
