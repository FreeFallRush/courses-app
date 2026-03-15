import { useState } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";

function Registration() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <AuthForm
                title="Registration"
                fields={[
                    {
                        label: "Name",
                        name: "name",
                        value: name,
                        onChange: setName,
                    },
                    {
                        label: "Email",
                        name: "email",
                        value: email,
                        onChange: setEmail,
                    },
                    {
                        label: "Password",
                        name: "password",
                        value: password,
                        onChange: setPassword,
                    },
                ]}
            />
        </div>
    );
}

export default Registration;
