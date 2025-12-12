import { Activity, useEffect } from "react";
import { TbTrashOff } from "react-icons/tb";
import {
  getDeletedNotesRequest,
  restoreNoteRequest,
} from "../core/api/note.service";
import { useRequest } from "../utils/hooks/useRequest";
import { toast } from "react-toastify";
import { FiLoader } from "react-icons/fi";
import NoteItem from "../components/NoteItem";
import { useUIInteractions } from "../utils/hooks/useInteraction";
import { useNotes } from "../utils/hooks/useNote";
import NoteItemSkeleton from "../components/NoteItemSkeleton";

export default function RecycleBinPage() {
  const { deletedNotes, setDeletedNotes, setNotes } = useNotes();
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
      if (restoredNote) {
        setDeletedNotes((notes) => notes.filter((note) => note._id !== id));
        setNotes((notes) => [...notes, restoredNote]);

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
  }, [getDeletedNotes, setDeletedNotes, error]);

  return (
    <section className="p-6 bg-[#121212] w-full h-full overflow-y-auto">
      <Activity
        mode={isLoading || deletedNotes.length === 0 ? "visible" : "hidden"}
      >
        <section className="flex flex-col text-white text-center lg:justify-center lg:items-center w-full h-full gap-3 lg:px-6 bg-[#121212]">
          <Activity
            mode={
              deletedNotes.length === 0 && !isLoading ? "visible" : "hidden"
            }
          >
            <div className="flex flex-col justify-center items-center gap-3 h-full mb-8">
              <TbTrashOff className="text-white text-4xl md:text-6xl" />
              <h2 className="text-xl md:text-3xl font-semibold">
                Recycle Bin is empty
              </h2>
            </div>
          </Activity>

          <Activity mode={isLoading ? "visible" : "hidden"}>
            <section className="lg:hidden w-full gap-6 py-8 bg-[#121212] grid grid-cols-1 md:grid-cols-2">
              <NoteItemSkeleton />
            </section>

            <div className="hidden lg:block">
              <FiLoader className="animate-spin text-2xl" />
            </div>
          </Activity>
        </section>
      </Activity>

      <Activity mode={deletedNotes.length > 0 ? "visible" : "hidden"}>
        <div
          className={`text-white grid gap-3 auto-rows-auto grid-cols-1 md:grid-cols-2 ${
            isNotesListOpen ? "lg:grid-cols-2" : "lg:grid-cols-3"
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
