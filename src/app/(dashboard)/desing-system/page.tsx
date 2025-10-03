import "@/app/globals.css";
import DsButtons from "./ds-buttons/ds-buttons";

export default function DesingSystemPage() {
  return (
    <div className="px-6 py-4 mx-auto max-w-7xl w-full h-screen">
      <div>
        <h1 className="text-4xl text-center font-medium">Desing System</h1>
      </div>
      <DsButtons />
    </div>
  );
}

// Opcional: Metadata para SEO
export const metadata = {
  title: "Desing-system",
  description: "Descripción de la página desing-system",
};
