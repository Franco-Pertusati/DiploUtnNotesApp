import "@/app/globals.css";
import FoldersContainer from "@/app/components/folders/foldersContainer/foldersContainer";

export default function FoldersPage() {
  return (
    <div className="overflow-y-auto h-full">
      <FoldersContainer />
    </div>
  );
}

export const metadata = {
  title: "Carpetas",
  description: "Descripción de la página carpetas",
};