import { type ReactElement, useEffect, useState } from "react";
import { FaCalendarDays, FaHashtag } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useRequest } from "../utils/hooks/useRequest";
import { getNoteRequest } from "../core/api/note.service";
import type { Note } from "../utils/interfaces/note.interface";

export default function NotePage(): ReactElement {
  const [userNote, setUserNote] = useState<Note | null>(null);
  const { id } = useParams();
  const { execute: getNote, isLoading, error } = useRequest(getNoteRequest);

  useEffect(() => {
    async function fetchNote() {
      if (!id) return;
      const note = await getNote(id);

      if (note) setUserNote(note);
      else toast.error(error);
    }

    fetchNote();
  }, [id, getNote, error]);

  return (
    <>
      {userNote && !isLoading && (
        <section className="py-6 px-4 text-white h-full w-full overflow-hidden">
          <h2 className="text-2xl font-bold">{userNote.title}</h2>

          <div className="border-b px-3 py-2 border-b-white flex items-center gap-10 my-5">
            <span className="flex items-center gap-4 ">
              <FaCalendarDays />
              <h4>Date</h4>
            </span>
            <h4>{new Date(userNote.createdAt).toDateString()}</h4>
          </div>

          <div className="border-b px-3 py-2 border-b-white flex items-center gap-10 my-5">
            <span className="flex items-center gap-4 ">
              <FaHashtag />
              <h4>Tags</h4>
            </span>

            <input
              type="text"
              value={userNote.tags.join(", ")}
              readOnly
              className="bg-transparent outline-none w-full"
            />
          </div>

          <textarea className="whitespace-pre-line  w-full h-[calc(100%-200px)] bg-transparent outline-none resize-none">
            {userNote.content}
          </textarea>
        </section>
      )}
    </>
  );
}
