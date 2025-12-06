import { model, Schema, Query } from "mongoose";
import { INoteDocument } from "../../types/note.type";

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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

noteSchema.pre<Query<INoteDocument, INoteDocument>>(/^find/, function () {
  this.where({ deletedAt: null });
});

export const Note = model("Note", noteSchema);
