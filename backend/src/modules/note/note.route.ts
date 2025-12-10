import { Router } from "express";
import { protect } from "../../middleware/auth";
import NoteController from "./note.controller";
import { validate } from "../../middleware/validator";
import {
  createNoteSchema,
  noteParamSchema,
  updateNoteSchema,
} from "./note.schema";

const router = Router();

router.use(protect);

router.route("/my-notes").get(NoteController.getUserNotes);

router.route("/my-notes/deleted").get(NoteController.getDeletedNotes);

router.route("/my-notes/favorites").get(NoteController.getFavorites);

router
  .route("/")
  .get(NoteController.getNotes)
  .post(validate(createNoteSchema), NoteController.createNote);

router
  .route("/:noteId")
  .get(NoteController.getNote)
  .patch(validate(updateNoteSchema), NoteController.updateNote)
  .delete(validate(noteParamSchema), NoteController.deleteNote);

router.patch(
  "/:noteId/restore",
  validate(noteParamSchema),
  NoteController.restoreNote
);

router.patch(
  "/:noteId/favorite",
  validate(noteParamSchema),
  NoteController.handleFavorite
);

export default router;
