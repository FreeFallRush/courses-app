import styles from "./Button.module.css";

type ButtonProps = {
    buttonText: string;
    onClick?: () => void;
};

function Button({ buttonText, onClick }: ButtonProps) {
    return (
        <>
            <button className={styles.button} onClick={onClick}>
                {buttonText}
            </button>
        </>
    );
}

export default Button;
