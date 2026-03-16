import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import Courses from "./components/Courses/Courses";
import { mockedCoursesList, mockedAuthorsList } from "./constants";

import "./App.css";

function App() {
    const token = localStorage.getItem("token");

    return (
        <>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            token ? (
                                <Navigate to="/courses" />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/courses"
                        element={
                            <Courses
                                courses={mockedCoursesList}
                                authors={mockedAuthorsList}
                            />
                        }
                    />
                </Routes>
            </Router>
        </>
    );
}

export default App;
