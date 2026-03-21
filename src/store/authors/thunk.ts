import { AppDispatch } from "../index";
import { setAuthors, addAuthor as addAuthorAction } from "./actions";
import { getAuthors as fetchAuthorsAPI } from "../../services";
import { createAuthorAPI } from "../../services";

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

export const createAuthor = (name: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await createAuthorAPI(name);
        if (response.successful) {
            dispatch(addAuthorAction(response.result));
        }
    } catch (error) {
        console.error("Failed to create author:", error);
    }
};
