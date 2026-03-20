import { combineReducers } from "@reduxjs/toolkit";
import authorsReducer from "./authors/reducer";
import coursesReducer from "./courses/reducer";

const rootReducer = combineReducers({
    authors: authorsReducer,
    courses: coursesReducer,
});

export default rootReducer;
