import {
    SET_COURSES,
    ADD_COURSE,
    DELETE_COURSE,
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
        default:
            return state;
    }
};

export default coursesReducer;
