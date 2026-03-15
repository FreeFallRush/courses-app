import { useState } from "react";

export type Author = { id: string; name: string };

export const useAuthors = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [courseAuthors, setCourseAuthors] = useState<Author[]>([]);

    const addAuthor = (author: Author) => {
        setCourseAuthors((prev) => [...prev, author]);
        setAuthors((prev) => prev.filter((a) => a.id !== author.id));
    };

    const deleteAuthor = (author: Author) => {
        setAuthors((prev) => prev.filter((a) => a.id !== author.id));
        setCourseAuthors((prev) => prev.filter((a) => a.id !== author.id));
    };

    const deleteAuthorFromList = (author: Author) => {
        setAuthors((prev) => prev.filter((a) => a.id !== author.id));
    };

    return {
        authors,
        setAuthors,
        courseAuthors,
        setCourseAuthors,
        addAuthor,
        deleteAuthor,
        deleteAuthorFromList,
    };
};
