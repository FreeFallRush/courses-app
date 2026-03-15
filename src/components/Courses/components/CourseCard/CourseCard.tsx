import Button from "../../../../common/Button/Button";
import getCourseDuration from "../../../../helpers/getCourseDuration";
import formatCreationDate from "../../../../helpers/formatCreationDate";
import { CourseCardProps } from "./CourseCard.types";
import styles from "./CourseCard.module.css";

function CourseCard({
    title = "Course Title",
    duration = 60,
    creationDate = "01/01/2025",
    description = "Course Description",
    authorNames = ["name2", "name3"],
}: CourseCardProps) {
    return (
        <div className={styles.cardContainer}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.card}>
                <div className={styles.leftCardSide}>
                    <p className={styles.description}>{description}</p>
                </div>
                <div className={styles.rightCardSide}>
                    <p className={styles.author}>
                        <strong>Authors:</strong> {authorNames.join(", ")}
                    </p>
                    <p className={styles.duration}>
                        <strong>Duration:</strong> {getCourseDuration(duration)}
                    </p>
                    <p className={styles.date}>
                        <strong>Created:</strong>{" "}
                        {formatCreationDate(creationDate)}
                    </p>
                    <Button buttonText="Show Course" />
                </div>
            </div>
        </div>
    );
}

export default CourseCard;
