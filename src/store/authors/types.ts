export const SET_AUTHORS = "SET_AUTHORS";
export const ADD_AUTHOR = "ADD_AUTHOR";

export interface Author {
    id: string;
    name: string;
}

interface SetAuthorsAction {
    type: typeof SET_AUTHORS;
    payload: Author[];
}

interface AddAuthorAction {
    type: typeof ADD_AUTHOR;
    payload: Author;
}

export type AuthorActionTypes = SetAuthorsAction | AddAuthorAction;
