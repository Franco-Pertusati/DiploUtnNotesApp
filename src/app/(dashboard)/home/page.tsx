import PageHeader from "@/app/components/page/page-header/page-header";
import Button from "@/app/components/ui/buttons/button/button";
import "@/app/globals.css";

export default function HomePage() {
  return (
    <div className="px-6 py-3 mx-auto max-w-7xl w-full flex flex-col gap-4">
      <PageHeader title="Inicio">
        <Button label="Nuevo Album" variant="cta" icon="add" />
      </PageHeader>
      <section>
        <h2 className="text-xl">Nota rapida</h2>
      </section>
      <section>
        <h2 className="text-xl">Albumes Recientes</h2>
      </section>
      <section>
        <h2 className="text-xl">Notas sueltas</h2>
      </section>
    </div>
  );
}

// Opcional: Metadata para SEO
export const metadata = {
  title: "Home",
  description: "Descripción de la página home",
};
