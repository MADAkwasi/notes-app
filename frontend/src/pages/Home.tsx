export default function HomePage() {
  return (
    <section className="flex flex-col text-white text-center justify-center items-center w-full h-full gap-3 px-6">
      <img src="doc.png" alt="file" />
      <h2 className="text-3xl font-semibold">Select a note to view</h2>
      <p>
        Choose a note from the list on the left to view its contents, or create
        a new note to add to your collection.
      </p>
    </section>
  );
}
