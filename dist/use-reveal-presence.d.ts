/** Keep in sync with the close duration of `.contact-reveal` in `src/motion.css`. */
export declare const REVEAL_CLOSE_DURATION_MS = 120;
/**
 * Keeps a collapsed panel mounted until its close transition finishes.
 * Enter motion comes from `@starting-style` on `.contact-reveal`.
 */
export declare function useRevealPresence(isExpanded: boolean): {
    isRevealMounted: boolean;
};
