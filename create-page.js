const fs = require("fs");
const path = require("path");

const inputPath = process.argv[2];
const routeType = process.argv[3] || "page"; // page, layout, loading, error, not-found

if (!inputPath) {
  console.error("❌ Por favor proporciona una ruta");
  console.error("Uso: node create-route.js <ruta> [tipo]");
  console.error("Ejemplo: node create-route.js dashboard/settings page");
  console.error("Tipos disponibles: page, layout, loading, error, not-found");
  process.exit(1);
}

// Validar tipo de archivo
const validTypes = ["page", "layout", "loading", "error", "not-found"];
if (!validTypes.includes(routeType)) {
  console.error(`❌ Tipo inválido. Usa uno de: ${validTypes.join(", ")}`);
  process.exit(1);
}

// Normalizar ruta
const routePath = inputPath.startsWith("/") ? inputPath.slice(1) : inputPath;
const routeSegments = routePath.split("/").filter(Boolean);

// Directorio base (app directory)
const baseDir = path.join(__dirname, "src/app");
const fullRoutePath = path.join(baseDir, ...routeSegments);
const fileName = `${routeType}.tsx`; // Cambiado a .tsx
const filePath = path.join(fullRoutePath, fileName);

// Verificar si ya existe
if (fs.existsSync(filePath)) {
  console.error(`❌ El archivo ${routeType}.tsx ya existe en /${routePath}`);
  process.exit(1);
}

// Crear carpeta si no existe
if (!fs.existsSync(fullRoutePath)) {
  fs.mkdirSync(fullRoutePath, { recursive: true });
}

// Templates para diferentes tipos de archivos con TypeScript y Tailwind
const templates = {
  page: (routeName) => `import "@/app/globals.css";

export default function ${routeName}Page() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          ${routeName}
        </h1>
        <div className="bg-white rounded-lg shadow-sm border border-border p-6">
          <p className="text-gray-600">
            Esta es la página de ${routePath}
          </p>
        </div>
      </div>
    </div>
  );
}

// Opcional: Metadata para SEO
export const metadata = {
  title: "${routeName}",
  description: "Descripción de la página ${routePath}",
};`,

  layout: (routeName) => `import { ReactNode } from "react";

interface ${routeName}LayoutProps {
  children: ReactNode;
}

export default function ${routeName}Layout({ children }: ${routeName}LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header específico para ${routePath} */}
      <header className="bg-white border-b border-gray-200 mb-6">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-gray-900">
            ${routeName}
          </h2>
        </div>
      </header>
      
      {/* Contenido de las páginas hijas */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      
      {/* Footer específico para ${routePath} */}
      <footer className="mt-auto border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">
            Footer de ${routeName}
          </p>
        </div>
      </footer>
    </div>
  );
}`,

  loading: () => `export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      <p className="text-lg font-medium text-gray-700">
        Cargando...
      </p>
    </div>
  );
}`,

  error: () => `"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            ¡Algo salió mal!
          </h2>
          <p className="text-gray-600">
            {error.message || "Ha ocurrido un error inesperado"}
          </p>
        </div>
        
        <button
          onClick={() => reset()}
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Intentar nuevamente
        </button>
      </div>
    </div>
  );
}`,

  "not-found": (routeName) => `import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-gray-900">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700">
            Página no encontrada
          </h2>
          <p className="text-gray-500 mt-4">
            La página que buscas en <span className="font-medium">${routePath}</span> no existe o ha sido movida.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Volver al inicio
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Página anterior
          </button>
        </div>
      </div>
    </div>
  );
}`
};

// Generar nombre para el componente
const routeName = routeSegments
  .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
  .join("");

// Crear contenido del archivo
const template = templates[routeType];
const fileContent = template(routeName || "Default");

// Escribir archivo
fs.writeFileSync(filePath, fileContent);

console.log(`✅ Archivo ${routeType}.tsx creado en app/${routePath}/`);
console.log(`📁 Ruta completa: ${filePath}`);

// Mostrar información adicional según el tipo
switch (routeType) {
  case "page":
    console.log(`🌐 Accesible en: http://localhost:3000/${routePath}`);
    break;
  case "layout":
    console.log(`🎯 Layout aplicará a todas las rutas bajo /${routePath}`);
    break;
  case "loading":
    console.log(`⏳ Se mostrará mientras cargan las páginas de /${routePath}`);
    break;
  case "error":
    console.log(`🚨 Se mostrará cuando hay errores en /${routePath}`);
    break;
  case "not-found":
    console.log(`🔍 Se mostrará para rutas no encontradas bajo /${routePath}`);
    break;
}