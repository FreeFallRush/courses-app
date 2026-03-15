import Header from "./components/Header/Header";
import Courses from "./components/Courses/Courses";
import { mockedCoursesList, mockedAuthorsList } from "./constants";
import AuthorItem from "./components/AuthorItem/AuthorItem";

import "./App.css";

function App() {
    return (
        <>
            <AuthorItem />
            <Header />
            <Courses courses={mockedCoursesList} authors={mockedAuthorsList} />
        </>
    );
}

export default App;
