"use client";
import Sidebar from "../components/sidebar/sidebar";

export default function Dashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full bg-dark flex">
      <Sidebar
        buttons={[
          { label: "Inicio", icon: "home", route: "home" },
          { label: "Albums", icon: "collections_bookmark", route: "albums" },
          { label: "Habitos", icon: "relax", route: "habits" },
        ]}
      />
      { children }
    </div>
  );
}
