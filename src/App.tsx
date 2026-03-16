import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import Courses from "./components/Courses/Courses";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import CreateCourse from "./components/CreateCourse/CreateCourse";
import { mockedCoursesList, mockedAuthorsList } from "./constants";

import "./App.css";

function App() {
    const token = localStorage.getItem("token");

    const PrivateRoute = ({ children }: { children: JSX.Element }) => {
        return token ? children : <Navigate to="/courses" />;
    };

    const PublicRoute = ({ children }: { children: JSX.Element }) => {
        return token ? children : <Navigate to="/courses" />;
    };

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

                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/registration"
                        element={
                            <PublicRoute>
                                <Registration />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/courses"
                        element={
                            <PrivateRoute>
                                <Courses
                                    courses={mockedCoursesList}
                                    authors={mockedAuthorsList}
                                />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/courses/:courseId"
                        element={
                            <PrivateRoute>
                                <CourseInfo
                                    courses={mockedCoursesList}
                                    authors={mockedAuthorsList}
                                />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/courses/add"
                        element={
                            <PrivateRoute>
                                <CreateCourse />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </>
    );
}

export default App;
