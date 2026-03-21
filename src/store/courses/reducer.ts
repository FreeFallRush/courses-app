import {
    SET_COURSES,
    ADD_COURSE,
    DELETE_COURSE,
    UPDATE_COURSE,
    Course,
    CourseActionTypes,
} from "./types";

const initialState: Course[] = [];

const coursesReducer = (
    state = initialState,
    action: CourseActionTypes
): Course[] => {
    switch (action.type) {
        case SET_COURSES:
            return action.payload;
        case ADD_COURSE:
            return [...state, action.payload];
        case DELETE_COURSE:
            return state.filter((course) => course.id !== action.payload);
        case UPDATE_COURSE:
            return state.map((course) =>
                course.id === action.payload.id ? action.payload : course
            );
        default:
            return state;
    }
};

export default coursesReducer;
