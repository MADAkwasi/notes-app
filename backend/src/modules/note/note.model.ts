import { model, Schema, Query } from "mongoose";
import { INoteDocument, NoteQuery } from "../../types/note.type";

const noteSchema = new Schema<INoteDocument>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  tags: [String],
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  deletedAt: {
    type: Date,
    default: null,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

noteSchema.pre<Query<INoteDocument, INoteDocument & NoteQuery>>(
  /^find/,
  function () {
    const q = this.getQuery() as NoteQuery;

    if (!q.includeDeleted) {
      this.where({ deletedAt: null });
    }

    delete q.includeDeleted;
  }
);

export const Note = model<INoteDocument>("Note", noteSchema);
