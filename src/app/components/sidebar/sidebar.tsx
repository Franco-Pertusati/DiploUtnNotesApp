"use client";

import "@/app/globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/app/components/ui/buttons/button/button";
import useDialog from "@/lib/dialogs/useDialog";
import SearchDialog from "./dialogs/searchDialog/searchDialog";
import { useState } from "react";

interface SidebarButton {
  label: string;
  icon: string;
  route: string;
}

interface SidebarProps {
  buttons: SidebarButton[];
}

const Sidebar: React.FC<SidebarProps> = ({ buttons }) => {
  const pathname = usePathname();
  const dialog = useDialog();
  const [isOpen, setIsOpen] = useState(true); // ✅ Usa useState

  const openSearch = () => {
    dialog.show(SearchDialog, { backdrop: true });
  };

  const isActive = (route: string) => pathname.includes(route);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev); // ✅ Actualiza el estado correctamente
  };

  return (
    <div
      className={`h-full p-4 bg-neutral flex flex-col transition-all duration-100 ease-in text-nowrap ${
        isOpen ? "w-60" : "w-18"
      }`}
    >
      <div className="grow flex flex-col">
        <div className="flex gap-2 items-center mb-4">
          <Button icon="menu" onClick={toggleSidebar} isSidebar={true} />
          {isOpen && <span className="font-bold text-xl">NotesApp</span>}
        </div>

        <div className="flex flex-col mb-4">
          <Button
            label="Mi perfil"
            icon="person"
            classList="w-full justify-start bg-light"
            showLabel={isOpen}
            isSidebar={true}
          />
          <Button
            label="Search"
            icon="search"
            classList="w-full justify-start bg-light"
            onClick={openSearch}
            showLabel={isOpen}
            isSidebar={true}
          />
        </div>

        <div className="mb-4 flex flex-col gap-1">
          {buttons.map((button, index) => (
            <Link
              href={button.route}
              key={index}
              className={`flex items-center gap-2 w-full p-1.5 rounded ${isActive(button.route)? 'bg-text text-dark' : ''}`}
            >
              <i className="material-symbols-rounded">{button.icon}</i>
              {isOpen && <span>{button.label}</span>}
            </Link>
          ))}
        </div>

        <div className="flex flex-col">
          {isOpen && <span className="font-bold px-3">Recientes</span>}
          <Button label="Crear album" icon="add" showLabel={isOpen} />
        </div>
      </div>

      <div className="flex flex-col">
        <Button
          label="Novedades"
          icon="campaign"
          classList="w-full justify-start bg-light"
          showLabel={isOpen}
          isSidebar={true}
        />
        <Button
          label="Papelera"
          icon="delete"
          classList="w-full justify-start bg-light"
          showLabel={isOpen}
          isSidebar={true}
        />
        <Button
          label="Configuración"
          icon="settings"
          classList="w-full justify-start bg-light"
          showLabel={isOpen}
          isSidebar={true}
        />
      </div>
    </div>
  );
};

export default Sidebar;
