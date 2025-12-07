import { endpoints } from "../../utils/constants/endpoints";
import type {
  Note,
  NoteResponse,
  NotesResponse,
} from "../../utils/interfaces/note.interface";
import api from "./api";

const { notes: notesEndpoints } = endpoints;

export async function getUserNotesRequest(): Promise<Note[]> {
  const { data: res } = await api.get<NotesResponse>(
    notesEndpoints.getUserNotes
  );

  return res.data.notes;
}

export async function getNoteRequest(id: string): Promise<Note> {
  const { data: res } = await api.get<NoteResponse>(
    notesEndpoints.getNoteById(id)
  );

  return res.data.note;
}
