import { endpoints } from "../../utils/constants/endpoints";
import type { Note, NoteResponse } from "../../utils/interfaces/note.interface";
import api from "./api";

const { notes: notesEndpoints } = endpoints;

export async function getUserNotesRequest(): Promise<Note[]> {
  const { data: res } = await api.get<NoteResponse>(
    notesEndpoints.getUserNotes
  );

  return res.data.notes;
}
