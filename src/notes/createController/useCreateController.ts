import {
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { NoteType } from '../../types';

import { initialNote } from '../constants';

type Point = {
  x: number,
  y: number,
};

type OnCreate = (note: Omit<NoteType, 'id'>) => void;

const initialPoint = {
  x: 0,
  y: 0,
};

const useCreateController = (onCreate: OnCreate): {
  containerRef: React.MutableRefObject<HTMLElement | null>,
  start: Point,
  end: Point,
  onMouseDown(e: MouseEvent): void,
  onMouseMove(e: MouseEvent): void,
  onMouseUp(e: MouseEvent): void,
} => {
  const containerRef = useRef(null);
  const [start, setStart] = useState<Point>(initialPoint);
  const [end, setEnd] = useState<Point>(initialPoint);
  const [isMoving, setIsMoving] = useState(false);
  const onMouseDown = useCallback<(e: MouseEvent) => void>((e) => {
    if (e.target === containerRef.current) {
      setIsMoving(true);
      setStart({
        x: e.clientX,
        y: e.clientY,
      });
      setEnd({
        x: e.clientX,
        y: e.clientY,
      });
    }
  }, []);
  const onMouseMove = useCallback<(e: MouseEvent) => void>((e) => {
    if (isMoving) {
      setEnd({
        x: e.clientX,
        y: e.clientY,
      });
    }
  }, [isMoving]);
  const onMouseUp = useCallback<(e: MouseEvent) => void>((e) => {
    if (isMoving) {
      setIsMoving(false);
      const { clientX, clientY } = e;

      const left = start.x < clientX ? start.x : clientX;
      const top = start.y < clientY ? start.y : clientY;

      setStart(initialPoint);
      setEnd(initialPoint);
      onCreate({
        ...initialNote,
        left,
        top,
        width: Math.abs(clientX - start.x),
        height: Math.abs(clientY - start.y),
      });
    }
  }, [isMoving, onCreate, start.x, start.y]);

  const actualStart = useMemo(() => {
    const x = start.x < end.x ? start.x : end.x;
    const y = start.y < end.y ? start.y : end.y;
    return {
      x,
      y,
    };
  }, [end.x, end.y, start.x, start.y]);
  const actualEnd = useMemo(() => {
    const x = start.x < end.x ? end.x : start.x;
    const y = start.y < end.y ? end.y : start.y;
    return {
      x,
      y,
    };
  }, [end.x, end.y, start.x, start.y]);

  return {
    containerRef,
    start,
    end,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    actualStart,
    actualEnd,
    isMoving,
  };
};

export default useCreateController;
