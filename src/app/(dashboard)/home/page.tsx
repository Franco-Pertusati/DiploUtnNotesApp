import PageHeader from "@/app/components/page/page-header/page-header";
import Button from "@/app/components/ui/buttons/button/button";
import "@/app/globals.css";

export default function HomePage() {
  return (
    <div className="px-6 py-3 mx-auto max-w-7xl w-full flex flex-col gap-4">
      <PageHeader title="Inicio">
        <Button icon="settings" />
      </PageHeader>
      <div className="flex gap-3">
        <section className="grow">
          <h2 className="text-xl">Nota rapida</h2>
          <div className="bg-light rounded-xl w-full h-64 p-3">
            <span>Lo que escribas aqui se guardara con tus notas sueltas</span>
          </div>
        </section>
        <section className="grow">
          <h2 className="text-xl">Ultimo Album</h2>
          <div className="bg-light rounded-xl w-full h-64"></div>
        </section>
      </div>
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
