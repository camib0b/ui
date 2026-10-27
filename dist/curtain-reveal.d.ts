import { type ReactNode } from "react";
import { useCurtainReveal, type CurtainPhase } from "./use-curtain-reveal";
type CurtainElementName = "div" | "ul" | "ol";
interface CurtainRevealProps {
    as?: CurtainElementName;
    className?: string;
    children: ReactNode;
}
/**
 * Staggers direct children when the list enters the viewport.
 * Each child must be a host element (`div` or `li`) so the motion class
 * lands on the node that paints. No extra item wrappers, so layout stays put.
 */
declare const CurtainReveal: ({ as, className, children }: CurtainRevealProps) => import("react").JSX.Element;
export { CurtainReveal, useCurtainReveal };
export type { CurtainPhase };
export default CurtainReveal;
