import Button from "../../../../common/Button/Button";
import { getCourseDuration } from "../../../../helpers/getCourseDuration";
import { CourseCardProps } from "./CourseCard.types";

function CourseCard({title, duration, creationDate, description authorNames}:CourseCardProps) {
    return (
        <div>
            <h2>{title}</h2>
            <div>
                <p>{description}</p>
                <p>{authorNames}</p>
                <p>Duration: {getCourseDuration(duration)}</p>
            </div>
            <Button buttonText="SHOW COURSE" />
        </div>
    );
}

export default CourseCard;
