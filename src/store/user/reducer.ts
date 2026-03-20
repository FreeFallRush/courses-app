import {
    UserState,
    UserActionTypes,
    SET_USER,
    REMOVE_USER,
    userInitialState,
} from "./types";

const userReducer = (
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
                isAuth: false,
                name: "",
                email: "",
                token: "",
            };
        default:
            return state;
    }
};

export default userReducer;
