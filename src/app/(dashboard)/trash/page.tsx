import PageHeader from "@/app/components/page/page-header/page-header";
import "@/app/globals.css";

export default function trash() {
  return (
    <div className="overflow-y-auto h-full">
      <div className="mx-auto max-w-7xl w-full flex flex-col h-full py-3 px-6 gap-3">
        <PageHeader title="Papelera" />
      </div>
      <div>
        
      </div>
    </div>
  );
}

export const metadata = {
  title: "Papelera",
  description: "Descripción de la página new-features",
};
