import type { ReactElement } from "react";
import { useMediaQuery } from "../utils/hooks/useMediaQuery";

export default function NoteItemSkeleton(): ReactElement {
  const isTablet = useMediaQuery("(min-width: 768px)");
  const skeletonCount = isTablet ? 8 : 4;

  return (
    <>
      {Array(skeletonCount)
        .fill(null)
        .map((_, index) => (
          <div
            className="bg-[#1c1c1c] px-3 py-2 rounded-lg flex flex-col gap-5"
            key={index + 1}
          >
            <span className="flex items-center justify-between gap-2">
              <h4 className="w-1/2 h-6 bg-gray-500 rounded animate-pulse"></h4>
              <button
                className="w-8 h-8 bg-gray-500 rounded-full animate-pulse"
                aria-label="Favorite button"
              ></button>
            </span>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="w-24 h-4 bg-gray-500 rounded animate-pulse"></span>
              <p className="flex-1 h-4 bg-gray-500 rounded animate-pulse"></p>
            </div>
          </div>
        ))}
    </>
  );
}
