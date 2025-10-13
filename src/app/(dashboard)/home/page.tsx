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
            <div className="bg-light rounded-xl w-full h-64 p-3">
              <span className="text-muted">
                Nota rapida: Lo que escribas aqui se guardara con tus notas sin
                clasificar
              </span>
            </div>
          </section>
          <section className="grow">
            <div className="bg-main-300 rounded-xl w-full h-64 grid place-items-center">
              <span className="text-dark font-bold text-2xl">Ultimo album</span>
            </div>
          </section>
        </div>
        <div className="grow flex gap-3">
          <section className="grow">
            <div className="bg-light rounded-xl w-full h-full">
              
            </div>
          </section>
          <section className="grow">
            <div className="bg-light rounded-xl w-full h-full" style={{ height: '300vh' }}>
              
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// Opcional: Metadata para SEO
export const metadata = {
  title: "Home",
  description: "Descripción de la página home",
};
