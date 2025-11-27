import NotesByEditDate from "@/app/components/notes/notesByEditDate/notesByEditDate";
import QuickNote from "@/app/components/notes/quickNote/quickNote";
import PageHeader from "@/app/components/page/page-header/page-header";
import Button from "@/app/components/ui/buttons/button/button";
import { NotesProvider } from "@/app/context/notesContext";
import "@/app/globals.css";

export default function HomePage() {
  return (
    <div className="overflow-y-auto h-full">
      <NotesProvider>
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
            <section className="w-1/2">
              <NotesByEditDate />
            </section>
            <section className="grow">
              <div className="bg-light rounded-xl w-full h-full"></div>
            </section>
          </div>
        </div>
      </NotesProvider>
    </div>
  );
}

export const metadata = {
  title: "Inicio",
  description: "Descripción de la página home",
};
