import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import AuthForm from "../AuthForm/AuthForm";
import {
    validateEmail,
    validatePassword,
} from "../../helpers/getFormValidation";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginUser } from "../../store/user/thunk";
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
    const user = useAppSelector((state) => state.user);

    useEffect(() => {
        if (user.isAuth) {
            navigate("/courses");
        }
    }, [user.isAuth, navigate]);

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

        try {
            await dispatch(loginUser({ email, password })).unwrap();
            navigate("/courses");
        } catch (error: unknown) {
            alert(`Login failed: ${error}`);
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
