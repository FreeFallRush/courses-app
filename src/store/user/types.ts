export const SET_USER = "SET_USER";
export const REMOVE_USER = "REMOVE_USER";

export interface UserState {
    isAuth: boolean;
    name: string;
    email: string;
    token: string;
}

interface SetUserAction {
    type: typeof SET_USER;
    payload: UserState;
}

interface RemoveUserAction {
    type: typeof REMOVE_USER;
}

export type UserActionTypes = SetUserAction | RemoveUserAction;

const savedUser = localStorage.getItem("user");

export const userInitialState: UserState = savedUser
    ? JSON.parse(savedUser)
    : {
          isAuth: false,
          name: "",
          email: "",
          token: localStorage.getItem("token") || "",
      };
