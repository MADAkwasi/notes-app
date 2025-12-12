import { Activity, useEffect, useState, type ReactElement } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link, Outlet } from "react-router-dom";
import AppButton from "../../components/Button";
import NoteForm from "../../components/NoteForm";
import { useUIInteractions } from "../../utils/hooks/useInteraction";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../../utils/hooks/useAuth";
import { FiLogOut } from "react-icons/fi";
import { FaPlus, FaRegStar, FaRegTrashAlt } from "react-icons/fa";
import { HiHome } from "react-icons/hi2";
import { useNotes } from "../../utils/hooks/useNote";

export default function MobileLayout(): ReactElement {
  const { setNotes } = useNotes();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isNoteFormOpen, openNoteForm } = useUIInteractions();
  const { user, logout, refreshUser } = useAuth();

  const handleLogout = async () => {
    await logout();
    setNotes([]);
  };

  useEffect(() => {
    if (!user) void refreshUser();
  }, [refreshUser, user]);

  return (
    <main className="flex flex-col h-screen w-full overflow-y-auto bg-[#121212]">
      <header
        className={`flex gap-4 items-center justify-between py-4 px-6 sticky top-0 bg-[#1a1a1a] shadow-md ${
          isNoteFormOpen ? "z-0" : "z-20"
        }`}
      >
        <Link to="/">
          <img src="logo.svg" alt="logo" />
        </Link>

        <div className="flex gap-4 items-center">
          <AppButton
            variant="tertiary"
            className="w-fit! p-0!"
            onClick={openNoteForm}
          >
            <FaPlus className="text-white text-2xl" />
          </AppButton>
          <AppButton
            title="Open Menu"
            variant="tertiary"
            className="w-fit!"
            onClick={() => setIsMenuOpen(true)}
          >
            <HiMenuAlt3 className="text-white text-xl" />
          </AppButton>
        </div>

        <Activity mode={isMenuOpen ? "visible" : "hidden"}>
          <div className="h-screen w-full md:w-3/4 absolute top-0 right-0 bg-[#1a1a1a] flex flex-col p-6 shadow-xl">
            <div className="text-white flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-gray-400 h-12 w-12"></span>
                {user && <h5>{user.name}</h5>}
              </div>

              <AppButton
                variant="tertiary"
                className="w-fit! p-0!"
                onClick={() => setIsMenuOpen(false)}
              >
                <IoClose className="text-white text-2xl" />
              </AppButton>
            </div>

            <ul className="flex flex-col gap-4 text-white mb-auto">
              <Link to="/">
                <li
                  className="py-2 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <HiHome className="inline mr-2 mb-1" />
                  Home
                </li>
              </Link>
              <Link to="/favorites">
                <li
                  className="py-2 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaRegStar className="inline mr-2 mb-1" />
                  Favorites
                </li>
              </Link>
              <Link to="/recycle-bin">
                <li
                  className="py-2 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaRegTrashAlt className="inline mr-2 mb-1" />
                  Trash
                </li>
              </Link>
            </ul>

            <AppButton
              title="logout"
              variant="secondary"
              onClick={handleLogout}
            >
              <FiLogOut className="text-2xl mx-2" /> <p>Logout</p>
            </AppButton>
          </div>
        </Activity>
      </header>

      <Outlet />

      <Activity mode={isNoteFormOpen ? "visible" : "hidden"}>
        <NoteForm />
      </Activity>
    </main>
  );
}
