import { useState } from "react";
import Input from "../../../../common/Input/Input";
import Button from "../../../../common/Button/Button";

type SearchBarProps = {
    onSearch: (query: string) => void;
};

function SearchBar({ onSearch }: SearchBarProps) {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        if (value === "") {
            onSearch("");
        }
    };

    const handleSearchClick = () => {
        onSearch(inputValue);
        setInputValue("");
    };

    return (
        <div>
            <Input
                labelText=""
                placeholderText="Input text"
                value={inputValue}
                onChange={handleInputChange}
            />
            <Button buttonText="Search" onClick={handleSearchClick} />
        </div>
    );
}

export default SearchBar;
