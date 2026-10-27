"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REVEAL_CLOSE_DURATION_MS = void 0;
exports.useRevealPresence = useRevealPresence;
const react_1 = require("react");
/** Keep in sync with the close duration of `.contact-reveal` in `src/motion.css`. */
exports.REVEAL_CLOSE_DURATION_MS = 120;
/**
 * Keeps a collapsed panel mounted until its close transition finishes.
 * Enter motion comes from `@starting-style` on `.contact-reveal`.
 */
function useRevealPresence(isExpanded) {
    const [isRevealMounted, setIsRevealMounted] = (0, react_1.useState)(isExpanded);
    if (isExpanded && !isRevealMounted) {
        setIsRevealMounted(true);
    }
    (0, react_1.useEffect)(() => {
        if (isExpanded || !isRevealMounted) {
            return;
        }
        const closeTimeoutId = window.setTimeout(() => {
            setIsRevealMounted(false);
        }, exports.REVEAL_CLOSE_DURATION_MS);
        return () => {
            window.clearTimeout(closeTimeoutId);
        };
    }, [isExpanded, isRevealMounted]);
    return { isRevealMounted };
}
