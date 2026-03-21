import { FaTrash, FaPlus } from "react-icons/fa";
import { AuthorItemProps } from "./AuthorItem.types";
import styles from "./AuthorItem.module.css";

const AuthorItem = ({ name, onAdd, onDelete }: AuthorItemProps) => {
    return (
        <div className={styles.itemContainer}>
            <span className={styles.name}>{name}</span>
            {onAdd && (
                <button onClick={onAdd} className={styles.iconButton}>
                    <FaPlus />
                </button>
            )}
            {onDelete && (
                <button onClick={onDelete} className={styles.iconButton}>
                    <FaTrash />
                </button>
            )}
        </div>
    );
};
export default AuthorItem;
