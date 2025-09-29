import "@/app/globals.css";
import Button from "@/app/components/ui/buttons/button/button";
import useDialog from "@/lib/dialogs/useDialog";
import ExampleModal from "@/app/components/ui/modal/ExampleModal";
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
  const dialog = useDialog();

  const openExample = () => {
    dialog.show(
      ExampleModal,
      {
        title: "Hola desde Sidebar",
        message: "Este diálogo fue abierto desde Sidebar.",
      },
      { backdrop: true }
    );
  };

  const openSearch = () => {
    dialog.show(SearchDialog, { backdrop: true });
  };

  return (
    <div className="w-56 h-full p-4 bg-dark flex flex-col border-r border-border">
      <div className="grow">
        <Button
          label="Mi perfil"
          icon="person"
          classList="w-full justify-start mb-4"
        />
        <Button
          label="Search"
          icon="search"
          classList="w-full justify-start"
          onClick={openSearch}
        />
        <div className="mb-4">
          {/* NAVEGACION DE PAGINAS */}
          {buttons.map((button, index) => (
            <div key={index} className="w-full">
              <Button
                label={button.label}
                icon={button.icon}
                variant="text"
                classList="w-full justify-start"
              />
            </div>
          ))}
        </div>
        <div>
          <span className="font-bold px-3">Recientes</span>
          <Button label="Crear album" icon="add" />
          <div className="mt-2">
            <Button
              label="Abrir diálogo"
              icon="open_in_new"
              onClick={openExample}
            />
          </div>
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
