function Courses({ courses, authors }) {
    return (
        <div>
            <p>test</p>
            <div>
                {courses.map((course) => {
                    console.log(course);
                    return (
                        <div>
                            <p>{course.title}</p>
                            <p>{course.description}</p>
                        </div>
                    );
                })}
            </div>
            <div>
                {authors.map((author) => {
                    console.log(author);
                    return <p>{author.name}</p>;
                })}
            </div>
        </div>
    );
}
export default Courses;
