import { endpoints } from "../../utils/constants/endpoints";
import type {
  CreateNoteDTO,
  EditNoteDTO,
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
    notesEndpoints.handleNote(id)
  );

  return res.data.note;
}

export async function getDeletedNotesRequest(): Promise<Note[]> {
  const { data: res } = await api.get<NotesResponse>(
    notesEndpoints.getDeletedNotes
  );
  return res.data.notes;
}

export async function postNoteRequest(data: CreateNoteDTO) {
  const res = await api.post<CreateNoteDTO>(notesEndpoints.postNote, data);

  return res;
}

export async function editNoteRequest(
  data: EditNoteDTO,
  id: string
): Promise<Note> {
  const { data: res } = await api.patch<NoteResponse>(
    notesEndpoints.handleNote(id),
    data
  );

  return res.data.note;
}
