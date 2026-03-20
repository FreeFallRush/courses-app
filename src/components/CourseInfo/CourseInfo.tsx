import { useParams, Link } from "react-router-dom";
import Button from "../../common/Button/Button";
import getCourseDuration from "../../helpers/getCourseDuration";
import formatCreationDate from "../../helpers/formatCreationDate";
import Header from "../Header/Header";
import { CourseInfoProps } from "./CourseInfo.types";
import styles from "./CourseInfo.module.css";

function CourseInfo({ courses = [], authors = [] }: CourseInfoProps) {
    const { courseId } = useParams<{ courseId: string }>();

    const course = courses.find((c) => c.id === courseId);

    if (!course) {
        return <p>Course not found.</p>;
    }

    const authorMap: { [key: string]: string } = {};
    authors.forEach((a) => {
        authorMap[a.id] = a.name;
    });

    const authorNames = course.authors.map((id) => authorMap[id] || "Unknown");

    return (
        <>
            <Header />

            <div className={styles.wrapper}>
                <h2 className={styles.infoCardTitle}>{course.title}</h2>
                <div className={styles.infoCardContainer}>
                    <div className={styles.leftCardContainer}>
                        <strong>Description: </strong>
                        <p>{course.description}</p>
                    </div>
                    <div className={styles.rightCardContainer}>
                        <p>
                            <strong>ID:</strong> {course.id}
                        </p>
                        <p>
                            <strong>Duration: </strong>
                            <span>{getCourseDuration(course.duration)}</span>
                        </p>
                        <p>
                            <strong>Created: </strong>
                            <span>
                                {formatCreationDate(course.creationDate)}
                            </span>
                        </p>
                        <p>
                            <strong>Authors: </strong> {authorNames.join(", ")}
                        </p>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <Link to="/courses">
                        <Button buttonText="Back to courses" />
                    </Link>
                </div>
            </div>
        </>
    );
}
export default CourseInfo;
