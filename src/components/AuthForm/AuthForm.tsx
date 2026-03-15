import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { AuthFormProps } from "./AuthForm.types";

function AuthForm({
    title,
    fields,
    onSubmit,
    submitButtonText,
    bottomText,
    linkText,
    onLinkClick,
}: AuthFormProps) {
    return (
        <div>
            <h3>{title}</h3>
            <form onSubmit={onSubmit}>
                <div>
                    {fields.map((field) => (
                        <div key={field.name}>
                            <Input
                                labelText={field.label}
                                value={field.value}
                                onChange={(event) =>
                                    field.onChange(event.target.value)
                                }
                                placeholderText="Input text"
                                type={field.type || "text"}
                            />
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
}

export default AuthForm;
