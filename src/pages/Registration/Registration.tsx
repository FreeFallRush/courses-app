import { useState } from "react";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";

function Registration() {
    const [name, setName] = useState("");

    return (
        <div>
            <h3>Registration</h3>
            <form>
                <Input
                    labelText="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholderText="Input text"
                />
                <Button buttonText="Login" />
                <p>
                    If you have an account you may <strong>Login</strong>
                </p>
            </form>
        </div>
    );
}

export default Registration;
