import { Note } from "@/app/api/notesApi";
import Button from "../../ui/buttons/button/button";

interface EditNoteDialogProps extends Note {
  onClose?: () => void;
}

const EditNoteDialog = (props: EditNoteDialogProps) => {
  const { title, content, onClose } = props;
  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex justify-between items-center">
        <span>{title}</span>
        <Button icon="close" onClick={onClose} />
      </div>
      <textarea className="focus:outline-none border-border border rounded p-2 grow resize-none" defaultValue={content}></textarea>
      <Button icon="check" label="Guardar cambios" variant="cta" />
    </div>
  );
};

export default EditNoteDialog;
