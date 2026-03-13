export type Course = {
    id: string;
    title: string;
    description: string;
    creationDate: string;
    duration: number;
    authors: string[];
};

export type Author = {
    id: string;
    name: string;
};

export type CourseInfoProps = {
    course?: Course;
    authors?: Author[];
};
