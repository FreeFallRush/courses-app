import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
import Header from "../Header/Header";
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

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

        const newUser = { name, email, password };

        try {
            const response = await fetch(
                "https://react-courses-app-1.onrender.com/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newUser),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Registration error data:", errorData);

                const errorMessage = Array.isArray(errorData.errors)
                    ? errorData.errors.join(", ")
                    : errorData.errors || errorData.message || "Unknown error";

                alert(`Registration failed: ${errorMessage}`);
                return;
            }
            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <>
            <Header />
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
                bottomText="If you have an account you may "
                linkText="Login"
                linkTo="/login"
            />
        </>
    );
}

export default Registration;
