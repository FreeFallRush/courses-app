import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import formatCreationDate from "../helpers/formatCreationDate";
import { validateCourseForm } from "../helpers/validateCourseForm";

export const useCourseForm = (
    coursesAuthors: { id: string; name: string }[],
    resetCourseAuthors: () => void
) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [errors, setErrors] = useState({
        title: "",
        description: "",
        duration: "",
        authorName: "",
    });

    const validateForm = () => {
        const newErrors = validateCourseForm(title, description, duration);
        setErrors(newErrors);
        return Object.values(newErrors).every((err) => err === "");
    };

    const handleCreateCourse = () => {
        if (!validateForm()) return;

        const creationDate = formatCreationDate(
            new Date().toLocaleDateString("en-US")
        );

        const newCourse = {
            id: uuidv4(),
            title: title.trim(),
            description: description.trim(),
            creationDate,
            duration: +duration,
            authors: coursesAuthors.map((a) => a.id),
        };

        console.log("Created course:", newCourse);
        setTitle("");
        setDescription("");
        setDuration("");
        resetCourseAuthors();

        return newCourse;
    };

    return {
        title,
        setTitle,
        description,
        setDescription,
        duration,
        setDuration,
        authorName,
        setAuthorName,
        errors,
        setErrors,
        validateForm,
        handleCreateCourse,
    };
};
