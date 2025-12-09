import { Activity, type ReactElement, useEffect, useState } from "react";
import { FaCalendarDays, FaHashtag } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { TbCancel } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useRequest } from "../utils/hooks/useRequest";
import { editNoteRequest, getNoteRequest } from "../core/api/note.service";
import type { EditNoteDTO, Note } from "../utils/interfaces/note.interface";
import AppButton from "../components/Button";
import { useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";

export default function NotePage(): ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userNote, setUserNote] = useState<Note | null>(null);
  const { id } = useParams();
  const { execute: getNote, isLoading, error } = useRequest(getNoteRequest);
  const {
    execute: editNote,
    isLoading: isEditingNote,
    error: editError,
  } = useRequest(editNoteRequest);
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

  return (
    <>
      {userNote && !isLoading && (
        <section className="py-6 px-4 text-white h-full w-full overflow-hidden bg-[#121212]">
          <div className="flex items-center justify-between relative">
            <h2 className="text-2xl font-bold">{userNote.title}</h2>
            <AppButton
              variant="tertiary"
              title="View More"
              className="w-fit! p-0!"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <BsThreeDots className="text-white" />
            </AppButton>

            <Activity mode={isMenuOpen ? "visible" : "hidden"}>
              <div className="absolute right-0 bg-[#1f1f1f] shadow-lg rounded-md top-10 flex flex-col py-2 gap-3">
                <AppButton
                  variant="tertiary"
                  title="Add to Favorites"
                  className="text-white text-sm rounded-none border-b border-b-white px-4"
                >
                  Add to favorites
                </AppButton>

                <AppButton
                  variant="tertiary"
                  title="Edit Note"
                  className="text-white text-sm rounded-none border-b border-b-white px-4"
                  onClick={handleEditMode}
                >
                  Edit Note
                </AppButton>

                <AppButton
                  variant="tertiary"
                  title="Delete Note"
                  className="text-white text-sm rounded-none px-4"
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
                  disabled={isEditingNote}
                >
                  {isEditingNote ? (
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
                  disabled={isEditingNote}
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
                readOnly={!isEditing}
                className="bg-transparent outline-none w-full"
                {...register("tags")}
              />
            </div>

            <textarea
              className="whitespace-pre-line  w-full  bg-transparent outline-none resize-none"
              readOnly={!isEditing}
              rows={10}
              {...register("content")}
            />
          </form>
        </section>
      )}
    </>
  );
}
