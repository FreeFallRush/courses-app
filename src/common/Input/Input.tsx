import { InputProps } from "./Input.types";

function Input({
    labelText,
    placeholderText = "",
    value,
    type = "text",
}: InputProps) {
    return (
        <div>
            <label>
                {labelText}
                <input
                    type={type}
                    placeholder={placeholderText}
                    value={value}
                />
            </label>
        </div>
    );
}

export default Input;
