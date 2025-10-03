import "@/app/globals.css";
import DsCards from "./ds-cards/ds-cards";
import PageHeader from "@/app/components/page/page-header/page-header";
import Button from "@/app/components/ui/buttons/button/button";
import DsButtons from "./ds-buttons/ds-buttons";

export default function DesingSystemPage() {
  return (
    <div className="px-6 py-3 mx-auto max-w-7xl w-full flex flex-col gap-4">
      <PageHeader title="Desing System">
        <Button variant="cta" label="Create Note" icon="add" />
      </PageHeader>
      <div className="flex flex-col gap-12">
        <DsCards />
        <DsButtons />
      </div>
    </div>
  );
}

// Opcional: Metadata para SEO
export const metadata = {
  title: "Desing-system",
  description: "Descripción de la página desing-system",
};
