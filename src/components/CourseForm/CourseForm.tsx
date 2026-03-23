import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../Header/Header";
import Button from "../../common/Button/Button";
import AuthorItem from "./components/AuthorItem/AuthorItem";

import getCourseDuration from "../../helpers/getCourseDuration";
import { useCourseForm } from "../../hooks/useCourseForm";
import { useAuthors } from "../../hooks/useAuthors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import formatCreationDate from "../../helpers/formatCreationDate";

import { createAuthor, deleteAuthorById } from "../../store/authors/thunk";
import { createCourse, updateCourse } from "../../store/courses/thunk";

import { CreateCourseAuthorErrors } from "../../types/formErrors";
import { Course } from "../../types/course";
import { validateAuthorName } from "../../helpers/validateAuthorName";
import { v4 as uuidv4 } from "uuid";

import styles from "./CourseForm.module.css";

const CreateCourse = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const allCourses = useAppSelector((state) => state.courses);
    const authorsFromRedux = useAppSelector((state) => state.authors);

    const courseToEdit = allCourses.find((c) => c.id === courseId) || null;

    const {
        courseAuthors,
        setCourseAuthors,
        addAuthor: addCourseAuthor,
        deleteAuthor: deleteCourseAuthor,
    } = useAuthors();

    const [authorName, setAuthorName] = useState("");
    const [errors, setErrors] = useState<CreateCourseAuthorErrors>({
        authorName: "",
    });

    const {
        title,
        setTitle,
        description,
        setDescription,
        duration,
        setDuration,
        errors: formErrors,
    } = useCourseForm(courseAuthors, () => setCourseAuthors([]));

    useEffect(() => {
        if (courseToEdit) {
            setTitle(courseToEdit.title);
            setDescription(courseToEdit.description);
            setDuration(courseToEdit.duration.toString());

            const authorObjects = authorsFromRedux.filter((author) =>
                courseToEdit.authors.includes(author.id)
            );

            setCourseAuthors(authorObjects);
        }
    }, [courseToEdit]);

    const handleSubmit = async () => {
        if (
            formErrors.title ||
            formErrors.description ||
            formErrors.duration ||
            !title.trim() ||
            !description.trim() ||
            !duration ||
            courseAuthors.length === 0
        ) {
            return;
        }

        const courseData: Course = {
            id: courseToEdit?.id || uuidv4(),
            title: title.trim(),
            description: description.trim(),
            creationDate:
                courseToEdit?.creationDate ||
                formatCreationDate(new Date().toLocaleDateString("en-US")),
            duration: +duration,
            authors: courseAuthors.map((a) => a.id),
        };

        try {
            if (courseToEdit) {
                const result = await dispatch(updateCourse(courseData));
                if (updateCourse.fulfilled.match(result)) {
                    navigate("/courses");
                }
            } else {
                const result = await dispatch(createCourse(courseData));
                if (createCourse.fulfilled.match(result)) {
                    navigate("/courses");
                }
            }
        } catch (error) {
            console.error("Failed to save course:", error);
        }
    };

    const handleCreateAuthor = async () => {
        const errorMessage = validateAuthorName(authorName);

        if (errorMessage) {
            setErrors({ authorName: errorMessage });
            return;
        }

        try {
            await dispatch(createAuthor(authorName.trim()));
            setAuthorName("");
            setErrors({ authorName: "" });
        } catch (error) {
            console.error("Failed to create author:", error);
        }
    };

    const handleDeleteAuthor = async (authorId: string) => {
        try {
            await dispatch(deleteAuthorById(authorId));
        } catch (error) {
            console.error("Error deleting author", error);
        }
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
                        {formErrors.title && (
                            <p className={styles.error}>{formErrors.title}</p>
                        )}

                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Input text"
                            rows={4}
                        />
                        {formErrors.description && (
                            <p className={styles.error}>
                                {formErrors.description}
                            </p>
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
                            {formErrors.duration && (
                                <p className={styles.error}>
                                    {formErrors.duration}
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
                            {authorsFromRedux.length > 0 ? (
                                authorsFromRedux.map((author) => (
                                    <AuthorItem
                                        key={author.id}
                                        name={author.name}
                                        onAdd={() => addCourseAuthor(author)}
                                        onDelete={() =>
                                            handleDeleteAuthor(author.id)
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
                                    onDelete={() => deleteCourseAuthor(author)}
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
                        buttonText={
                            courseToEdit ? "Update Course" : "Create Course"
                        }
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </>
    );
};

export default CreateCourse;
