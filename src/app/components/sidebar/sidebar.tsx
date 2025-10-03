"use client";

import "@/app/globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/app/components/ui/buttons/button/button";
import useDialog from "@/lib/dialogs/useDialog";
import SearchDialog from "./dialogs/searchDialog/searchDialog";

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

  const openSearch = () => {
    dialog.show(SearchDialog, { backdrop: true });
  };

  const isActive = (route: string) => pathname.includes(route);

  return (
    <div className="w-56 h-full p-4 bg-neutral flex flex-col">
      <div className="grow flex flex-col gap-1">
        <div>
          <Link href="/profile" className="block">
            <Button
              label="Mi perfil"
              icon="person"
              classList="w-full justify-start mb-4"
            />
          </Link>

          <Button
            label="Search"
            icon="search"
            classList="w-full justify-start mb-4"
            onClick={openSearch}
          />
        </div>

        <div className="mb-4 flex flex-col gap-1">
          {buttons.map((button, index) => (
            <Link href={button.route} key={index} className="block w-full">
              <Button
                label={button.label}
                icon={button.icon}
                variant={isActive(button.route) ? "cta" : "text"}
                classList="w-full justify-start"
              />
            </Link>
          ))}
        </div>

        <div>
          <span className="font-bold px-3">Recientes</span>
          <Button label="Crear album" icon="add" />
        </div>
      </div>

      <div>
        <Button
          label="Novedades"
          icon="campaign"
          classList="w-full justify-start"
        />
        <Button
          label="Papelera"
          icon="delete"
          classList="w-full justify-start"
        />
        <Button
          label="Configuración"
          icon="settings"
          classList="w-full justify-start"
        />
      </div>
    </div>
  );
};

export default Sidebar;
