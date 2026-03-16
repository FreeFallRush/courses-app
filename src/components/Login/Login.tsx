import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

        const userData = { email, password };

        try {
            const response = await fetch(
                "https://react-courses-app-1.onrender.com/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                }
            );

            const result = await response.json();

            if (!response.ok || !result?.result) {
                alert(
                    "Login failed: " + (result.errors || "Invalid credentials")
                );
                return;
            }
            localStorage.setItem("token", result.result);

            if (result.user?.name) {
                localStorage.setItem("userName", result.user.name);
            }
            navigate("/courses");
        } catch (error) {
            console.error("Login error: ", error);
            alert("An error occurred. Please try again.");
        }
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
                bottomText="If you don't have an account you may "
                linkText="Registration"
                linkTo="/registration"
            />
        </>
    );
}

export default Login;
