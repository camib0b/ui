"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DROP_ZONE_DRAG_OVER_CLASS_NAME = void 0;
exports.bindDropZone = bindDropZone;
/**
 * Plain drop-zone binding.
 * Nested children fire dragenter and dragleave as the pointer crosses them.
 * A depth counter keeps `is-drag-over` on until the drag actually leaves the zone.
 */
exports.DROP_ZONE_DRAG_OVER_CLASS_NAME = "is-drag-over";
function bindDropZone(dropZone, onDrop) {
    if (!dropZone) {
        return function unbindMissingDropZone() {
            return undefined;
        };
    }
    const zone = dropZone;
    let dragDepth = 0;
    function handleDragEnter(event) {
        event.preventDefault();
        dragDepth += 1;
        zone.classList.add(exports.DROP_ZONE_DRAG_OVER_CLASS_NAME);
    }
    function handleDragOver(event) {
        event.preventDefault();
        const dragEvent = event;
        if (dragEvent.dataTransfer) {
            dragEvent.dataTransfer.dropEffect = "copy";
        }
    }
    function handleDragLeave() {
        dragDepth = Math.max(0, dragDepth - 1);
        if (dragDepth === 0) {
            zone.classList.remove(exports.DROP_ZONE_DRAG_OVER_CLASS_NAME);
        }
    }
    function handleDrop(event) {
        event.preventDefault();
        dragDepth = 0;
        zone.classList.remove(exports.DROP_ZONE_DRAG_OVER_CLASS_NAME);
        if (onDrop) {
            onDrop(event);
        }
    }
    zone.addEventListener("dragenter", handleDragEnter);
    zone.addEventListener("dragover", handleDragOver);
    zone.addEventListener("dragleave", handleDragLeave);
    zone.addEventListener("drop", handleDrop);
    return function unbindDropZone() {
        zone.removeEventListener("dragenter", handleDragEnter);
        zone.removeEventListener("dragover", handleDragOver);
        zone.removeEventListener("dragleave", handleDragLeave);
        zone.removeEventListener("drop", handleDrop);
        dragDepth = 0;
        zone.classList.remove(exports.DROP_ZONE_DRAG_OVER_CLASS_NAME);
    };
}
