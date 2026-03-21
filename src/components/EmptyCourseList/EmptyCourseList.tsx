import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import Button from "../../common/Button/Button";
import styles from "./EmptyCourseList.module.css";

function EmptyCourseList() {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user);

    const handleAddCourse = () => {
        navigate("/courses/add");
    };

    const isAdmin = user.role?.toUpperCase() === "ADMIN";

    return (
        <div className={styles.mainContainer}>
            <h2>Course List is Empty</h2>
            {isAdmin ? (
                <>
                    <p className={styles.para}>
                        Please use "Add New Course" button to add your first
                        course
                    </p>
                    <Button
                        buttonText="Add New Course"
                        onClick={handleAddCourse}
                    />
                </>
            ) : (
                <p className={styles.para}>
                    You don't have permissions to create a course. Please log in
                    as ADMIN
                </p>
            )}
        </div>
    );
}

export default EmptyCourseList;
