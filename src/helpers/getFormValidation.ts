export const validateName = (name: string) => {
    if (!name.trim()) return "Name is required";
    if (!/^[A-Za-z\s]+$/.test(name)) return "Name must contain only letters";
    return "";
};

export const validateEmail = (email: string) => {
    if (!email.trim()) return "Email is required";
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) return "Invalid email";
    return "";
};

export const validatePassword = (password: string) => {
    if (!password.trim()) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
};
