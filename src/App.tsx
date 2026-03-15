import Header from "./components/Header/Header";
import Courses from "./components/Courses/Courses";
import { mockedCoursesList, mockedAuthorsList } from "./constants";
import CreateCourse from "./components/CreateCourse/CreateCourse";

import "./App.css";

function App() {
    return (
        <>
            <CreateCourse />
            <Header />
            <Courses courses={mockedCoursesList} authors={mockedAuthorsList} />
        </>
    );
}

export default App;
