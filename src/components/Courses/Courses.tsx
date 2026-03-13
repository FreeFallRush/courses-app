import CourseCard from "./components/CourseCard/CourseCard";
function Courses({ courses, authors }) {
    return (
        <div>
            {courses.map((course) => (
                <CourseCard
                    key={course.id}
                    title={course.title}
                    description={course.description}
                    duration={course.duration}
                    creationDate={course.creationDate}
                    authorNames={course.authors}
                />
            ))}
        </div>
    );
}
export default Courses;
