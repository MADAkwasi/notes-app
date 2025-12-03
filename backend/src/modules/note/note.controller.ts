import { NextFunction, Request, Response } from "express";
import { noteService } from "./note.service";
import AppError from "../../utils/appError";

export default class NoteController {
  static async createNote(req: Request, res: Response): Promise<void> {
    const { userId, body } = req;

    const note = await noteService.createNote(userId!, body);

    res.status(201).json({
      status: "success",
      data: {
        note,
      },
    });
  }

  static async getUserNotes(req: Request, res: Response): Promise<void> {
    const { userId } = req;

    const notes = await noteService.getUserNotes(userId!);

    res.status(201).json({
      status: "success",
      results: notes.length,
      data: {
        notes,
      },
    });
  }

  static async getNote(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const {
      userId,
      params: { noteId },
    } = req;

    const note = await noteService.getNote(userId!, noteId);

    if (!note) return next(new AppError("Note not found", 404));

    res.status(200).json({
      status: "success",
      data: {
        note,
      },
    });
  }

  static async deleteNote(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const {
      userId,
      params: { noteId },
    } = req;

    const isDeleted = await noteService.deleteNote(userId!, noteId);

    if (!isDeleted) return next(new AppError("Note not found", 404));

    res.status(200).json({
      status: "success",
      message: "Note deleted successfully",
    });
  }

  static async restoreNote(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const {
      userId,
      params: { noteId },
    } = req;

    const isRestored = await noteService.restoreNote(userId!, noteId);

    if (!isRestored) return next(new AppError("Note not found", 404));

    res.status(200).json({
      status: "success",
      message: "Note restored successfully",
    });
  }

  static async updateNote(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const {
      userId,
      params: { noteId },
      body: { title, content, tags },
    } = req;

    const note = await noteService.updateNote(userId!, noteId, {
      title,
      content,
      tags,
    });

    if (!note) return next(new AppError("Update failed. Note not found", 404));

    res.status(200).json({
      status: "success",
      data: {
        note,
      },
    });
  }

  static async getNotes(_: Request, res: Response): Promise<void> {
    const notes = await noteService.getAllNotes();

    res.status(200).json({
      status: "success",
      results: notes.length,
      data: {
        notes,
      },
    });
  }
}
