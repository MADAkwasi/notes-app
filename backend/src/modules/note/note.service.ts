import { Types } from "mongoose";
import { INote, INoteDocument, INoteUpdate } from "../../types/note.type";
import { Note } from "./note.model";

export class NoteService {
  public async createNote(
    user: Types.ObjectId,
    data: INote
  ): Promise<INoteDocument> {
    const note = await Note.create({ ...data, user });

    return note;
  }

  public async getUserNotes(user: Types.ObjectId): Promise<INoteDocument[]> {
    const notes = await Note.find({ user }).select("-__v -deletedAt");

    return notes;
  }

  public async getNote(
    user: Types.ObjectId,
    noteId: string
  ): Promise<INoteDocument | null> {
    const note = await Note.findOne({ user, _id: noteId }).select(
      "-__v -deletedAt"
    );

    return note;
  }

  public async deleteNote(
    user: Types.ObjectId,
    noteId: string
  ): Promise<boolean> {
    const result = await Note.updateOne(
      { user, _id: noteId },
      { deletedAt: new Date(), isFavorite: false }
    );

    return result.modifiedCount > 0;
  }

  public async restoreNote(
    user: Types.ObjectId,
    noteId: string
  ): Promise<INoteDocument | null> {
    const restoredNote = await Note.findOneAndUpdate(
      {
        user,
        _id: noteId,
        includeDeleted: true,
      },
      { $set: { deletedAt: null } },
      { new: true }
    ).select("-__v -deletedAt");

    return restoredNote;
  }

  public async toggleFavorite(
    user: Types.ObjectId,
    noteId: string
  ): Promise<INoteDocument | null> {
    const note = await Note.findOne({ user, _id: noteId });

    if (!note) return null;

    note.isFavorite = !note.isFavorite;
    await note.save();

    return note;
  }

  public async getFavoriteNotes(
    user: Types.ObjectId
  ): Promise<INoteDocument[]> {
    const notes = await Note.find({ user, isFavorite: true }).select(
      "-__v -deletedAt"
    );

    return notes;
  }

  public async updateNote(
    user: Types.ObjectId,
    noteId: string,
    data: INoteUpdate
  ): Promise<INoteDocument | null> {
    const note = await Note.findOneAndUpdate({ user, _id: noteId }, data, {
      new: true,
      runValidators: true,
    }).select("-__v -deletedAt");

    return note;
  }

  public async getAllNotes(): Promise<INoteDocument[]> {
    const notes = await Note.find().select("-__v -deletedAt");

    return notes;
  }

  public async getDeletedNotes(user: Types.ObjectId): Promise<INoteDocument[]> {
    const notes = await Note.find({ user, includeDeleted: true })
      .where({
        deletedAt: { $ne: null },
      })
      .select("-__v");

    return notes;
  }
}

export const noteService = new NoteService();
