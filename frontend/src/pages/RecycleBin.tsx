import { Activity, useEffect, useState } from "react";
import { TbTrashOff } from "react-icons/tb";
import type { Note } from "../utils/interfaces/note.interface";
import { getDeletedNotesRequest } from "../core/api/note.service";
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

  useEffect(() => {
    const fetchDeletedNotes = async () => {
      const notes = await getDeletedNotes();
      if (notes) setDeletedNotes(notes);

      if (error) toast.error(error);
    };

    void fetchDeletedNotes();
  }, [getDeletedNotes, error]);

  return (
    <>
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
        <section
          className={`text-white grid w-full h-full gap-3 p-6 bg-[#121212] ${
            isNotesListOpen ? "grid-cols-2" : "grid-cols-3"
          }`}
        >
          {deletedNotes.map((note) => (
            <NoteItem note={note} isDeleted={true} />
          ))}
        </section>
      </Activity>
    </>
  );
}
