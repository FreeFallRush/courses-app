export const SET_COURSES = "SET_COURSES";
export const ADD_COURSE = "ADD_COURSE";
export const DELETE_COURSE = "DELETE_COURSE";

export interface Course {
    id: string;
    title: string;
    description: string;
    creationDate: string;
    duration: number;
    authors: string[];
}
