"use client";
import Sidebar from "./components/sidebar/sidebar";

export default function Home() {
  return (
    <div className="h-screen w-full bg-dark">
      <Sidebar
        buttons={[
          { label: "Inicio", icon: "home", route: "home" },
          { label: "Albums", icon: "collections_bookmark", route: "albums" },
          { label: "Habitos", icon: "relax", route: "habits" },
        ]}
      />
    </div>
  );
}
