export type CurtainPhase = "static" | "armed" | "playing";
/**
 * Section lists stay fully visible unless this hook opts into motion.
 * Reduced motion, a missing IntersectionObserver, or no JavaScript leave
 * the phase at "static", which renders the list with no hidden styles.
 * Lists already inside the viewport on load still play once.
 */
export declare function useCurtainReveal(): {
    containerRef: (node: HTMLElement | null) => void;
    phase: CurtainPhase;
};
