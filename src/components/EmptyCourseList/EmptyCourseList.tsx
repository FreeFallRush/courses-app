import { useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";
import styles from "./EmptyCourseList.module.css";

function EmptyCourseList() {
    const navigate = useNavigate();

    const handleAddCourse = () => {
        navigate("/courses/add");
    };

    return (
        <div className={styles.mainContainer}>
            <h2>Course List is Empty</h2>
            <p>Please use "Add New Course" button to add your first course</p>
            <Button buttonText="Add New Course" onClick={handleAddCourse} />
        </div>
    );
}

export default EmptyCourseList;
