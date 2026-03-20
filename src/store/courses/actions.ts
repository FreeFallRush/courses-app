import { SET_COURSES, ADD_COURSE, DELETE_COURSE, Course } from "./types";

export const setCourses = (courses: Course[]) => ({
    type: SET_COURSES,
    payload: courses,
});

export const addCourse = (course: Course) => ({
    type: ADD_COURSE,
    payload: course,
});

export const deleteCourse = (id: string) => ({
    type: DELETE_COURSE,
    payload: id,
});
