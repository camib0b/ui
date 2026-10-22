/**
 * Plain drop-zone binding.
 * Nested children fire dragenter and dragleave as the pointer crosses them.
 * A depth counter keeps `is-drag-over` on until the drag actually leaves the zone.
 */
export declare const DROP_ZONE_DRAG_OVER_CLASS_NAME = "is-drag-over";
export declare function bindDropZone(dropZone: Element | null, onDrop?: (event: DragEvent) => void): () => void;
