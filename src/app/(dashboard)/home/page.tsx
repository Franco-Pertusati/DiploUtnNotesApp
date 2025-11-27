import FlashcardsList from "@/app/components/flashcards/flashcardsList/flashcardsList";
import NotesByEditDate from "@/app/components/notes/notesByEditDate/notesByEditDate";
import QuickNote from "@/app/components/notes/quickNote/quickNote";
import PageHeader from "@/app/components/page/page-header/page-header";
import Button from "@/app/components/ui/buttons/button/button";
import "@/app/globals.css";

export default function HomePage() {
  return (
    <div className="overflow-y-auto h-full">
      <div className="mx-auto max-w-7xl w-full flex flex-col h-full py-3 px-6 gap-3">
        <PageHeader title="Inicio">
          <Button icon="upload" label="Upload file" variant="secondary" />
        </PageHeader>
        <div className="flex gap-3">
          <section className="grow">
            <QuickNote />
          </section>
          <section>
            <button className="bg-main-300 rounded-xl min-w-64 h-64 grid place-items-center">
              <span className="text-dark font-bold text-2xl">
                Repasar flashcards
              </span>
            </button>
          </section>
        </div>
        <div className="grow flex gap-3">
          <section className="w-1/2 flex flex-col gap-2">
            <h2 className="text-lg font-semibold mb-2">Notas recientes</h2>
            <NotesByEditDate />
          </section>
          <section className="grow flex flex-col gap-2">
            <h2 className="text-lg font-semibold mb-2">Notas con flashcards</h2>
            <FlashcardsList />
          </section>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Inicio",
  description: "Descripción de la página home",
};
