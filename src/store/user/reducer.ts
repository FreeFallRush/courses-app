import {
    UserState,
    UserActionTypes,
    SET_USER,
    REMOVE_USER,
    userInitialState,
    LOGIN_USER_PENDING,
    LOGIN_USER_FULFILLED,
    LOGIN_USER_REJECTED,
    REGISTER_USER_PENDING,
    REGISTER_USER_FULFILLED,
    REGISTER_USER_REJECTED,
} from "./types";

export const userReducer = (
    state = userInitialState,
    action: UserActionTypes
): UserState => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                ...action.payload,
                isAuth: true,
            };
        case REMOVE_USER:
            return {
                ...userInitialState,
                token: "",
            };
        case LOGIN_USER_PENDING:
        case REGISTER_USER_PENDING:
            return state;
        case LOGIN_USER_FULFILLED:
        case REGISTER_USER_FULFILLED:
            return {
                ...state,
                ...action.payload,
                isAuth: true,
            };
        case LOGIN_USER_REJECTED:
        case REGISTER_USER_REJECTED:
            return {
                ...state,
                isAuth: false,
            };
        default:
            return state;
    }
};

export default userReducer;
