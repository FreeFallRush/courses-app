import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "./types";

const BASE_URL = "http://localhost:4000";

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
    UserState,
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

        const token = data.result;
        localStorage.setItem("token", token);

        const user = await fetchCurrentUser(token);

        return user;
    } catch (error) {
        return thunkAPI.rejectWithValue("Network error");
    }
});
