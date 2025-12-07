import { useState, type ReactNode, useCallback, useMemo } from "react";
import { UIInteractionContext } from "./InteractionContext";

interface Props {
  children: ReactNode;
}

export function UIInteractionProvider({ children }: Props) {
  const [isNotesListOpen, setIsNoteListOpen] = useState(false);
  const [isRecentTab, setIsRecentTab] = useState(false);

  const showNoteList = useCallback(() => {
    setIsNoteListOpen(true);
  }, []);

  const hideNoteList = useCallback(() => {
    setIsNoteListOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isNotesListOpen,
      isRecentTab,
      showNoteList,
      hideNoteList,
      setIsRecentTab,
    }),
    [isNotesListOpen, isRecentTab, hideNoteList, showNoteList, setIsRecentTab]
  );

  return (
    <UIInteractionContext.Provider value={value}>
      {children}
    </UIInteractionContext.Provider>
  );
}
