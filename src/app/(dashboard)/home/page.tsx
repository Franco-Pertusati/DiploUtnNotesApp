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
            <textarea
              name=""
              id=""
              placeholder="Nota rapida: Lo que escribas aqui se guardara con tus notas sin clasificar"
              className="border-border border rounded-xl p-2 grow resize-none bg-neutral w-full h-full"
            ></textarea>
          </section>
          <section>
            <button className="bg-main-300 rounded-xl min-w-64 h-64 grid place-items-center">
              <span className="text-dark font-bold text-2xl">
                Ultima carpeta
              </span>
            </button>
          </section>
        </div>
        <div className="grow flex gap-3">
          <section className="grow">
            <div className="bg-light rounded-xl w-full h-full"></div>
          </section>
          <section className="grow">
            <div
              className="bg-light rounded-xl w-full h-full"
              style={{ height: "300vh" }}
            ></div>
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
