import { useState } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";

function Registration() {
    const [name, setName] = useState("");

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
                ]}
            />
        </div>
    );
}

export default Registration;
