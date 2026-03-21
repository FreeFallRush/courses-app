import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "./types";

const BASE_URL = "https://react-courses-app-1.onrender.com";

interface Credentials {
    email: string;
    password: string;
    name?: string;
}

async function fetchCurrentUser(token: string): Promise<UserState> {
    const userResponse = await fetch(`${BASE_URL}/users/me`, {
        headers: { Authorization: token },
    });
    const userData = await userResponse.json();

    if (!userResponse.ok)
        throw new Error(userData.errors || "Fetch user failed");

    return {
        isAuth: true,
        name: userData.result.name,
        email: userData.result.email,
        token,
        role: userData.result.role,
        isLoadingUser: false,
    };
}

export const loginUser = createAsyncThunk<
    UserState,
    Credentials,
    { rejectValue: string }
>("user/loginUser", async (credentials, thunkAPI) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok)
            return thunkAPI.rejectWithValue(data.errors || "Login failed");

        const token = data.result;
        localStorage.setItem("token", token);

        const user = await fetchCurrentUser(token);

        return user;
    } catch (error) {
        return thunkAPI.rejectWithValue("Network error");
    }
});

export const registerUser = createAsyncThunk<
    void,
    Credentials,
    { rejectValue: string }
>("user/registerUser", async (credentials, thunkAPI) => {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok)
            return thunkAPI.rejectWithValue(
                data.errors || "Registration failed"
            );
        return;
    } catch (error) {
        return thunkAPI.rejectWithValue("Network error");
    }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
    "user/logoutUser",
    async (_, thunkAPI) => {
        const token = localStorage.getItem("token");

        if (!token) return thunkAPI.rejectWithValue("No token found");

        try {
            const response = await fetch(`${BASE_URL}/logout`, {
                method: "DELETE",
                headers: {
                    Authorization: token,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(
                    errorData.errors || "Logout failed"
                );
            }
            localStorage.removeItem("token");
        } catch (error) {
            return thunkAPI.rejectWithValue("Network error");
        }
    }
);

export const getCurrentUser = createAsyncThunk<
    UserState,
    void,
    { rejectValue: string }
>("user/getCurrentUser", async (_, thunkAPI) => {
    const token = localStorage.getItem("token");

    if (!token) return thunkAPI.rejectWithValue("No token found");
    try {
        const user = await fetchCurrentUser(token);
        return user;
    } catch (error) {
        return thunkAPI.rejectWithValue("Failed to fetch current user");
    }
});
