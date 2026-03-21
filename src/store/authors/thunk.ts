import { AppDispatch } from "../index";
import { setAuthors, addAuthor as addAuthorAction } from "./actions";
import { getAuthors as fetchAuthorsAPI } from "../../services";
import { Author } from "../../types/course";

export const fetchAuthors = () => async (dispatch: AppDispatch) => {
    try {
        const response = await fetchAuthorsAPI();
        if (response.successful) {
            dispatch(setAuthors(response.result));
        }
    } catch (error) {
        console.error("Failed to fetch authors:", error);
    }
};

export const createAuthor = (author: Author) => (dispatch: AppDispatch) => {
    dispatch(addAuthorAction(author));
};
