import { useCallback, useRef } from 'react';

import type {
  UseDragAndDrop,
  PointerEvent,
  UpdateDelta,
} from './types';

export const useDragAndDrop: UseDragAndDrop = (onDrag, onDragEnd) => {
  const isDragging = useRef<boolean>(false);
  const position = useRef({ left: 0, top: 0 });
  const updatePositionDelta = useCallback<UpdateDelta>((e) => {
    const left = e.pageX;
    const top = e.pageY;
    const delta = {
      left: left - position.current.left,
      top: top - position.current.top,
    };
    position.current = {
      left,
      top,
    };
    return delta;
  }, []);

  const onPointerDown = useCallback<PointerEvent>((e) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePositionDelta(e);
  }, [updatePositionDelta]);
  const onPointerMove = useCallback<PointerEvent>((e) => {
    if (isDragging.current) {
      const { left, top } = updatePositionDelta(e);
      onDrag(left, top);
    }
  }, [onDrag, updatePositionDelta]);
  const onPointerUp = useCallback<PointerEvent>(async () => {
    isDragging.current = false;
    await onDragEnd();
  }, [onDragEnd]);

  return {
    onPointerDown,
    onPointerUp,
    onPointerMove,
  };
};
