import { Document, Types } from "mongoose";

export interface INote {
  title: string;
  content: string;
  tags: string[];
  user: Types.ObjectId;
  deletedAt: Date | null;
}

export type INoteUpdate = Partial<Pick<INote, "title" | "content" | "tags">>;

export interface INoteDocument extends INote, Document {}
