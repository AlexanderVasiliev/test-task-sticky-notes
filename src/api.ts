import type { NoteType } from './types';
import { isNote } from './utils';

const localStorageKey = 'notesLocalStorageKey';

const getAllNotes = (): NoteType[] => {
  const storage = localStorage.getItem(localStorageKey);

  if (storage === null) {
    return [];
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const notes = JSON.parse(storage);

  if (Array.isArray(notes)) {
    return notes.reduce<NoteType[]>((res, note) => {
      if (isNote(note)) {
        res.push(note);
      }

      return res;
    }, []);
  }

  return [];
};

const setNotes = (notes: NoteType[]): void => {
  const storage = JSON.stringify(notes);
  localStorage.setItem(localStorageKey, storage);
};

export const getNotes = (): NoteType[] => getAllNotes();

export const postNote = (note: Omit<NoteType, 'id'>): void => {
  const notes = getAllNotes();

  const updatedNotes: NoteType[] = [
    ...notes,
    {
      ...note,
      id: Date.now(),
    },
  ];

  setNotes(updatedNotes);
};

export const patchNote = (note: Partial<NoteType>): void => {
  const notes = getAllNotes();

  const oldNoteIndex = notes.findIndex(({ id }) => note.id === id);

  const oldNote = notes[oldNoteIndex];

  notes.splice(oldNoteIndex, 1, { ...oldNote, ...note });
  setNotes(notes);
};

export const deleteNote = (id: number): void => {
  const notes = getAllNotes();

  const noteIndex = notes.findIndex((note) => note.id === id);

  notes.splice(noteIndex, 1);

  setNotes(notes);
};
