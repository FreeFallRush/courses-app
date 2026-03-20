import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./components/Logo/Logo";
import Button from "../../common/Button/Button";

import styles from "./Header.module.css";

function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");

    const isAuthPage =
        location.pathname === "/login" || location.pathname === "/registration";

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        navigate("/login");
    };

    return (
        <header className={styles.header}>
            <Logo />
            {token && !isAuthPage && (
                <div className={styles.userInfo}>
                    {userName && (
                        <span className={styles.userName}>{userName}</span>
                    )}
                    <Button buttonText="Logout" onClick={handleLogout} />
                </div>
            )}
        </header>
    );
}

export default Header;
