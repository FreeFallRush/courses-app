import { createAsyncThunk } from "@reduxjs/toolkit";
import { Course } from "../../types/course";
import { setCourses, addCourse } from "./actions";
import { deleteCourse as deleteCourseAction } from "./actions";

const BASE_URL = "http://localhost:4000";

export const fetchCourses = createAsyncThunk(
    "courses/fetchCourses",
    async (_, thunkAPI) => {
        const token = localStorage.getItem("token");

        if (!token) {
            return thunkAPI.rejectWithValue("No token found");
        }

        try {
            const response = await fetch(`${BASE_URL}/courses/all`, {
                headers: { Authorization: token },
            });

            const data = await response.json();

            if (!response.ok || !data.result) {
                return thunkAPI.rejectWithValue(
                    data.errors || "Invalid course data"
                );
            }
            const result = Array.isArray(data.result) ? data.result : [];
            thunkAPI.dispatch(setCourses(result));
        } catch (error) {
            return thunkAPI.rejectWithValue("Network error");
        }
    }
);

export const createCourse = createAsyncThunk(
    "courses/createCourse",
    async (newCourse: Course, thunkAPI) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return thunkAPI.rejectWithValue("No token found");

            const response = await fetch(`${BASE_URL}/courses/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(newCourse),
            });

            const data = await response.json();

            if (!response.ok) {
                return thunkAPI.rejectWithValue(
                    data.errors || "Failed to add course"
                );
            }

            thunkAPI.dispatch(addCourse(data.result as Course));
        } catch (error) {
            return thunkAPI.rejectWithValue("Network error");
        }
    }
);

export const deleteCourse = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>("courses/deleteCourse", async (courseId, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("No token found");

    try {
        const response = await fetch(`${BASE_URL}/courses/${courseId}`, {
            method: "DELETE",
            headers: {
                Authorization: token,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            return thunkAPI.rejectWithValue(
                errorData.errors || "Failed to delete course"
            );
        }

        thunkAPI.dispatch(deleteCourseAction(courseId));
        return courseId;
    } catch (error) {
        return thunkAPI.rejectWithValue("Network error");
    }
});
