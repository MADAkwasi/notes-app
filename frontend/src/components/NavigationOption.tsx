import { Activity, type ReactElement } from "react";
import AppButton from "./Button";
import type { NavigationGroup } from "../utils/interfaces/navigation.interface";
import { NavLink } from "react-router-dom";
import { useUIInteractions } from "../utils/hooks/useInteraction";
import { ImFilesEmpty } from "react-icons/im";

interface OptionProps {
  group: NavigationGroup;
}

export default function NavigationOption({
  group,
}: Readonly<OptionProps>): ReactElement {
  const { showNoteList, setIsRecentTab } = useUIInteractions();

  const handleShowList = () => {
    showNoteList();
    setIsRecentTab(true);
  };

  return (
    <div className="text-gray-400 flex flex-col gap-1">
      <span className="semi-bold flex items-center justify-between">
        <h4>{group.title}</h4>

        <Activity
          mode={
            group.title === "Recent" && group.routes.length > 3
              ? "visible"
              : "hidden"
          }
        >
          <AppButton
            variant="tertiary"
            className="text-xs w-fit! text-gray-400"
            onClick={handleShowList}
          >
            View All
          </AppButton>
        </Activity>
      </span>

      <ul className="flex flex-col">
        {group.routes.slice(0, 3).map(({ id, path, label, icon: Icon }) => (
          <NavLink
            to={path}
            key={id}
            title={label}
            className={({ isActive }) =>
              `flex items-center gap-2 px-2 py-2 rounded-md transition-colors overflow-hidden whitespace-nowrap text-ellipsis ${
                isActive
                  ? "bg-[#1c1c1c] text-white"
                  : "text-gray-400 hover:bg-[#1a1a1a]"
              }`
            }
          >
            <li className="py-2 px-2 flex items-center gap-2">
              <Icon className="text-xl shrink-0" />
              <span>{label}</span>
            </li>
          </NavLink>
        ))}
      </ul>

      <Activity
        mode={
          group.title === "Recent" && group.routes.length === 0
            ? "visible"
            : "hidden"
        }
      >
        <span className="flex items-center gap-2 p-2 text-sm">
          <ImFilesEmpty /> <p>Notes Records Empty</p>
        </span>
      </Activity>
    </div>
  );
}
