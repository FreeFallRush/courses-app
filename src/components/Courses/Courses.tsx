import CourseCard from "./components/CourseCard/CourseCard";
import { CourseProps } from "./Courses.types";

function Courses({ courses, authors }: CourseProps) {
    const authorMap: { [id: string]: string } = {};
    for (const author of authors) {
        authorMap[author.id] = author.name;
    }

    const getAuthors = (authorsIds: string[]): string[] => {
        const names: string[] = [];

        for (const id of authorsIds) {
            const name = authorMap[id];
            if (name) {
                names.push(name);
            }
        }
        return names;
    };

    return (
        <div>
            {courses.map((course) => (
                <CourseCard
                    key={course.id}
                    title={course.title}
                    description={course.description}
                    duration={course.duration}
                    creationDate={course.creationDate}
                    authorNames={getAuthors(course.authors)}
                />
            ))}
        </div>
    );
}
export default Courses;
