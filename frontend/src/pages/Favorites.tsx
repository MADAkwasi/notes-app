import { Activity, useEffect, type ReactElement } from "react";
import { LuStarOff } from "react-icons/lu";
import { useRequest } from "../utils/hooks/useRequest";
import {
  getFavoriteNotesRequest,
  handleFavoriteStatusRequest,
} from "../core/api/note.service";
import NoteItem from "../components/NoteItem";
import { useUIInteractions } from "../utils/hooks/useInteraction";
import { FiLoader } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNotes } from "../utils/hooks/useNote";

export default function FavoritesPage(): ReactElement {
  const { setNotes, favoriteNotes, setFavoriteNotes } = useNotes();
  const { isNotesListOpen } = useUIInteractions();
  const {
    execute: getFavorites,
    isLoading,
    error,
  } = useRequest(getFavoriteNotesRequest);
  const {
    execute: toggleFavoriteStatus,
    isLoading: isToggling,
    error: toggleError,
  } = useRequest(handleFavoriteStatusRequest);

  const handleFavoriteStatus = (id: string) => {
    const toggleFavorite = async () => {
      const updatedNote = await toggleFavoriteStatus(id);
      if (updatedNote) {
        setNotes((notes) =>
          notes.map((note) =>
            updatedNote._id === note._id ? updatedNote : note
          )
        );

        setFavoriteNotes((notes) =>
          notes.filter((note) => note._id !== updatedNote._id)
        );

        toast.success(
          updatedNote.isFavorite
            ? "Note added to favorites!"
            : "Note removed from favorites!"
        );
      }

      if (toggleError) toast.error(toggleError);
    };

    void toggleFavorite();
  };

  useEffect(() => {
    async function fetchFavorites() {
      const notes = await getFavorites();

      if (notes) setFavoriteNotes(notes);

      if (error) {
        console.error(error);
      }
    }

    void fetchFavorites();
  }, [getFavorites, setFavoriteNotes, error]);

  return (
    <section className="p-6 bg-[#121212] w-full h-full overflow-y-auto">
      <Activity
        mode={isLoading || favoriteNotes.length === 0 ? "visible" : "hidden"}
      >
        <section className="flex flex-col text-white text-center justify-center items-center w-full h-full gap-3 px-6 bg-[#121212]">
          <Activity
            mode={
              favoriteNotes.length === 0 && !isLoading ? "visible" : "hidden"
            }
          >
            <LuStarOff className="text-white text-6xl" />
            <h2 className="text-3xl font-semibold">
              No note has been added to Favorites
            </h2>
          </Activity>

          <Activity mode={isLoading ? "visible" : "hidden"}>
            <FiLoader className="animate-spin text-2xl" />
          </Activity>
        </section>
      </Activity>

      <Activity
        mode={favoriteNotes.length > 0 && !isLoading ? "visible" : "hidden"}
      >
        <section
          className={`text-white grid gap-3 auto-rows-auto ${
            isNotesListOpen ? "grid-cols-2" : "grid-cols-3"
          }`}
        >
          {favoriteNotes.map((note) => (
            <Link to={`/notes/${note._id}`} key={note._id}>
              <NoteItem
                note={note}
                handleFavoriteStatus={handleFavoriteStatus}
                isLoading={isToggling}
              />
            </Link>
          ))}
        </section>
      </Activity>
    </section>
  );
}
