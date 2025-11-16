import PageHeader from "@/app/components/page/page-header/page-header";
import Button from "@/app/components/ui/buttons/button/button";
import "@/app/globals.css";

export default function FoldersPage() {
  return (
    <div className="overflow-y-auto h-full">
      <div className="mx-auto max-w-7xl w-full flex flex-col h-full py-3 px-6 gap-3">
        <PageHeader title="Carpetas">
          <Button icon="folder" label="Nueva carpeta" variant="secondary" />
          <Button icon="note" label="Nuevo documento" variant="secondary" />
        </PageHeader>
        <div>
          <Button icon="check" label="Probar verificacion" variant="cta" />
        </div>
      </div>
    </div>
  );
}

// Opcional: Metadata para SEO
export const metadata = {
  title: "Carpetas",
  description: "Descripción de la página folders",
};
