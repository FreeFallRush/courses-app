import { useState } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import Header from "../../components/Header/Header";
import {
    validateName,
    validateEmail,
    validatePassword,
} from "../../helpers/getFormValidation";

function Registration() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = {
            name: validateName(name),
            email: validateEmail(email),
            password: validatePassword(password),
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(
            (error) => error !== ""
        );
        if (hasErrors) return;

        console.log({ name: "", email: "", password: "" });
    };

    return (
        <>
            <Header showLogout={false} />
            <AuthForm
                title="Registration"
                fields={[
                    {
                        label: "Name",
                        name: "name",
                        value: name,
                        onChange: setName,
                        error: errors.name,
                    },
                    {
                        label: "Email",
                        name: "email",
                        value: email,
                        onChange: setEmail,
                        error: errors.email,
                        type: "email",
                    },
                    {
                        label: "Password",
                        name: "password",
                        value: password,
                        onChange: setPassword,
                        error: errors.password,
                        type: "password",
                    },
                ]}
                onSubmit={handleSubmit}
                submitButtonText="Login"
                bottomText="If you have an account you may"
                linkText="Login"
                onLinkClick={() => {}}
            />
        </>
    );
}

export default Registration;
