import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, AppDispatch } from "../index";
import { Author } from "./types";
import { setAuthors, addAuthor, deleteAuthor } from "./actions";
import { getAuthors, createAuthorAPI } from "../../services";

export const fetchAuthors = createAsyncThunk<
    void,
    void,
    {
        dispatch: AppDispatch;
        state: RootState;
        rejectValue: string;
    }
>("authors/fetchAuthors", async (_, thunkAPI) => {
    try {
        const response = await getAuthors();

        if (!response.successful) {
            return thunkAPI.rejectWithValue("Failed to fetch authors");
        }

        thunkAPI.dispatch(setAuthors(response.result));
    } catch (error) {
        return thunkAPI.rejectWithValue("Network error");
    }
});

export const createAuthor = createAsyncThunk<
    Author,
    string,
    {
        dispatch: AppDispatch;
        state: RootState;
        rejectValue: string;
    }
>("authors/createAuthor", async (name, thunkAPI) => {
    try {
        const response = await createAuthorAPI(name);

        if (!response.successful) {
            return thunkAPI.rejectWithValue("Failed to create author");
        }

        thunkAPI.dispatch(addAuthor(response.result));
        return response.result;
    } catch (error) {
        return thunkAPI.rejectWithValue("Network error");
    }
});

export const deleteAuthorById = createAsyncThunk<
    string,
    string,
    {
        dispatch: AppDispatch;
        state: RootState;
        rejectValue: string;
    }
>("authors/deleteAuthor", async (authorId, thunkAPI) => {
    try {
        thunkAPI.dispatch(deleteAuthor(authorId));
        return authorId;
    } catch (error) {
        return thunkAPI.rejectWithValue("Failed to delete author");
    }
});
