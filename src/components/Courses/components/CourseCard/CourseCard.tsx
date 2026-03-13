import Button from "../../../../common/Button/Button";
import { CourseCardProps } from "./CourseCard.types";

function CourseCard({title, duration, creationDate, description authorNames}:CourseCardProps) {
    return (
        <div>
            <Button buttonText="SHOW COURSE" />
        </div>
    );
}

export default CourseCard;
