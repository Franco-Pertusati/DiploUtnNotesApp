import PageHeader from "@/app/components/page/page-header/page-header";
import Button from "@/app/components/ui/buttons/button/button";
import "@/app/globals.css";

export default function FlashcardsPage() {
  return (
    <div className="overflow-y-auto h-full">
      <div className="mx-auto max-w-7xl w-full flex flex-col h-full py-3 px-6 gap-3">
        <PageHeader title="Flashcards">
          <Button icon="cards_star" label="Practicar" variant="cta" />
        </PageHeader>
      </div>
    </div>
  );
}

// Opcional: Metadata para SEO
export const metadata = {
  title: "Flashcards",
  description: "Descripción de la página flashcards",
};