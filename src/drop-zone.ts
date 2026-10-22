/**
 * Plain drop-zone binding.
 * Nested children fire dragenter and dragleave as the pointer crosses them.
 * A depth counter keeps `is-drag-over` on until the drag actually leaves the zone.
 */
export const DROP_ZONE_DRAG_OVER_CLASS_NAME = "is-drag-over";

export function bindDropZone(
  dropZone: Element | null,
  onDrop?: (event: DragEvent) => void,
): () => void {
  if (!dropZone) {
    return function unbindMissingDropZone(): void {
      return undefined;
    };
  }

  const zone: Element = dropZone;
  let dragDepth = 0;

  function handleDragEnter(event: Event): void {
    event.preventDefault();
    dragDepth += 1;
    zone.classList.add(DROP_ZONE_DRAG_OVER_CLASS_NAME);
  }

  function handleDragOver(event: Event): void {
    event.preventDefault();
    const dragEvent = event as DragEvent;
    if (dragEvent.dataTransfer) {
      dragEvent.dataTransfer.dropEffect = "copy";
    }
  }

  function handleDragLeave(): void {
    dragDepth = Math.max(0, dragDepth - 1);
    if (dragDepth === 0) {
      zone.classList.remove(DROP_ZONE_DRAG_OVER_CLASS_NAME);
    }
  }

  function handleDrop(event: Event): void {
    event.preventDefault();
    dragDepth = 0;
    zone.classList.remove(DROP_ZONE_DRAG_OVER_CLASS_NAME);
    if (onDrop) {
      onDrop(event as DragEvent);
    }
  }

  zone.addEventListener("dragenter", handleDragEnter);
  zone.addEventListener("dragover", handleDragOver);
  zone.addEventListener("dragleave", handleDragLeave);
  zone.addEventListener("drop", handleDrop);

  return function unbindDropZone(): void {
    zone.removeEventListener("dragenter", handleDragEnter);
    zone.removeEventListener("dragover", handleDragOver);
    zone.removeEventListener("dragleave", handleDragLeave);
    zone.removeEventListener("drop", handleDrop);
    dragDepth = 0;
    zone.classList.remove(DROP_ZONE_DRAG_OVER_CLASS_NAME);
  };
}
