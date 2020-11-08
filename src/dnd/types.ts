export type NodeRef = React.MutableRefObject<HTMLElement | undefined>;
export type PointerEvent = (event: React.PointerEvent<HTMLElement>) => void;
export type UpdateDelta = (event: React.MouseEvent) => {
  left: number,
  top: number,
};
export type OnDrag = (deltaLeft: number, deltaTop: number) => void;
export type UseDragAndDrop = (
  onDrag: OnDrag,
  onDragEnd: () => void | Promise<void>,
) => {
  onPointerDown: PointerEvent,
  onPointerUp: PointerEvent,
  onPointerMove: PointerEvent,
};
