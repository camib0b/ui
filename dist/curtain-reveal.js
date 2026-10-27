"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCurtainReveal = exports.CurtainReveal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const use_curtain_reveal_1 = require("./use-curtain-reveal");
Object.defineProperty(exports, "useCurtainReveal", { enumerable: true, get: function () { return use_curtain_reveal_1.useCurtainReveal; } });
function cn(...classNames) {
    return classNames.filter((className) => Boolean(className)).join(" ");
}
/**
 * Staggers direct children when the list enters the viewport.
 * Each child must be a host element (`div` or `li`) so the motion class
 * lands on the node that paints. No extra item wrappers, so layout stays put.
 */
const CurtainReveal = ({ as = "div", className, children }) => {
    const { containerRef, phase } = (0, use_curtain_reveal_1.useCurtainReveal)();
    const revealedChildren = react_1.Children.map(children, (child, index) => {
        if (phase === "static" || !(0, react_1.isValidElement)(child)) {
            return child;
        }
        const childElement = child;
        return (0, react_1.cloneElement)(childElement, {
            className: cn(childElement.props.className, "curtain-reveal-item"),
            style: {
                ...childElement.props.style,
                "--curtain-index": index,
            },
            "data-curtain": phase,
        });
    });
    if (as === "ul") {
        return ((0, jsx_runtime_1.jsx)("ul", { ref: containerRef, className: className, "data-curtain-reveal": phase, children: revealedChildren }));
    }
    if (as === "ol") {
        return ((0, jsx_runtime_1.jsx)("ol", { ref: containerRef, className: className, "data-curtain-reveal": phase, children: revealedChildren }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: containerRef, className: className, "data-curtain-reveal": phase, children: revealedChildren }));
};
exports.CurtainReveal = CurtainReveal;
exports.default = CurtainReveal;
