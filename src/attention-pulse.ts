/**
 * Teal text pulse (three cycles) for drawing attention without motion beyond color.
 * Stops on first document click, file choice, drag, or when the animation finishes.
 */
export const ATTENTION_PULSE_CLASS_NAME = "attention-pulse";

const ATTENTION_PULSE_KEYFRAME_NAME = "attention-pulse";

function prefersReducedMotion(): boolean {
  return Boolean(
    typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
}

export function startAttentionPulse(element: Element | null): void {
  if (!element || prefersReducedMotion()) {
    return;
  }

  const target: Element = element;
  let attentionStopped = false;

  function removeAttentionPulseListeners(): void {
    document.removeEventListener("click", stopAttentionPulse, true);
    document.removeEventListener("dragenter", stopAttentionPulse, true);
    document.removeEventListener("change", stopAttentionPulseOnFileChosen, true);
    target.removeEventListener("animationend", finishAttentionPulse);
  }

  function stopAttentionPulse(): void {
    if (attentionStopped) {
      return;
    }
    attentionStopped = true;
    target.classList.remove(ATTENTION_PULSE_CLASS_NAME);
    if (target instanceof HTMLElement) {
      target.style.transition = "none";
      void target.offsetWidth;
      target.style.transition = "";
    }
    removeAttentionPulseListeners();
  }

  function stopAttentionPulseOnFileChosen(event: Event): void {
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

  function finishAttentionPulse(event: Event): void {
    const animationEvent = event as AnimationEvent;
    if (animationEvent.animationName !== ATTENTION_PULSE_KEYFRAME_NAME) {
      return;
    }
    stopAttentionPulse();
  }

  target.classList.add(ATTENTION_PULSE_CLASS_NAME);
  document.addEventListener("click", stopAttentionPulse, true);
  document.addEventListener("dragenter", stopAttentionPulse, true);
  document.addEventListener("change", stopAttentionPulseOnFileChosen, true);
  target.addEventListener("animationend", finishAttentionPulse);
}
