export const validateAuthorName = (name: string): string => {
    return name.trim().length < 2
        ? "Author name must be at least 2 characters"
        : "";
};
