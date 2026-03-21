export type CourseCardProps = {
    id: string;
    title?: string;
    duration?: number;
    creationDate?: string;
    description?: string;
    authorNames?: string[];
    onDelete?: () => void;
};
