import type { ReactElement } from "react";
import AppButton from "./Button";
import type { NavigationGroup } from "../utils/interfaces/navigation.interface";
import { NavLink } from "react-router-dom";

interface OptionProps {
  group: NavigationGroup;
}

export default function NavigationOption({
  group,
}: Readonly<OptionProps>): ReactElement {
  return (
    <div className="text-gray-400 flex flex-col gap-2">
      <span className="semi-bold flex items-center justify-between">
        <h4>{group.title}</h4>

        {group.title === "Recent" && (
          <AppButton
            variant="tertiary"
            className="text-xs w-fit! text-gray-400"
          >
            View All
          </AppButton>
        )}
      </span>

      <ul className="flex flex-col gap-1">
        {group.routes.map(({ id, path, label, icon: Icon }) => (
          <NavLink
            to={path}
            key={id}
            className={({ isActive }) =>
              `flex items-center gap-2 px-2 py-2 rounded-md transition-colors ${
                isActive
                  ? "bg-[#1c1c1c] text-white" // active styles
                  : "text-gray-400 hover:bg-[#1a1a1a]" // default styles
              }`
            }
          >
            <li className="py-2 px-2 flex items-center gap-2">
              <Icon className="text-xl" />
              {label}
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}
