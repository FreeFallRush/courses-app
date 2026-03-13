import Button from "../../common/Button/Button";
import getCourseDuration from "../../helpers/getCourseDuration";
import formatCreationDate from "../../helpers/formatCreationDate";
import { CourseInfoProps, Course, Author } from "./CourseInfo.types";

function CourseInfo({ course, authors = [] }: CourseInfoProps) {
    const defaultCourse: Course = {
        id: "default-id",
        title: "Course 1",
        description: "Course 1 description",
        creationDate: "01/01/2025",
        duration: 60,
        authors: ["id2", "id3"],
    };
    const defaultAuthors: Author[] = [
        { id: "id2", name: "name2" },
        { id: "id3", name: "name3" },
    ];
    const currentCourse = course ?? defaultCourse;
    const hasValidAuthors =
        authors.length > 0 &&
        authors.some((a) => currentCourse.authors.includes(a.id));
    const resolvedAuthors = hasValidAuthors ? authors : defaultAuthors;
    const authorMap: { [key: string]: string } = {};
    for (const author of resolvedAuthors) {
        authorMap[author.id] = author.name;
    }
    const authorNames: string[] = [];
    for (const authorId of currentCourse.authors) {
        const name = authorMap[authorId];
        if (name) {
            authorNames.push(name);
        }
    }
    return (
        <div>
            {" "}
            <p>ID: {currentCourse.id}</p> <h2>{currentCourse.title}</h2>{" "}
            <p>{currentCourse.description}</p>{" "}
            <p>
                {" "}
                Duration:{" "}
                <span>{getCourseDuration(currentCourse.duration)}</span>{" "}
            </p>{" "}
            <p>
                {" "}
                Created:{" "}
                <span>
                    {formatCreationDate(currentCourse.creationDate)}
                </span>{" "}
            </p>{" "}
            <p>
                {" "}
                Authors:{" "}
                {authorNames.length > 0
                    ? authorNames.join(", ")
                    : "Unknown"}{" "}
            </p>{" "}
            <Button buttonText="Back to courses" />{" "}
        </div>
    );
}
export default CourseInfo;
