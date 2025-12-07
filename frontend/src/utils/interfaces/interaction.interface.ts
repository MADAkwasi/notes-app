export interface UIInteractionContextType {
  isNotesListOpen: boolean;
  isRecentTab: boolean;
  showNoteList: () => void;
  hideNoteList: () => void;
  setIsRecentTab: (value: boolean) => void;
}
