import "@/app/globals.css";
import FoldersContainer from "@/app/components/folders/foldersContainer/foldersContainer";
import { Suspense } from "react";

export default function FoldersPage() {
  return (
    <div className="overflow-y-auto h-full">
      <Suspense>
        <FoldersContainer />
      </Suspense>
    </div>
  );
}

export const metadata = {
  title: "Carpetas",
  description: "Descripción de la página carpetas",
};
