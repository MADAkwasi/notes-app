import { useState, type ReactNode } from "react";
import type { Note } from "../../../utils/interfaces/note.interface";
import { NoteContext } from "./NoteContext";

export function NoteProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [deletedNotes, setDeletedNotes] = useState<Note[]>([]);
  const [favoriteNotes, setFavoriteNotes] = useState<Note[]>([]);

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        deletedNotes,
        setDeletedNotes,
        favoriteNotes,
        setFavoriteNotes,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}
