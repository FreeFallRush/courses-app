import { Course } from "../../../../types/course";

export type CourseCardProps = {
    course: Course;
    authorNames: string[];
    onDelete?: () => void;
};
