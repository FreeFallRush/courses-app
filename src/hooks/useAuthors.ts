import { useState } from "react";
import { Author } from "../store/authors/types";

export const useAuthors = () => {
    const [courseAuthors, setCourseAuthors] = useState<Author[]>([]);

    const addAuthor = (author: Author) => {
        setCourseAuthors((prev) => [...prev, author]);
    };

    const deleteAuthor = (author: Author) => {
        setCourseAuthors((prev) => prev.filter((a) => a.id !== author.id));
    };

    return {
        courseAuthors,
        setCourseAuthors,
        addAuthor,
        deleteAuthor,
    };
};
