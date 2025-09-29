const fs = require("fs");
const path = require("path");

// Obtener ruta desde argumentos
const inputPath = process.argv[2];

if (!inputPath) {
  console.error("❌ Por favor proporciona un nombre/ruta para el componente");
  process.exit(1);
}

// Normalizar ruta y separar nombre
const parts = inputPath.split("/").filter(Boolean);
const rawName = parts.pop(); // lo que escribiste como nombre del archivo y carpeta

// Convertir a PascalCase solo para el nombre del componente/clase
const toPascalCase = (str) =>
  str
    .replace(/[-_]+/g, " ")
    .replace(/\s(.)/g, (match) => match.toUpperCase())
    .replace(/\s/g, "")
    .replace(/^(.)/, (match) => match.toUpperCase());

const componentName = toPascalCase(rawName); // nombre de clase/componente

// Reconstruir ruta
const relativeDir = parts.join("/"); // mantiene subrutas si existen
const baseDir = path.join(__dirname, "src", "app", "components");
const componentDir = path.join(baseDir, relativeDir, rawName); // carpeta sin transformar

// Ruta del archivo TSX con el nombre original
const tsxFile = path.join(componentDir, `${rawName}.tsx`);

// Verificar si ya existe
if (fs.existsSync(componentDir)) {
  console.error("❌ Ese componente ya existe");
  process.exit(1);
}

// Crear carpeta
fs.mkdirSync(componentDir, { recursive: true });

// Boilerplate con Tailwind y nombre en PascalCase
const tsxTemplate = `const ${componentName} = () => {
  return (
    <div className="p-4">
      <span className="text-gray-700">${componentName} works!</span>
    </div>
  );
};

export default ${componentName};
`;

// Crear archivo
fs.writeFileSync(tsxFile, tsxTemplate);

console.log(`✅ Componente ${componentName} creado en ${componentDir}`);
