import Header from "./components/Header/Header";
import Courses from "./components/Courses/Courses";
import { mockedCoursesList, mockedAuthorsList } from "./constants";
import Registration from "./pages/Registration/Registration";

import "./App.css";

function App() {
    return (
        <>
            <Registration />
            <Header />
            <Courses courses={mockedCoursesList} authors={mockedAuthorsList} />
        </>
    );
}

export default App;
