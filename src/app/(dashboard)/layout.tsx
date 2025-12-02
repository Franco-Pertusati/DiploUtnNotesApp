"use client";
import Sidebar from "../components/sidebar/sidebar";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full bg-neutral flex relative">
      <Sidebar
        buttons={[
          { label: "Inicio", icon: "home", route: "home" },
          { label: "Carpetas", icon: "folder", route: "folders" },
          { label: "Flashcards", icon: "cards_star", route: "flashcards" },
        ]}
      />
      <main className="w-full h-screen overflow-hidden pt-4">
        <div className="bg-dark rounded-tl-4xl relative h-full">{children}</div>
      </main>
    </div>
  );
}
 