import { useNavigate } from "react-router-dom";
import Button from "../../../../common/Button/Button";
import getCourseDuration from "../../../../helpers/getCourseDuration";
import formatCreationDate from "../../../../helpers/formatCreationDate";
import { CourseCardProps } from "./CourseCard.types";
import styles from "./CourseCard.module.css";
import { useAppSelector } from "../../../../store/hooks";
import { FaTrash, FaPen } from "react-icons/fa";

function CourseCard({ course, authorNames, onDelete }: CourseCardProps) {
    const { id, title, description, duration, creationDate } = course;

    const navigate = useNavigate();
    const userRole = useAppSelector((state) => state.user.role);
    const isAdmin = userRole?.toUpperCase() === "ADMIN";

    const handleShowCourse = () => {
        navigate(`/courses/${id}`);
    };

    const handleUpdateCourse = () => {
        navigate(`/courses/update/${id}`, {
            state: { course },
        });
    };

    return (
        <div className={styles.card}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.cardContainer}>
                <div className={styles.left}>
                    <p className={styles.description}>{description}</p>
                </div>
                <div className={styles.right}>
                    <p className={styles.author}>
                        <strong>Authors: </strong>
                        {authorNames.join(", ")}
                    </p>
                    <p className={styles.duration}>
                        <strong>Duration:</strong> {getCourseDuration(duration)}
                    </p>
                    <p className={styles.date}>
                        <strong>Created:</strong>{" "}
                        {formatCreationDate(creationDate)}
                    </p>
                    <div className={styles.buttonsGroup}>
                        <Button
                            buttonText="Show Course"
                            onClick={handleShowCourse}
                        />
                        {isAdmin && (
                            <>
                                <Button icon={<FaTrash />} onClick={onDelete} />
                                <Button
                                    icon={<FaPen />}
                                    onClick={handleUpdateCourse}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;
