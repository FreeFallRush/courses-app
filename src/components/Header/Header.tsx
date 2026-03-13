import Logo from "./components/Logo/Logo";
import Button from "../../common/Button/Button";
function Header() {
    return (
        <>
            <Logo />
            <Button buttonText="Logout" />
        </>
    );
}

export default Header;
