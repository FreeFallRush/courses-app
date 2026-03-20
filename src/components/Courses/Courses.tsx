import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "./components/CourseCard/CourseCard";
import { CourseProps } from "./Courses.types";
import Button from "../../common/Button/Button";
import EmptyCourseList from "../EmptyCourseList/EmptyCourseList";
import Header from "../Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import styles from "./Courses.module.css";

function Courses({ courses, authors }: CourseProps) {
    const [filteredCourses, setFilteredCourses] = useState(courses);

    const navigate = useNavigate();

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

    const handleSearch = (query: string) => {
        const trimmedQuery = query.trim().toLowerCase();

        if (trimmedQuery === "") {
            setFilteredCourses(courses);
            return;
        }

        const result = courses.filter(
            (course) =>
                course.title.toLowerCase().includes(trimmedQuery) ||
                course.id.toLowerCase().includes(trimmedQuery)
        );

        setFilteredCourses(result);
    };

    return (
        <>
            <Header />
            <div className={styles.container}>
                <SearchBar onSearch={handleSearch} />
                {filteredCourses.length === 0 ? (
                    <EmptyCourseList />
                ) : (
                    filteredCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            title={course.title}
                            description={course.description}
                            duration={course.duration}
                            creationDate={course.creationDate}
                            authorNames={getAuthors(course.authors)}
                        />
                    ))
                )}

                <Button
                    buttonText="Add New Course"
                    onClick={() => navigate("/courses/add")}
                />
            </div>
        </>
    );
}
export default Courses;
