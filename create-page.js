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
const fileName = `${routeType}.jsx`;
const filePath = path.join(fullRoutePath, fileName);

// Verificar si ya existe
if (fs.existsSync(filePath)) {
  console.error(`❌ El archivo ${routeType}.jsx ya existe en /${routePath}`);
  process.exit(1);
}

// Crear carpeta si no existe
if (!fs.existsSync(fullRoutePath)) {
  fs.mkdirSync(fullRoutePath, { recursive: true });
}

// Templates para diferentes tipos de archivos
const templates = {
  page: (routeName) => `import "@/app/globals.css";

export default function ${routeName}Page() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">${routeName}</h1>
      <p>Esta es la página de ${routePath}</p>
    </div>
  );
}

// Opcional: Metadata para SEO
export const metadata = {
  title: "${routeName}",
  description: "Descripción de la página ${routePath}",
};`,

  layout: (routeName) => `export default function ${routeName}Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="layout-container">
      {/* Header específico para ${routePath} */}
      <header className="mb-6">
        <h2 className="text-xl font-semibold">${routeName} Layout</h2>
      </header>
      
      {/* Contenido de las páginas hijas */}
      <main>{children}</main>
      
      {/* Footer específico para ${routePath} */}
      <footer className="mt-6 pt-4 border-t">
        <p className="text-sm text-gray-600">Footer de ${routeName}</p>
      </footer>
    </div>
  );
}`,

  loading: () => `export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <span className="ml-3 text-lg">Cargando...</span>
    </div>
  );
}`,

  error: () => `"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
      <h2 className="text-2xl font-bold text-red-600 mb-4">¡Algo salió mal!</h2>
      <p className="text-gray-600 mb-4 text-center">
        {error.message || "Ha ocurrido un error inesperado"}
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Intentar nuevamente
      </button>
    </div>
  );
}`,

  "not-found": (routeName) => `export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">404</h2>
      <p className="text-xl text-gray-600 mb-4">Página no encontrada</p>
      <p className="text-gray-500 mb-6 text-center">
        La página que buscas en ${routePath} no existe o ha sido movida.
      </p>
      <a 
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Volver al inicio
      </a>
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

console.log(`✅ Archivo ${routeType}.jsx creado en app/${routePath}/`);
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