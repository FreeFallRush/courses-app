import { useParams, Link } from "react-router-dom";
import Button from "../../common/Button/Button";
import getCourseDuration from "../../helpers/getCourseDuration";
import formatCreationDate from "../../helpers/formatCreationDate";
import Header from "../Header/Header";
import { CourseInfoProps } from "./CourseInfo.types";

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
            <Header showLogout={true} userName="Harry Potter" />
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p>
                Duration:
                <span>{getCourseDuration(course.duration)}</span>
            </p>
            <p>
                Created:
                <span>{formatCreationDate(course.creationDate)}</span>
            </p>
            <p>
                Authors:
                {authorNames.join(", ")}
            </p>
            <Link to="/courses">
                <Button buttonText="Back to courses" />
            </Link>
        </>
    );
}
export default CourseInfo;
