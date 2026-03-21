import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
import Header from "../Header/Header";
import { RegistrationFormErrors } from "../../types/formErrors";

import {
    validateName,
    validateEmail,
    validatePassword,
} from "../../helpers/getFormValidation";

import { useAppDispatch } from "../../store/hooks";
import { registerUser } from "../../store/user/thunk";

const Registration = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<RegistrationFormErrors>({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

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

        try {
            await dispatch(registerUser({ name, email, password })).unwrap();
            alert("Registration successful! Please log in.");
            navigate("/login");
        } catch (error: unknown) {
            alert(`Registration failed: ${error}`);
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
};

export default Registration;
