export interface NoteResponse {
  status: string;
  data: {
    notes: Note[];
  };
}

export interface Note {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  user: string;
  deletedAt?: Date;
}
