import { Link } from "react-router-dom";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { AuthFormProps } from "./AuthForm.types";
import styles from "./AuthForm.module.css";

function AuthForm({
    title,
    fields,
    onSubmit,
    submitButtonText,
    bottomText,
    linkText,
    linkTo,
}: AuthFormProps) {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{title}</h3>
            <form className={styles.formContent} onSubmit={onSubmit}>
                <div>
                    {fields.map((field) => (
                        <div className={styles.inputGroup} key={field.name}>
                            <Input
                                labelText={field.label}
                                value={field.value}
                                onChange={(event) =>
                                    field.onChange(event.target.value)
                                }
                                placeholderText="Input text"
                                type={field.type || "text"}
                                isInvalid={!!field.error}
                            />
                            {field.error && (
                                <p className={styles.errorText}>
                                    {field.error}
                                </p>
                            )}
                        </div>
                    ))}
                    <Button buttonText={submitButtonText} />
                </div>
                {bottomText && (
                    <p className={styles.bottomText}>
                        {bottomText}
                        {linkText && linkTo && (
                            <Link to={linkTo} className={styles.link}>
                                {linkText}
                            </Link>
                        )}
                    </p>
                )}
            </form>
        </div>
    );
}

export default AuthForm;
