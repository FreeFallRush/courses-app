import { FaTrash, FaPlus } from "react-icons/fa";
import { AuthorItemProps } from "./AuthorItem.types";
function AuthorItem({ name, onAdd, onDelete }: AuthorItemProps) {
    return (
        <div>
            <span>{name}</span>
            {onAdd && (
                <button onClick={onAdd}>
                    <FaPlus />
                </button>
            )}

            {onDelete && (
                <button onClick={onDelete}>
                    <FaTrash />
                </button>
            )}
        </div>
    );
}

export default AuthorItem;
