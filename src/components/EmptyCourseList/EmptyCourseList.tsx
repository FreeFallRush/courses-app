import Button from "../../common/Button/Button";
import styles from "./EmptyCourseList.module.css";

function EmptyCourseList() {
    return (
        <div className={styles.mainContainer}>
            <h2>Course List is Empty</h2>
            <p>Please use "Add New Course" button to add your first course</p>
            <Button buttonText="Add New Course" />
        </div>
    );
}

export default EmptyCourseList;
