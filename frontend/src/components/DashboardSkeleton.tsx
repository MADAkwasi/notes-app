import { type ReactElement } from "react";

export default function DashboardSkeleton(): ReactElement {
  return (
    <main className="flex w-screen h-screen bg-[#1a1a1a]">
      <section className="w-1/4 py-6 px-4 flex flex-col gap-4">
        <header className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="h-8 w-24 bg-[#1f1f1f] rounded"></div>
            <button className="w-fit bg-[#1f1f1f] rounded h-10 animate-pulse"></button>
          </div>
          <button className="w-full bg-[#1f1f1f] rounded h-10 animate-pulse"></button>
        </header>
        <div className="my-3 flex flex-col gap-4">
          <div className="h-36 bg-[#1f1f1f] rounded animate-pulse"></div>
          <div className="h-36 bg-[#1f1f1f] rounded animate-pulse"></div>
        </div>
        <div className="mt-auto flex items-center gap-3 justify-between">
          <span className="rounded-full bg-[#1e1e1e] h-12 w-12"></span>
          <span className="w-[calc(100%-4rem)] flex items-center justify-between">
            <div className="h-6 w-32 bg-[#1f1f1f] rounded animate-pulse"></div>
            <button className="w-fit bg-[#1f1f1f] rounded h-10 animate-pulse"></button>
          </span>
        </div>
      </section>
      <section className="w-3/4 bg-[#1f1f1f] animate-pulse h-full"></section>
    </main>
  );
}
