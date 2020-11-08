import type { NoteType } from './types';

export const isNote = (probablyNote: unknown): probablyNote is NoteType => {
  let result = true;

  if (!probablyNote) {
    return false;
  }

  const {
    id,
    top,
    left,
    text,
    width,
    height,
    color,
  } = probablyNote as NoteType;
  result = result && typeof id === 'number';
  result = result && typeof top === 'number';
  result = result && typeof left === 'number';
  result = result && typeof text === 'string';
  result = result && typeof width === 'number';
  result = result && typeof height === 'number';
  result = result && typeof color === 'string';

  return result;
};
