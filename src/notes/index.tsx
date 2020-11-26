import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { FC } from 'react';

import {
  Button,
  ButtonsContainer,
  Container,
} from './styled';
import type { NoteType } from '../types';
import Note from './Note';
import { initialNote } from './constants';
import useCreateController from './createController/useCreateController';
import CreateController from './createController/CreateController';

type ProbablyPromise<T> = T | Promise<T>;

interface NotesProps {
  loadNotes(): ProbablyPromise<NoteType[]>,
  createNote(note: Omit<NoteType, 'id'>): ProbablyPromise<void>,
  updateNote(note: Partial<NoteType>): ProbablyPromise<void>,
  removeNote(id: number): ProbablyPromise<void>,
}

const Notes: FC<NotesProps> = ({
  loadNotes,
  createNote,
  updateNote,
  removeNote,
}) => {
  const [overlapId, setOverlapId] = useState<number | null>(null);
  const trashRef = useRef<HTMLButtonElement | null>(null);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const loadAndSetNotes = useCallback(async () => {
    const data = await loadNotes();
    setNotes(data);
  }, [loadNotes]);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadAndSetNotes();
  }, [loadAndSetNotes]);
  const onChange = useCallback(async (note: Partial<NoteType>) => {
    await updateNote(note);
    await loadAndSetNotes();
  }, [loadAndSetNotes, updateNote]);
  const onRemove = useCallback(async (id: number) => {
    await removeNote(id);
    await loadAndSetNotes();
  }, [loadAndSetNotes, removeNote]);
  const onCreate = useCallback(async (note?: Omit<NoteType, 'id'>) => {
    await createNote(note ?? initialNote);
    await loadAndSetNotes();
  }, [createNote, loadAndSetNotes]);

  const {
    containerRef,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    actualStart,
    actualEnd,
    isMoving,
  } = useCreateController(onCreate);

  return (
    <Container
      ref={(node) => { containerRef.current = node; }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {
        isMoving && (
          <CreateController
            start={actualStart}
            end={actualEnd}
          />
        )
      }
      <ButtonsContainer>
        <Button
          onClick={onCreate}
        >
          Create
        </Button>
        <Button ref={(node) => { trashRef.current = node; }}>
          Trash
        </Button>
      </ButtonsContainer>
      {
        notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            onChange={onChange}
            onRemove={onRemove}
            onCreate={onCreate}
            overlapId={overlapId}
            setOverlapId={setOverlapId}
            trashRef={trashRef}
          />
        ))
      }
    </Container>
  );
};

export default Notes;
