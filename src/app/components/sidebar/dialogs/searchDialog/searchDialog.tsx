import Button from "@/app/components/ui/buttons/button/button";

const SearchDialog = ({ onClose }: { onClose?: () => void }) => {
  return (
    <div className="max-w-xl flex flex-col gap-2">
      <h2 className="text-center font-bold text-xl">Borrar todo</h2>
      <span>¿Esta seguro de que quiere borrar todo?</span>
      <div className="flex flex-row-reverse gap-2 w-full">
        <Button label="Si, borrar todo" variant="danger" onClick={onClose} />
        <Button label="Cancelar" variant="secondary" onClick={onClose} />
      </div>
    </div>
  );
};

export default SearchDialog;
