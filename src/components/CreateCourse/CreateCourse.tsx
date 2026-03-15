import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AuthorItem from "../AuthorItem/AuthorItem";
import Button from "../../common/Button/Button";
import formatCreationDate from "../../helpers/formatCreationDate";
import getCourseDuration from "../../helpers/getCourseDuration";

import styles from "./CreateCourse.module.css";

function CreateCourse() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [authors, setAuthors] = useState<{ id: string; name: string }[]>([]);
    const [courseAuthors, setCourseAuthors] = useState<
        { id: string; name: string }[]
    >([]);

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        duration: "",
        authorName: "",
    });

    const handleCreateAuthor = () => {
        if (authorName.trim().length < 2) {
            setErrors((prev) => ({
                ...prev,
                authorName: "Author name must be at least 2 characters",
            }));
            return;
        }
        const newAuthor = { id: uuidv4(), name: authorName };
        setAuthors((prev) => [...prev, newAuthor]);
        setAuthorName("");
        setErrors((prev) => ({ ...prev, authorName: "" }));
    };

    const handleAddAuthor = (author: { id: string; name: string }) => {
        setCourseAuthors((prev) => [...prev, author]);
        setAuthors((prev) => prev.filter((a) => a.id !== author.id));
    };

    const handleDeleteAuthor = (author: { id: string; name: string }) => {
        setAuthors((prev) => prev.filter((a) => a.id !== author.id));
        setCourseAuthors((prev) => prev.filter((a) => a.id !== author.id));
    };

    const handleDeleteAuthorFromAuthorsList = (author: {
        id: string;
        name: string;
    }) => {
        setAuthors((prev) => prev.filter((a) => a.id !== author.id));
    };

    const validateForm = () => {
        const newErrors = {
            title: title.trim().length < 2 ? "Title is required." : "",
            description:
                description.trim().length < 2 ? "Description is required." : "",
            duration: +duration <= 0 ? "Duration is required." : "",
            authorName: "",
        };
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
            authors: courseAuthors.map((a) => a.id),
        };

        setTitle("");
        setDescription("");
        setDuration("");
        setCourseAuthors([]);
    };

    return (
        <>
            <h2 className={styles.heading}>Course Edit/Create Page</h2>
            <div className={styles.container}>
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Main Info</h3>
                    <div className={styles.formGroup}>
                        <label>Title</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Input text"
                        />

                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Input text"
                            rows={4}
                        />
                    </div>
                </div>

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Duration</h3>
                    <div>
                        <label>Duration</label>
                        <input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="Input text"
                        />
                    </div>
                </div>

                <div>
                    <h3 className={styles.sectionTitle}>Authors</h3>
                    <label>Author Name</label>
                    <div>
                        <input
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            placeholder="Input text"
                        />
                        <Button
                            buttonText="Create Author"
                            onClick={handleCreateAuthor}
                        />
                    </div>
                </div>

                <div>
                    <h4>Authors List</h4>
                    {authors.length > 0 ? (
                        authors.map((author) => (
                            <AuthorItem
                                key={author.id}
                                name={author.name}
                                onAdd={() => handleAddAuthor(author)}
                                onDelete={() =>
                                    handleDeleteAuthorFromAuthorsList(author)
                                }
                            />
                        ))
                    ) : (
                        <p>No available authors</p>
                    )}
                </div>

                <div>
                    <h3 className={styles.sectionTitle}>Course Authors</h3>
                    {courseAuthors.length > 0 ? (
                        courseAuthors.map((author) => (
                            <AuthorItem
                                key={author.id}
                                name={author.name}
                                onDelete={() => handleDeleteAuthor(author)}
                            />
                        ))
                    ) : (
                        <p>Author list is empty</p>
                    )}
                </div>

                <div>
                    <Button buttonText="Cancel" onClick={handleCreateCourse} />
                    <Button
                        buttonText="Create Course"
                        onClick={handleCreateCourse}
                    />
                </div>
            </div>
        </>
    );
}

export default CreateCourse;
