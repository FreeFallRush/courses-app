type ButtonProps = {
    buttonText: string;
    onClick?: () => void;
};

function Button({ buttonText, onClick }: ButtonProps) {
    return (
        <>
            <button onClick={onClick}>{buttonText}</button>
        </>
    );
}

export default Button;
