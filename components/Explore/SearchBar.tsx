import { ChangeEvent, useRef, useState } from "react";
import { CircleXIcon, SearchIcon } from "lucide-react";

import "../../css/filters.css";

function SearchBar({ search, clear }: SearchBarProps) {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchWord, setSearchWord] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    search(e.target.value);
    setSearchWord(e.target.value);
  };

  const handleClickClearButton = () => {
    clear();
    setSearchWord("");
    searchRef?.current?.focus();
  };

  const handleClickSearchButton = () => {
    search(searchWord);
  };

  return (
    <div className="filters__display__search-bar text-gray-100">
      <button
        className="filters__display__search-bar__clear-button"
        onClick={handleClickClearButton}
      >
        <CircleXIcon className="filters__display__search-bar__clear-button__icon" />
      </button>
      <input
        id="filters-input-field"
        type="text"
        value={searchWord}
        ref={searchRef}
        onChange={handleChange}
        placeholder={"Search a Show"}
        className="filters__display__search-bar__input-field"
      />
      <button
        className="filters__display__search-bar__search-button"
        onClick={handleClickSearchButton}
      >
        <SearchIcon className="filters__display__search-bar__search-button__icon" />
      </button>
    </div>
  );
}

export default SearchBar;
