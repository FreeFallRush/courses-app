import { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import { useAppDispatch } from "./store/hooks";
import { setCourses } from "./store/courses/actions";
import { setAuthors } from "./store/authors/actions";
import { getCourses, getAuthors } from "./services";

import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Courses from "./components/Courses/Courses";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import CreateCourse from "./components/CreateCourse/CreateCourse";

import "./App.css";

function App() {
    const dispatch = useAppDispatch();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [coursesData, authorsData] = await Promise.all([
                    getCourses(),
                    getAuthors(),
                ]);
                dispatch(setCourses(coursesData.result));
                dispatch(setAuthors(authorsData.result));
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        if (token) {
            fetchData();
        }
    }, [dispatch, token]);

    const PrivateRoute = ({ children }: { children: JSX.Element }) => {
        return token ? children : <Navigate to="/login" />;
    };

    const PublicRoute = ({ children }: { children: JSX.Element }) => {
        return !token ? children : <Navigate to="/courses" />;
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to={token ? "/courses" : "/login"} />}
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
                            <Courses />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/courses/:courseId"
                    element={
                        <PrivateRoute>
                            <CourseInfo />
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
    );
}

export default App;
