export const SET_AUTHORS = "SET_AUTHORS";
export const ADD_AUTHOR = "ADD_AUTHOR";
export const DELETE_AUTHOR = "DELETE_AUTHOR";

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

interface DeleteAuthorAction {
    type: typeof DELETE_AUTHOR;
    payload: string;
}

export type AuthorActionTypes =
    | SetAuthorsAction
    | AddAuthorAction
    | DeleteAuthorAction;
