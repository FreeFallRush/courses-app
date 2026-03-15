import Logo from "./components/Logo/Logo";
import Button from "../../common/Button/Button";
import { HeaderProps } from "./Header.types";
import styles from "./Header.module.css";

function Header({ showLogout = true, userName }: HeaderProps) {
    return (
        <header className={styles.header}>
            <Logo />
            {showLogout && <div>{userName && <span>{userName}</span>}</div>}
            <Button buttonText="Logout" />
        </header>
    );
}

export default Header;
