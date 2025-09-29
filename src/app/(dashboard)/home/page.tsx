import "@/app/globals.css";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Inicio
        </h1>
        <div className="bg-white rounded-lg shadow-sm border border-border p-6">
          <p>
            Esta es la página de home
          </p>
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