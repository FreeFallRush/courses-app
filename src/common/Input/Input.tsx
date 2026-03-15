import { InputProps } from "./Input.types";
import styles from "./Input.module.css";

function Input({
    labelText,
    placeholderText = "",
    value,
    type = "text",
    onChange,
    isInvalid = false,
}: InputProps) {
    return (
        <div className={styles.inputContainer}>
            <label className={styles.label}>
                {labelText}
                <input
                    type={type}
                    placeholder={placeholderText}
                    value={value}
                    onChange={onChange}
                    className={`${styles.input} ${isInvalid ? styles.invalid : ""}`}
                />
            </label>
        </div>
    );
}

export default Input;
