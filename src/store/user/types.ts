export const SET_USER = "SET_USER";
export const REMOVE_USER = "REMOVE_USER";

export const LOGIN_USER_PENDING = "user/loginUser/pending";
export const LOGIN_USER_FULFILLED = "user/loginUser/fulfilled";
export const LOGIN_USER_REJECTED = "user/loginUser/rejected";

export const REGISTER_USER_PENDING = "user/registerUser/pending";
export const REGISTER_USER_FULFILLED = "user/registerUser/fulfilled";
export const REGISTER_USER_REJECTED = "user/registerUser/rejected";

export interface UserState {
    isAuth: boolean;
    name: string;
    email: string;
    token: string;
    role: string;
}

interface SetUserAction {
    type: typeof SET_USER;
    payload: UserState;
}

interface RemoveUserAction {
    type: typeof REMOVE_USER;
}

export type UserActionTypes =
    | SetUserAction
    | RemoveUserAction
    | { type: typeof LOGIN_USER_PENDING }
    | { type: typeof LOGIN_USER_FULFILLED; payload: UserState }
    | { type: typeof LOGIN_USER_REJECTED; error: string }
    | { type: typeof REGISTER_USER_PENDING }
    | { type: typeof REGISTER_USER_FULFILLED; payload: UserState }
    | { type: typeof REGISTER_USER_REJECTED; error: string };

export const userInitialState: UserState = {
    isAuth: false,
    name: "",
    email: "",
    token: "",
    role: "",
};
