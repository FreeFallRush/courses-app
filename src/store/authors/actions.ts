import { SET_AUTHORS, ADD_AUTHOR, Author, AuthorActionTypes } from "./types";

export const setAuthors = (authors: Author[]): AuthorActionTypes => ({
    type: SET_AUTHORS,
    payload: authors,
});

export const addAuthor = (author: Author): AuthorActionTypes => ({
    type: ADD_AUTHOR,
    payload: author,
});
