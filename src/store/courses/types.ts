export const SET_COURSES = "SET_COURSES";
export const ADD_COURSE = "ADD_COURSE";
export const DELETE_COURSE = "DELETE_COURSE";
export const UPDATE_COURSE = "UPDATE_COURSE";

export interface Course {
    id: string;
    title: string;
    description: string;
    creationDate: string;
    duration: number;
    authors: string[];
}

interface SetCoursesAction {
    type: typeof SET_COURSES;
    payload: Course[];
}

interface AddCourseAction {
    type: typeof ADD_COURSE;
    payload: Course;
}

interface DeleteCourseAction {
    type: typeof DELETE_COURSE;
    payload: string;
}

interface UpdateCourseAction {
    type: typeof UPDATE_COURSE;
    payload: Course;
}

export type CourseActionTypes =
    | SetCoursesAction
    | AddCourseAction
    | DeleteCourseAction
    | UpdateCourseAction;
