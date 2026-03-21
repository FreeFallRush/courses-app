import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { getCurrentUser } from "../../store/user/thunk";
import { deleteCourse } from "../../store/courses/thunk";
import { fetchCourses } from "../../store/courses/thunk";
import { Course, Author } from "../../types/course";
import Header from "../Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import Button from "../../common/Button/Button";
import CourseCard from "./components/CourseCard/CourseCard";
import EmptyCourseList from "../EmptyCourseList/EmptyCourseList";
import styles from "./Courses.module.css";

function Courses() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.user);
    const courses = useAppSelector((state): Course[] => state.courses);
    const authors = useAppSelector((state): Author[] => state.authors);

    const [filteredCourses, setFilteredCourses] = useState(courses);

    useEffect(() => {
        if (!user.isAuth) {
            dispatch(getCurrentUser());
        }
    }, [dispatch, user.isAuth]);

    useEffect(() => {
        setFilteredCourses(courses);
    }, [courses]);

    const authorMap: { [id: string]: string } = {};
    for (const author of authors) {
        authorMap[author.id] = author.name;
    }

    const getAuthors = (authorIds: string[]): string[] => {
        return authorIds.map((id) => authorMap[id]).filter(Boolean);
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

    const handleDeleteCourse = async (courseId: string) => {
        const result = await dispatch(deleteCourse(courseId));
        if (deleteCourse.fulfilled.match(result)) {
            dispatch(fetchCourses());
        }
    };

    const isEmpty = filteredCourses.length === 0;

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.topBar}>
                    <SearchBar onSearch={handleSearch} />
                    {user.role.toUpperCase() === "ADMIN" && (
                        <Button
                            buttonText="Add New Course"
                            onClick={() => {
                                console.log("Navigating to /courses/add");
                                navigate("/courses/add");
                            }}
                        />
                    )}
                </div>

                {isEmpty ? (
                    <EmptyCourseList />
                ) : (
                    filteredCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            authorNames={getAuthors(course.authors)}
                            onDelete={() => handleDeleteCourse(course.id)}
                        />
                    ))
                )}
            </div>
        </>
    );
}

export default Courses;
