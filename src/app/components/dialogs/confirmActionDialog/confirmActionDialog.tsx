import useDialog from "@/lib/dialogs/useDialog";
import Button from "../../ui/buttons/button/button";

interface ConfirmActionDialogProps {
  message: string;
  onConfirm?: () => void;
}

const ConfirmActionDialog = ({ message, onConfirm }: ConfirmActionDialogProps) => {
  const dialog = useDialog();

  function confirmAction() {
    onConfirm?.();
    dialog.closeAll();
  }

  return (
    <div className="flex flex-col gap-2 max-w-2xs">
      <span className="text-lg">{message}</span>
      <div className="flex justify-between w-full">
        <Button
          variant="secondary"
          label="Cancelar"
          onClick={dialog.closeAll}
        />
        <Button variant="cta" label="Confirmar" onClick={confirmAction} />
      </div>
    </div>
  );
};

export default ConfirmActionDialog;
