import PageHeader from "@/app/components/page/page-header/page-header";
import Button from "@/app/components/ui/buttons/button/button";
import "@/app/globals.css";

export default function FoldersPage() {
  return (
    <div className="overflow-y-auto h-full">
      <div className="mx-auto max-w-7xl w-full flex flex-col h-full py-3 px-6 gap-3">
        <PageHeader title="Carpetas">
          <Button icon="upload" label="Upload file" variant="secondary" />
        </PageHeader>
      </div>
    </div>
  );
}

// Opcional: Metadata para SEO
export const metadata = {
  title: "Folders",
  description: "Descripción de la página folders",
};
