import { createContext } from "react";
import type { NoteContextType } from "../../../utils/interfaces/note.interface";

export const NoteContext = createContext<NoteContextType | null>(null);
