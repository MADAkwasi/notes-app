import { useEffect, type ReactElement } from "react";
import { FaSearch } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { Outlet } from "react-router-dom";
import AppButton from "../../components/Button";
import NavigationOption from "../../components/NavigationOption";
import { additionalNavigation } from "../../utils/constants/navigation";
import DashboardSkeleton from "../../components/DashboardSkeleton";
import { useAuth } from "../../utils/hooks/useAuth";

export default function DashboardLayout(): ReactElement {
  const { user, logout, refreshUser, isFetchingUser } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  return (
    <>
      {isFetchingUser ? (
        <DashboardSkeleton />
      ) : (
        <main className="flex w-screen h-screen">
          <section className="w-1/4 py-6 px-4 flex flex-col gap-4">
            <header className="flex flex-col gap-6">
              <div className="flex items-center justify-between ">
                <img src="logo.svg" alt="logo" />

                <AppButton
                  title="Search Note"
                  variant="tertiary"
                  className="w-fit!"
                >
                  <FaSearch className="text-white text-xl" />
                </AppButton>
              </div>

              <AppButton title="Create a new note">
                <IoMdAdd /> New Note
              </AppButton>
            </header>

            <div className="my-3 flex flex-col gap-4">
              <NavigationOption group={additionalNavigation} />
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
          <section className="w-3/4 bg-[#1c1c1c]">
            <Outlet />
          </section>
        </main>
      )}
    </>
  );
}
