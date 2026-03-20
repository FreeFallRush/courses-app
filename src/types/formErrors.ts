export type CourseFormErrors = {
    title: string;
    description: string;
    duration: string;
    authorName: string;
};

export type LoginFormErrors = {
    email: string;
    password: string;
};

export type RegistrationFormErrors = {
    name: string;
    email: string;
    password: string;
};

export type CreateCourseAuthorErrors = {
    authorName: string;
};
