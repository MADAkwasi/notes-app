import { createContext } from "react";
import type { UIInteractionContextType } from "../../../utils/interfaces/interaction.interface";

export const UIInteractionContext = createContext<UIInteractionContextType>({
  isNotesListOpen: false,
  isRecentTab: false,
  showNoteList: () => {},
  hideNoteList: () => {},
  setIsRecentTab: () => {},
  closeNoteForm: () => {},
  openNoteForm: () => {},
  isNoteFormOpen: false,
});
