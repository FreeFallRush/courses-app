import { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./store/hooks";

import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Courses from "./components/Courses/Courses";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import CreateCourse from "./components/CourseForm/CourseForm";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { fetchCourses } from "./store/courses/thunk";
import { fetchAuthors } from "./store/authors/thunk";

import "./App.css";

function App() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const token = user.token;

    useEffect(() => {
        if (user.isAuth && token) {
            const fetchData = async () => {
                try {
                    dispatch(fetchCourses());

                    dispatch(fetchAuthors());
                } catch (error) {
                    console.error("Failed to fetch data:", error);
                }
            };

            fetchData();
        }
    }, [dispatch, user.isAuth, token]);

    const AuthRoute = ({ children }: { children: JSX.Element }) => {
        return user.isAuth ? children : <Navigate to="/login" />;
    };

    const PublicRoute = ({ children }: { children: JSX.Element }) => {
        return !user.isAuth ? children : <Navigate to="/courses" />;
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Navigate to={user.isAuth ? "/courses" : "/login"} />
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
                        <AuthRoute>
                            <Courses />
                        </AuthRoute>
                    }
                />

                <Route
                    path="/courses/:courseId"
                    element={
                        <AuthRoute>
                            <CourseInfo />
                        </AuthRoute>
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
