export const validateCourseForm = (
    title: string,
    description: string,
    duration: string
) => {
    return {
        title: title.trim().length < 2 ? "Title is required." : "",
        description:
            description.trim().length < 2 ? "Description is required." : "",
        duration: +duration <= 0 ? "Duration is required." : "",
        authorName: "",
    };
};
