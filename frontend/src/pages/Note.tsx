import {
  Activity,
  type ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaCalendarDays, FaHashtag } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { TbCancel } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useRequest } from "../utils/hooks/useRequest";
import {
  deleteNoteRequest,
  editNoteRequest,
  getNoteRequest,
  handleFavoriteStatusRequest,
} from "../core/api/note.service";
import type { EditNoteDTO, Note } from "../utils/interfaces/note.interface";
import AppButton from "../components/Button";
import { useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import { useNotes } from "../utils/hooks/useNote";

export default function NotePage(): ReactElement {
  const { setNotes } = useNotes();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userNote, setUserNote] = useState<Note | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { execute: getNote, isLoading, error } = useRequest(getNoteRequest);
  const {
    execute: deleteNote,
    isLoading: isDeleting,
    error: deleteError,
  } = useRequest(deleteNoteRequest);
  const {
    execute: editNote,
    isLoading: isSubmitting,
    error: editError,
  } = useRequest(editNoteRequest);
  const {
    execute: toggleFavoriteStatus,
    isLoading: isUpdating,
    error: favoriteError,
  } = useRequest(handleFavoriteStatusRequest);
  const { handleSubmit, register, setValue, getValues, reset } = useForm();

  const handleEditMode = () => {
    setIsEditing(true);
    setIsMenuOpen(false);
  };

  const cancelEditMode = () => {
    reset({
      tags: userNote?.tags.join(", "),
      content: userNote?.content,
    });
    setIsEditing(false);
  };

  const onSubmit = () => {
    const editedData: EditNoteDTO = {
      content: getValues("content"),
      tags: getValues("tags")
        .split(",")
        .map((tag: string) => tag.trim()),
    };

    const saveEditedNote = async () => {
      if (!id) return;
      const updatedNote = await editNote(editedData, id);

      if (updatedNote) {
        setUserNote(updatedNote);
        setIsEditing(false);
        toast.success("Note updated successfully!");
      }
      if (editError) toast.error(editError);
    };
    void saveEditedNote();
  };

  const handleDeleteNote = () => {
    const deleteUserNote = async () => {
      if (!id) return;
      const data = await deleteNote(id);
      console.log(data);
      if (data?.status === "success") {
        toast.success(data.message);
        setUserNote(null);
        setNotes((notes) => notes.filter((note) => note._id !== id));
        navigate("/");
        setIsMenuOpen(false);
      }
      if (deleteError) toast.error(deleteError);
    };
    void deleteUserNote();
  };

  const handleFavoriteStatus = () => {
    const toggleFavorite = async () => {
      if (!id) return;
      const updatedNote = await toggleFavoriteStatus(id);
      if (updatedNote) {
        setUserNote(updatedNote);
        setIsMenuOpen(false);
        toast.success(
          updatedNote.isFavorite
            ? "Note added to favorites!"
            : "Note removed from favorites!"
        );
      }

      if (favoriteError) toast.error(favoriteError);
    };

    void toggleFavorite();
  };

  useEffect(() => {
    async function fetchNote() {
      if (!id) return;
      const note = await getNote(id);

      if (note) {
        setUserNote(note);
        setValue("tags", note.tags.join(", "));
        setValue("content", note.content);
      } else toast.error(error);
    }

    fetchNote();
  }, [id, getNote, error, setValue]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <Activity mode={isLoading ? "visible" : "hidden"}>
        <section className="flex flex-col text-white text-center justify-center items-center w-full h-full gap-3 px-6 bg-[#121212]">
          <FiLoader className="animate-spin text-2xl" />
        </section>
      </Activity>

      {userNote && !isLoading && (
        <section className="py-6 px-4 text-white h-full w-full overflow-hidden bg-[#121212]">
          <div className="flex items-center justify-between relative">
            <h2 className="text-2xl font-bold">{userNote.title}</h2>
            <AppButton
              variant="tertiary"
              title="View More"
              className="w-fit! p-0!"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen((prev) => !prev);
              }}
            >
              <BsThreeDots className="text-white" />
            </AppButton>

            <Activity mode={isMenuOpen ? "visible" : "hidden"}>
              <div
                ref={menuRef}
                className="absolute right-0 bg-[#1f1f1f] shadow-lg rounded-md top-10 flex flex-col py-2 gap-3"
              >
                <AppButton
                  variant="tertiary"
                  title={
                    userNote.isFavorite
                      ? "Remove from Favorites"
                      : "Add to Favorites"
                  }
                  className="text-white text-sm rounded-none border-b border-b-white px-4"
                  disabled={isDeleting || isUpdating}
                  onClick={handleFavoriteStatus}
                >
                  {userNote.isFavorite
                    ? "Remove from Favorites"
                    : " Add to favorites"}
                </AppButton>

                <AppButton
                  variant="tertiary"
                  title="Edit Note"
                  className="text-white text-sm rounded-none border-b border-b-white px-4"
                  onClick={handleEditMode}
                  disabled={isDeleting || isUpdating}
                >
                  Edit Note
                </AppButton>

                <AppButton
                  variant="tertiary"
                  title="Delete Note"
                  className="text-white text-sm rounded-none px-4"
                  onClick={handleDeleteNote}
                  disabled={isDeleting || isUpdating}
                >
                  Delete Note
                </AppButton>
              </div>
            </Activity>
          </div>

          <div className="border-b px-3 py-2 border-b-white flex items-center gap-10 my-5">
            <span className="flex items-center gap-4 ">
              <FaCalendarDays />
              <h4>Date</h4>
            </span>
            {new Intl.DateTimeFormat("en-GB").format(
              new Date(userNote.createdAt)
            )}

            <Activity mode={isEditing ? "visible" : "hidden"}>
              <span className="ml-auto flex items-center gap-4">
                <AppButton
                  variant="secondary"
                  className="w-fit! px-4  py-2!"
                  onClick={onSubmit}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <FiLoader className="animate-spin" />
                  ) : (
                    <>
                      <FaSave className="mr-2" /> Save
                    </>
                  )}
                </AppButton>

                <AppButton
                  variant="secondary"
                  className="w-fit! px-4 py-2! bg-red-500!"
                  onClick={cancelEditMode}
                  disabled={isSubmitting}
                >
                  <TbCancel className="mr-2" /> Cancel
                </AppButton>
              </span>
            </Activity>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="border-b px-3 py-2 border-b-white flex items-center gap-10 my-5">
              <span className="flex items-center gap-4 ">
                <FaHashtag />
                <h4>Tags</h4>
              </span>

              <input
                type="text"
                readOnly={!isEditing || isSubmitting}
                className="bg-transparent outline-none w-full"
                {...register("tags")}
              />
            </div>

            <textarea
              className="whitespace-pre-line  w-full  bg-transparent outline-none resize-none"
              readOnly={!isEditing || isSubmitting}
              rows={10}
              {...register("content")}
            />
          </form>
        </section>
      )}
    </>
  );
}
