import { Folder } from "@/app/api/foldersApi";
import Button from "../../ui/buttons/button/button";

interface FolderItemProps {
  folder: Folder;
  onOpen?: (folder: Folder) => void;
  onDelete?: (folder: Folder, e: React.MouseEvent) => void;
  onEdit?: (folder: Folder, e: React.MouseEvent) => void;
  showActions?: boolean;
}

export default function FolderItem({
  folder,
  onOpen,
  onDelete,
  onEdit,
  showActions = true,
}: FolderItemProps) {
  return (
    <div className="px-2 hover:bg-gray-50 cursor-pointer rounded-lg group hover:bg-neutral">
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2 items-center">
          <i className="material-symbols-rounded">folder</i>
          <button
            className="font-medium truncate text-left"
            onClick={() => onOpen?.(folder)}
          >
            {folder.name}
          </button>
        </div>
        <div className="flex items-center gap-2">
          {showActions && (
            <div className="flex gap-1 opacity-0 group-hover:opacity-100">
              {onDelete && (
                <Button
                  icon="delete"
                  onClick={(e) => onDelete(folder, e)}
                />
              )}
              {onEdit && (
                <Button
                  icon="edit"
                  onClick={(e) => onEdit(folder, e)}
                />
              )}
            </div>
          )}
          <p className="text-gray-500 text-sm">
            {new Date(folder.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}