import { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import Header from "../Header/Header";
import {
    validateEmail,
    validatePassword,
} from "../../helpers/getFormValidation";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = {
            email: validateEmail(email),
            password: validatePassword(password),
        };
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(
            (error) => error !== ""
        );
        if (hasErrors) return;

        console.log({ email: "", password: "" });
    };

    return (
        <>
            <Header showLogout={false} />
            <AuthForm
                title="Login"
                fields={[
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
                bottomText="If you don't have an account you may"
                linkText="Registration"
                onLinkClick={() => {}}
            />
        </>
    );
}

export default Login;
