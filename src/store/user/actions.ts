import { SET_USER, REMOVE_USER, UserState, UserActionTypes } from "./types";

export const setUser = (user: UserState): UserActionTypes => ({
    type: SET_USER,
    payload: user,
});

export const removeUser = (): UserActionTypes => ({
    type: REMOVE_USER,
});
