import Header from "./components/Header/Header";
import Courses from "./components/Courses/Courses";
import { mockedCoursesList, mockedAuthorsList } from "./constants";
import Login from "./pages/Login/Login";

import "./App.css";

function App() {
    return (
        <>
            <Login />
            <Header />
            <Courses courses={mockedCoursesList} authors={mockedAuthorsList} />
        </>
    );
}

export default App;
