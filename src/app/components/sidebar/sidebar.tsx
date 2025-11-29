"use client";

import "@/app/globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/app/components/ui/buttons/button/button";
import useDialog from "@/lib/dialogs/useDialog";
import SearchDialog from "./dialogs/searchDialog/searchDialog";
import { useState } from "react";
import ProfileDialog from "../dialogs/profileDialog/profileDialog";

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
  const [isOpen, setIsOpen] = useState(true);

  const openSearch = () => {
    dialog.show(SearchDialog);
  };

  const openProfile = () => {
    dialog.show(ProfileDialog);
  };

  const isActive = (route: string) => pathname.includes(route);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`h-full p-4 bg-neutral flex flex-col transition-all duration-100 ease-in text-nowrap pt-8 ${
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
            onClick={openProfile}
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
              className={`flex items-center gap-2 w-full p-1.5 rounded ${
                isActive(button.route) ? "bg-text text-dark" : ""
              }`}
            >
              <i className="material-symbols-rounded">{button.icon}</i>
              {isOpen && <span>{button.label}</span>}
            </Link>
          ))}
        </div>

        <div className="flex flex-col">
          <button
            className={`w-9 h-9 flex items-center gap-2 rounded-full ${
              isOpen
                ? "bg-transparent text-main-300  px-1.5"
                : "bg-main-300 text-dark justify-center hover:bg-main-200"
            }`}
          >
            <i className="material-symbols-rounded">add</i>
            {isOpen && <span>Crear</span>}
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <Link
          href={"new-features"}
          className="flex items-center gap-2 w-full p-1.5 rounded"
        >
          <i className="material-symbols-rounded">campaign</i>
          {isOpen && <span>Novedades</span>}
        </Link>
        <Link
          href={"trash"}
          className="flex items-center gap-2 w-full p-1.5 rounded"
        >
          <i className="material-symbols-rounded">delete</i>
          {isOpen && <span>Papelera</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
