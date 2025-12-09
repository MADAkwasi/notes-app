import { TbTrashOff } from "react-icons/tb";

export default function RecycleBinPage() {
  return (
    <section className="flex flex-col text-white text-center justify-center items-center w-full h-full gap-3 px-6 bg-[#121212]">
      <TbTrashOff className="text-white text-6xl" />
      <h2 className="text-3xl font-semibold">Recycle Bin is empty</h2>
    </section>
  );
}
