import "@/app/globals.css";

export default function TrashBinPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          TrashBin
        </h1>
        <div className="bg-white rounded-lg shadow-sm border border-border p-6">
          <p className="text-gray-600">
            Esta es la página de trashBin
          </p>
        </div>
      </div>
    </div>
  );
}

// Opcional: Metadata para SEO
export const metadata = {
  title: "TrashBin",
  description: "Descripción de la página trashBin",
};