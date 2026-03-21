import styles from "./Button.module.css";

type ButtonProps = {
    buttonText?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
};

function Button({ buttonText, onClick, icon }: ButtonProps) {
    const isIconOnly = !!icon && !buttonText;
    const className = isIconOnly ? styles.iconButton : styles.button;
    return (
        <button className={className} onClick={onClick}>
            {icon && <span className={styles.icon}>{icon}</span>}
            {buttonText}
        </button>
    );
}

export default Button;
