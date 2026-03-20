import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import AuthForm from "../AuthForm/AuthForm";
import {
    validateEmail,
    validatePassword,
} from "../../helpers/getFormValidation";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/user/actions";
import { LoginFormErrors } from "../../types/formErrors";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<LoginFormErrors>({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser?.token) {
                navigate("/courses");
            }
        }
    }, [navigate]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

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

            const fullUser = {
                isAuth: true,
                token: result.result,
                email: userData.email,
                name: result.user?.name || "",
            };

            localStorage.setItem("user", JSON.stringify(fullUser));

            dispatch(setUser(fullUser));

            navigate("/courses");
        } catch (error) {
            console.error("Login error: ", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <Header />
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
                linkTo="/registration"
            />
        </>
    );
};

export default Login;
