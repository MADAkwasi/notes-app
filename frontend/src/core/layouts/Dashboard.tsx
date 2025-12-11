import { Activity, useEffect, type ReactElement } from "react";
import { FiLogOut } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";
import AppButton from "../../components/Button";
import NavigationOption from "../../components/NavigationOption";
import {
  additionalNavigation,
  recentNavigationGroup,
} from "../../utils/constants/navigation";
import DashboardSkeleton from "../../components/DashboardSkeleton";
import { useAuth } from "../../utils/hooks/useAuth";
import { useRequest } from "../../utils/hooks/useRequest";
import { getUserNotesRequest } from "../api/note.service";
import { toast } from "react-toastify";
import NoteList from "../../components/NoteList";
import { useUIInteractions } from "../../utils/hooks/useInteraction";
import NoteForm from "../../components/NoteForm";
import { useNotes } from "../../utils/hooks/useNote";

export default function DashboardLayout(): ReactElement {
  const { notes, setNotes } = useNotes();
  const { isNotesListOpen, isNoteFormOpen, openNoteForm } = useUIInteractions();
  const { user, logout, refreshUser, isFetchingUser } = useAuth();
  const {
    execute: getNotes,
    isLoading: isFetchingNotes,
    error,
  } = useRequest(getUserNotesRequest);

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const userNote = await getNotes();

      if (userNote) setNotes(userNote);

      if (error) toast.error(error);
    };

    if (notes.length === 0) {
      void fetchNotes();
    }
  }, [getNotes, notes, setNotes, error]);

  useEffect(() => {
    if (!user) void refreshUser();
  }, [refreshUser, user]);

  return (
    <>
      {isFetchingUser || isFetchingNotes ? (
        <DashboardSkeleton />
      ) : (
        <main className="flex h-screen relative">
          <section className="w-1/4 pt-6 px-4 flex flex-col gap-4">
            <header className="flex gap-4 items-center justify-between ">
              <Link to="/">
                <img src="logo.svg" alt="logo" />
              </Link>

              {/* <AppButton
                  title="Search Note"
                  variant="tertiary"
                  className="w-fit!"
                >
                  <FaSearch className="text-white text-xl" />
                </AppButton> */}
              <AppButton
                title="Create a new note"
                variant="tertiary"
                className="w-fit!"
                onClick={openNoteForm}
              >
                <FaPlus className="text-white text-xl" />
              </AppButton>
            </header>

            <div className="my-3 flex flex-col gap-4">
              <NavigationOption group={recentNavigationGroup(notes)} />
              <NavigationOption group={additionalNavigation} />
            </div>

            <div className="mt-auto text-white flex items-center gap-3 justify-between">
              <span className="rounded-full bg-gray-400 h-12 w-12"></span>
              <span className="w-[calc(100%-4rem)] flex items-center justify-between">
                {user && <h5>{user.name}</h5>}
                <AppButton
                  title="logout"
                  variant="tertiary"
                  className="w-fit!"
                  onClick={handleLogout}
                >
                  <FiLogOut className="text-white text-2xl" />
                </AppButton>
              </span>
            </div>
          </section>
          <Activity mode={isNotesListOpen ? "visible" : "hidden"}>
            <section className="w-1/4 bg-[#1c1c1c] transition-all duration-200">
              <NoteList />
            </section>
          </Activity>

          <section
            className={`transition-all duration-200 ${
              isNotesListOpen ? "w-2/4 " : "w-3/4"
            }`}
          >
            <Outlet />
          </section>

          <Activity mode={isNoteFormOpen ? "visible" : "hidden"}>
            <NoteForm />
          </Activity>
        </main>
      )}
    </>
  );
}
