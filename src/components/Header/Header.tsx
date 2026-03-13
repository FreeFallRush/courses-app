import Logo from "./components/Logo/Logo";
import Button from "../../common/Button/Button";
import styles from "./Header.module.css";

function Header() {
    return (
        <header className={styles.header}>
            <Logo />
            <Button buttonText="Logout" />
        </header>
    );
}

export default Header;
