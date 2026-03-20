const BASE_URL = "https://react-courses-app-1.onrender.com/api";

export const getCourses = async () => {
    const res = await fetch(`${BASE_URL}/courses/all`);
    if (!res.ok) throw new Error("Failed to fetch courses");
    return res.json();
};

export const getAuthors = async () => {
    const res = await fetch(`${BASE_URL}/authors/all`);
    if (!res.ok) throw new Error("Failed to fetch authors");
    return res.json();
};
