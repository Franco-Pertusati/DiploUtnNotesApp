import useDialog from "@/lib/dialogs/useDialog";
import Button from "../../ui/buttons/button/button";

interface ConfirmActionDialogProps {
  message: string;
  onConfirm?: () => void;
}

const ConfirmActionDialog = ({
  message,
  onConfirm,
}: ConfirmActionDialogProps) => {
  const dialog = useDialog();

  function confirmAction() {
    onConfirm?.();
    dialog.closeAll();
  }

  return (
    <div className="flex flex-col gap-4 max-w-2xs">
      <span className="text-lg">{message}</span>
      <div className="flex justify-between w-full gap-2">
        <Button variant="danger" label="Confirmar" onClick={confirmAction} />
        <Button
          classList="grow"
          variant="secondary"
          label="Cancelar"
          onClick={dialog.closeAll}
        />
      </div>
    </div>
  );
};

export default ConfirmActionDialog;
