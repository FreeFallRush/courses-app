import { useState } from "react";
import AuthorItem from "../AuthorItem/AuthorItem";
import Button from "../../common/Button/Button";

function CreateCourse() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [authors, setAuthors] = useState<{ id: string; name: string }[]>([]);
    const [courseAuthors, setCourseAuthors] = useState<
        { id: string; name: string }[]
    >([]);

    return (
        <>
            <h2>Course Edit/Create Page</h2>
            <div>
                <h3>Main Info</h3>
                <div>
                    <label>Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Input text"
                    />

                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Input text"
                        rows={4}
                    />
                </div>
                <div>
                    <h3>Duration</h3>
                    <div>
                        <label>Duration</label>
                        <input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="Input text"
                        />
                    </div>
                </div>

                <div>
                    <h3>Authors</h3>
                    <label>Author Name</label>
                    <div>
                        <input
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            placeholder="Input text"
                        />
                    </div>
                </div>

                <div>
                    <h4>Authors List</h4>
                    {authors.length > 0 ? (
                        authors.map((author) => (
                            <AuthorItem
                                key={author.id}
                                name={author.name}
                                onAdd={() => handleAddAuthor(author)}
                                onDelete={() =>
                                    handleDeleteAuthorFromAuthorsList(author)
                                }
                            />
                        ))
                    ) : (
                        <p>No available authors</p>
                    )}
                </div>

                <div>
                    <h3>Course Authors</h3>
                    {courseAuthors.length > 0 ? (
                        courseAuthors.concatmap((author) => (
                            <AuthorItem
                                key={author.id}
                                name={author.name}
                                onDelete={() => handleDeleteAuthor(author)}
                            />
                        ))
                    ) : (
                        <p>Author list is empty</p>
                    )}
                </div>

                <div>
                    <Button buttonText="Cancel" />
                    <Button buttonText="Create Course" />
                </div>
            </div>
        </>
    );
}

export default CreateCourse;
