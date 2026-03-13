import Button from "../../common/Button/Button";

function EmptyCourseList() {
    return (
        <>
            <h2>Course List is Empty</h2>
            <p>Please use "Add New Course" button to add your first course</p>
            <Button buttonText="Add New Course" />
        </>
    );
}

export default EmptyCourseList;
