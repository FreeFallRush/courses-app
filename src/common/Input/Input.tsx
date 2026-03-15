import { InputProps } from "./Input.types";

function Input({
    labelText,
    placeholderText = "",
    value,
    type = "text",
    onChange,
    isInvalid = false,
}: InputProps) {
    return (
        <div>
            <label>
                {labelText}
                <input
                    type={type}
                    placeholder={placeholderText}
                    value={value}
                    onChange={onChange}
                />
            </label>
        </div>
    );
}

export default Input;
