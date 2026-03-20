import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeUser } from "../../store/user/actions";
import Logo from "./components/Logo/Logo";
import Button from "../../common/Button/Button";

import styles from "./Header.module.css";

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { isAuth, name } = useAppSelector((state) => state.user);

    const isAuthPage =
        location.pathname === "/login" || location.pathname === "/registration";

    const handleLogout = () => {
        localStorage.removeItem("user");
        dispatch(removeUser());
        navigate("/login");
    };

    return (
        <header className={styles.header}>
            <Logo />
            {isAuth && !isAuthPage && (
                <div className={styles.userInfo}>
                    {name && <span className={styles.userName}>{name}</span>}
                    <Button buttonText="Logout" onClick={handleLogout} />
                </div>
            )}
        </header>
    );
}

export default Header;
