import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../Header/Header";
import Button from "../../common/Button/Button";
import AuthorItem from "../AuthorItem/AuthorItem";
import getCourseDuration from "../../helpers/getCourseDuration";
import { Author } from "../../store/authors/types";
import { useAuthors } from "../../hooks/useAuthors";
import { useCourseForm } from "../../hooks/useCourseForm";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addCourse } from "../../store/courses/actions";

import styles from "./CreateCourse.module.css";

const CreateCourse = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const authorsFromRedux = useAppSelector((state) => state.authors);

    const {
        authors,
        setAuthors: setLocalAuthors,
        courseAuthors,
        setCourseAuthors,
        addAuthor,
        deleteAuthor,
        deleteAuthorFromList,
    } = useAuthors();

    useEffect(() => {
        setLocalAuthors(authorsFromRedux);
    }, [authorsFromRedux, setLocalAuthors]);

    const {
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
        handleCreateCourse,
    } = useCourseForm(courseAuthors, () => setCourseAuthors([]));

    const onCreateCourse = () => {
        const newCourse = handleCreateCourse();
        if (newCourse) {
            dispatch(addCourse(newCourse));
            navigate("/courses");
        }
    };

    const handleCreateAuthor = () => {
        if (authorName.trim().length < 2) {
            setErrors((prev) => ({
                ...prev,
                authorName: "Author name must be at least 2 characters",
            }));
            return;
        }

        const newAuthor: Author = {
            id: crypto.randomUUID(),
            name: authorName.trim(),
        };

        setLocalAuthors((prev) => [...prev, newAuthor]);
        setAuthorName("");
        setErrors((prev) => ({ ...prev, authorName: "" }));
    };

    return (
        <>
            <Header />
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
                        {errors.title && (
                            <p className={styles.error}>{errors.title}</p>
                        )}

                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Input text"
                            rows={4}
                        />
                        {errors.description && (
                            <p className={styles.error}>{errors.description}</p>
                        )}
                    </div>
                </div>

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Duration</h3>
                    <div className={styles.durationWrapper}>
                        <div className={styles.durationInput}>
                            <label>Duration</label>
                            <input
                                type="number"
                                min={1}
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder="Input text"
                            />
                            {errors.duration && (
                                <p className={styles.error}>
                                    {errors.duration}
                                </p>
                            )}
                        </div>
                        <div className={styles.durationDisplay}>
                            <p>{getCourseDuration(Number(duration))}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.authorsSection}>
                    <div className={styles.authorsColumn}>
                        <h3 className={styles.sectionTitle}>Authors</h3>

                        <label>Author Name</label>
                        <div className={styles.authorInputRow}>
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
                        {errors.authorName && (
                            <p className={styles.error}>{errors.authorName}</p>
                        )}

                        <div className={styles.authorList}>
                            <h4>Authors List</h4>
                            {authors.length > 0 ? (
                                authors.map((author) => (
                                    <AuthorItem
                                        key={author.id}
                                        name={author.name}
                                        onAdd={() => addAuthor(author)}
                                        onDelete={() =>
                                            deleteAuthorFromList(author)
                                        }
                                    />
                                ))
                            ) : (
                                <p>No available authors</p>
                            )}
                        </div>
                    </div>

                    <div className={styles.courseAuthorsColumn}>
                        <h3 className={styles.sectionTitle}>Course Authors</h3>
                        {courseAuthors.length > 0 ? (
                            courseAuthors.map((author) => (
                                <AuthorItem
                                    key={author.id}
                                    name={author.name}
                                    onDelete={() => deleteAuthor(author)}
                                />
                            ))
                        ) : (
                            <p className={styles.emptyText}>
                                Author list is empty
                            </p>
                        )}
                    </div>
                </div>

                <div className={styles.buttonRow}>
                    <Button
                        buttonText="Cancel"
                        onClick={() => navigate("/courses")}
                    />
                    <Button
                        buttonText="Create Course"
                        onClick={onCreateCourse}
                    />
                </div>
            </div>
        </>
    );
};

export default CreateCourse;
