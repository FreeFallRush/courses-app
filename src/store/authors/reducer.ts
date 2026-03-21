import {
    SET_AUTHORS,
    ADD_AUTHOR,
    DELETE_AUTHOR,
    Author,
    AuthorActionTypes,
} from "./types";

const initialState: Author[] = [];

const authorsReducer = (
    state = initialState,
    action: AuthorActionTypes
): Author[] => {
    switch (action.type) {
        case SET_AUTHORS:
            return action.payload;
        case ADD_AUTHOR:
            return [...state, action.payload];
        case DELETE_AUTHOR:
            return state.filter((author) => author.id !== action.payload);
        default:
            return state;
    }
};

export default authorsReducer;
