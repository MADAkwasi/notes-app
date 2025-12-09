export interface NotesResponse {
  status: string;
  results: number;
  data: {
    notes: Note[];
  };
}

export interface NoteResponse {
  status: string;
  data: {
    note: Note;
  };
}

export interface Note {
  _id: string;
  title: string;
  content: string;
  isFavorite: boolean;
  tags: string[];
  user: string;
  deletedAt?: Date;
  createdAt: Date;
}

export interface CreateNoteDTO {
  [key: string]: unknown;
  title: string;
  tags?: string[];
  content: string;
}

export interface CreateNoteFormInput {
  [key: string]: unknown;
  title: string;
  content: string;
  tags?: string;
}

export interface EditNoteDTO {
  tags?: string[];
  content?: string;
}

export interface NoteDeletedResponse {
  status: string;
  message: string;
}
