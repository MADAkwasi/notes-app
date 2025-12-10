import { Activity, useEffect, useState } from "react";
import { TbTrashOff } from "react-icons/tb";
import type { Note } from "../utils/interfaces/note.interface";
import {
  getDeletedNotesRequest,
  restoreNoteRequest,
} from "../core/api/note.service";
import { useRequest } from "../utils/hooks/useRequest";
import { toast } from "react-toastify";
import { FiLoader } from "react-icons/fi";
import NoteItem from "../components/NoteItem";
import { useUIInteractions } from "../utils/hooks/useInteraction";

export default function RecycleBinPage() {
  const [deletedNotes, setDeletedNotes] = useState<Note[]>([]);
  const { isNotesListOpen } = useUIInteractions();
  const {
    execute: getDeletedNotes,
    isLoading,
    error,
  } = useRequest(getDeletedNotesRequest);
  const {
    execute: restoreNote,
    isLoading: isRestoring,
    error: restoreError,
  } = useRequest(restoreNoteRequest);

  const handleNoteRestore = (id: string) => {
    const restore = async () => {
      const restoredNote = await restoreNote(id);
      if (restoredNote?.status === "success") {
        setDeletedNotes((prevNotes) =>
          prevNotes.filter((note) => note._id !== id)
        );
        toast.success("Note restored successfully");
      }

      if (restoreError) toast.error(restoreError);
    };

    void restore();
  };

  useEffect(() => {
    const fetchDeletedNotes = async () => {
      const notes = await getDeletedNotes();
      if (notes) setDeletedNotes(notes);

      if (error) toast.error(error);
    };

    void fetchDeletedNotes();
  }, [getDeletedNotes, error]);

  return (
    <section className="p-6 bg-[#121212] w-full h-full overflow-y-auto">
      <Activity
        mode={isLoading || deletedNotes.length === 0 ? "visible" : "hidden"}
      >
        <section className="flex flex-col text-white text-center justify-center items-center w-full h-full gap-3 px-6 bg-[#121212]">
          <Activity
            mode={
              deletedNotes.length === 0 && !isLoading ? "visible" : "hidden"
            }
          >
            <TbTrashOff className="text-white text-6xl" />
            <h2 className="text-3xl font-semibold">Recycle Bin is empty</h2>
          </Activity>

          <Activity mode={isLoading ? "visible" : "hidden"}>
            <FiLoader className="animate-spin text-2xl" />
          </Activity>
        </section>
      </Activity>

      <Activity mode={deletedNotes.length > 0 ? "visible" : "hidden"}>
        <div
          className={`text-white grid gap-3 auto-rows-auto ${
            isNotesListOpen ? "grid-cols-2" : "grid-cols-3"
          }`}
        >
          {deletedNotes.map((note) => (
            <NoteItem
              note={note}
              isDeleted={true}
              onRestore={handleNoteRestore}
              isLoading={isRestoring}
              key={note._id}
            />
          ))}
        </div>
      </Activity>
    </section>
  );
}
