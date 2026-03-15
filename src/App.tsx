import Courses from "./components/Courses/Courses";
import { mockedCoursesList, mockedAuthorsList } from "./constants";
import CourseInfo from "./components/CourseInfo/CourseInfo";

import "./App.css";

function App() {
    return (
        <>
            <CourseInfo />
            <Courses courses={mockedCoursesList} authors={mockedAuthorsList} />
        </>
    );
}

export default App;
