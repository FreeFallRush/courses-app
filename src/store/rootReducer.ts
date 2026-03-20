import { combineReducers } from "@reduxjs/toolkit";
import authorsReducer from "./authors/reducer";
import coursesReducer from "./courses/reducer";
import userReducer from "./user/reducer";

const rootReducer = combineReducers({
    authors: authorsReducer,
    courses: coursesReducer,
    user: userReducer,
});

export default rootReducer;
