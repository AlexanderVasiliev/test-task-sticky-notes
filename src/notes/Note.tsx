import React, { useCallback, useEffect, useState } from 'react';
import type { FC } from 'react';

import {
  NoteBody,
  NoteHeader,
  NoteHeaderButton,
  ResizeControl,
  StyledNote,
} from './styled';
import type { NoteType } from '../types';
import { useDragAndDrop } from '../dnd/hooks';
import type { OnDrag } from '../dnd/types';
import ColorPicker from './ColorPicker';
import { minHeight, minWidth } from './constants';

type Position = {
  left: number,
  top: number,
};

type Size = {
  width: number,
  height: number,
};

const isBetween = (
  value: number,
  start: number,
  end: number,
): boolean => value > start && value < end;
const checkIsDrop = (target: HTMLElement | null, position: Position, sizes: Size): boolean => {
  if (!target) {
    return false;
  }
  const {
    top,
    left,
    right,
    bottom,
  } = target.getBoundingClientRect();

  return (
    isBetween(position.left + sizes.width / 2, left, right)
      && isBetween(position.top, top, bottom)
  );
};

type NoteProps = {
  note: NoteType
  onChange: (note: Partial<NoteType>) => Promise<void>,
  onRemove: (id: number) => Promise<void>,
  onCreate: () => Promise<void>,
  overlapId: number | null,
  setOverlapId: (id: number) => void,
  trashRef: React.MutableRefObject<HTMLElement | null>,
};

const Note: FC<NoteProps> = ({
  note,
  onChange,
  onRemove,
  onCreate,
  overlapId,
  setOverlapId,
  trashRef,
}) => {
  const [sizes, setSizes] = useState({ width: note.width, height: note.height });
  const [text, setText] = useState(note.text);
  const [position, setPosition] = useState<Position>({ left: note.left, top: note.top });
  const [showColorPicker, setShowColorPicker] = useState(false);
  useEffect(() => {
    setSizes({ width: note.width, height: note.height });
    setPosition({ left: note.left, top: note.top });
  }, [note]);
  const onDrag = useCallback<OnDrag>((deltaLeft, deltaTop) => {
    setPosition({
      left: position.left + deltaLeft,
      top: position.top + deltaTop,
    });
  }, [position.left, position.top]);
  const onDragEnd = useCallback(async () => {
    if (checkIsDrop(trashRef.current, position, sizes)) {
      await onRemove(note.id);
    } else {
      await onChange({ id: note.id, ...position });
    }
  }, [trashRef, position, sizes, onRemove, note.id, onChange]);
  const {
    onPointerDown,
    onPointerUp,
    onPointerMove,
  } = useDragAndDrop(onDrag, onDragEnd);
  const onFocus = useCallback(() => {
    setOverlapId(note.id);
  }, [note.id, setOverlapId]);
  const wrappedOnPointerDown = useCallback((e) => {
    onPointerDown(e);
    onFocus();
  }, [onFocus, onPointerDown]);

  const onTextChange = useCallback<(e: React.SyntheticEvent<HTMLTextAreaElement>) => void>((e) => {
    setText((e.target as HTMLTextAreaElement).value);
  }, []);
  const onBlur = useCallback(async () => {
    await onChange({ id: note.id, text });
  }, [note.id, onChange, text]);
  const remove = useCallback(async () => {
    await onRemove(note.id);
  }, [note.id, onRemove]);
  const onShowColorPicker = useCallback(() => {
    setShowColorPicker(true);
  }, [setShowColorPicker]);
  const onHideColorPicker = useCallback(() => {
    setShowColorPicker(false);
  }, []);
  const onSelectColor = useCallback<(color: string) => Promise<void>>(async (color) => {
    await onChange({ id: note.id, color });
    onHideColorPicker();
  }, [note.id, onChange, onHideColorPicker]);

  const resizeOnDrag = useCallback<OnDrag>((deltaLeft, deltaTop) => {
    const newWidth = sizes.width + deltaLeft;
    const newHeight = sizes.height + deltaTop;

    setSizes({
      width: newWidth > minWidth ? newWidth : minWidth,
      height: newHeight > minHeight ? newHeight : minHeight,
    });
  }, [sizes]);
  const resizeOnDragEnd = useCallback(async () => {
    await onChange({ id: note.id, ...sizes });
  }, [sizes, note.id, onChange]);

  const {
    onPointerDown: resizeOnPointerDown,
    onPointerUp: resizePointerUp,
    onPointerMove: resizePointerMove,
  } = useDragAndDrop(resizeOnDrag, resizeOnDragEnd);

  return (
    <StyledNote
      style={{
        transform: `translate(${position.left}px, ${position.top}px)`,
        width: sizes.width,
        height: sizes.height,
      }}
      onFocus={onFocus}
      isOverlapping={note.id === overlapId}
    >
      {
        showColorPicker && (
          <ColorPicker
            onSelect={onSelectColor}
          />
        )
      }
      <NoteHeader
        onPointerDown={wrappedOnPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerMove={onPointerMove}
        bgColor={note.color}
      >
        <NoteHeaderButton onClick={onCreate}>
          +
        </NoteHeaderButton>
        <div>
          <NoteHeaderButton onClick={onShowColorPicker}>
            ...
          </NoteHeaderButton>
          <NoteHeaderButton onClick={remove}>
            X
          </NoteHeaderButton>
        </div>
      </NoteHeader>
      <NoteBody
        value={text}
        onChange={onTextChange}
        onBlur={onBlur}
      />
      <ResizeControl
        onPointerDown={resizeOnPointerDown}
        onPointerUp={resizePointerUp}
        onPointerCancel={onPointerUp}
        onPointerMove={resizePointerMove}
      />
    </StyledNote>
  );
};

export default Note;
