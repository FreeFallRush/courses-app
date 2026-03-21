import { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchCourses } from "./store/courses/thunk";
import { fetchAuthors } from "./store/authors/thunk";
import { getCurrentUser } from "./store/user/thunk";

import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Courses from "./components/Courses/Courses";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import CreateCourse from "./components/CourseForm/CourseForm";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import "./App.css";

function App() {
    const dispatch = useAppDispatch();
    const { isAuth, token, isLoadingUser } = useAppSelector(
        (state) => state.user
    );

    useEffect(() => {
        if (token) {
            dispatch(getCurrentUser());
        } else {
            dispatch({
                type: "user/getCurrentUser/rejected",
                error: "No token",
            });
        }
    }, [dispatch, token]);

    useEffect(() => {
        if (isAuth && token) {
            dispatch(fetchCourses());
            dispatch(fetchAuthors());
        }
    }, [dispatch, isAuth, token]);

    if (isLoadingUser) {
        return <div>Loading...</div>;
    }

    const AuthRoute = ({ children }: { children: JSX.Element }) => {
        return isAuth ? children : <Navigate to="/login" />;
    };

    const PublicRoute = ({ children }: { children: JSX.Element }) => {
        return !isAuth ? children : <Navigate to="/courses" />;
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to={isAuth ? "/courses" : "/login"} />}
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

                <Route
                    path="/courses/update/:courseId"
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
