import Header from "./components/Header/Header";
import Courses from "./components/Courses/Courses";
import { mockedCoursesList, mockedAuthorsList } from "./constants";
import CourseInfo from "./components/CourseInfo/CourseInfo";

import "./App.css";

function App() {
    return (
        <>
            <Header />
            <Courses courses={mockedCoursesList} authors={mockedAuthorsList} />
            <CourseInfo />
        </>
    );
}

export default App;
