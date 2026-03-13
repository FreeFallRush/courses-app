import Button from "../../../../common/Button/Button";
import { getCourseDuration } from "../../../../helpers/getCourseDuration";
import { CourseCardProps } from "./CourseCard.types";

function CourseCard({
    title = "Course Title",
    duration = 60,
    creationDate = "01/01/2025",
    description = "Course Description",
    authorNames = ["name2", "name3"],
}: CourseCardProps) {
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
