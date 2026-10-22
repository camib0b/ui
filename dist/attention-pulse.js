"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ATTENTION_PULSE_CLASS_NAME = void 0;
exports.startAttentionPulse = startAttentionPulse;
/**
 * Teal text pulse (three cycles) for drawing attention without motion beyond color.
 * Stops on first document click, file choice, drag, or when the animation finishes.
 */
exports.ATTENTION_PULSE_CLASS_NAME = "attention-pulse";
const ATTENTION_PULSE_KEYFRAME_NAME = "attention-pulse";
function prefersReducedMotion() {
    return Boolean(typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function startAttentionPulse(element) {
    if (!element || prefersReducedMotion()) {
        return;
    }
    const target = element;
    let attentionStopped = false;
    function removeAttentionPulseListeners() {
        document.removeEventListener("click", stopAttentionPulse, true);
        document.removeEventListener("dragenter", stopAttentionPulse, true);
        document.removeEventListener("change", stopAttentionPulseOnFileChosen, true);
        target.removeEventListener("animationend", finishAttentionPulse);
    }
    function stopAttentionPulse() {
        if (attentionStopped) {
            return;
        }
        attentionStopped = true;
        target.classList.remove(exports.ATTENTION_PULSE_CLASS_NAME);
        if (target instanceof HTMLElement) {
            target.style.transition = "none";
            void target.offsetWidth;
            target.style.transition = "";
        }
        removeAttentionPulseListeners();
    }
    function stopAttentionPulseOnFileChosen(event) {
        const target = event.target;
        if (!(target instanceof HTMLInputElement) || target.type !== "file") {
            return;
        }
        const selectedFile = target.files && target.files[0];
        if (!selectedFile) {
            return;
        }
        stopAttentionPulse();
    }
    function finishAttentionPulse(event) {
        const animationEvent = event;
        if (animationEvent.animationName !== ATTENTION_PULSE_KEYFRAME_NAME) {
            return;
        }
        stopAttentionPulse();
    }
    target.classList.add(exports.ATTENTION_PULSE_CLASS_NAME);
    document.addEventListener("click", stopAttentionPulse, true);
    document.addEventListener("dragenter", stopAttentionPulse, true);
    document.addEventListener("change", stopAttentionPulseOnFileChosen, true);
    target.addEventListener("animationend", finishAttentionPulse);
}
