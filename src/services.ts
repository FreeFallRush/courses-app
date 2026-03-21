import { Course } from "./store/courses/types";
import { Author } from "./store/authors/types";

const BASE_URL = "https://react-courses-app-1.onrender.com";
interface CoursesResponse {
    successful: boolean;
    result: Course[];
}

interface AuthorsResponse {
    successful: boolean;
    result: Author[];
}

export const getCourses = async (): Promise<CoursesResponse> => {
    const res = await fetch(`${BASE_URL}/courses/all`);
    if (!res.ok) throw new Error("Failed to fetch courses");
    return res.json();
};

export const getAuthors = async (): Promise<AuthorsResponse> => {
    const res = await fetch(`${BASE_URL}/authors/all`);
    if (!res.ok) throw new Error("Failed to fetch authors");
    return res.json();
};

export const createAuthorAPI = async (
    name: string
): Promise<{ successful: boolean; result: Author }> => {
    const res = await fetch(`${BASE_URL}/authors/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") || "",
        },
        body: JSON.stringify({ name }),
    });

    if (!res.ok) throw new Error("Failed to create author");

    return res.json();
};
