"use client";

import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { CircleXIcon, SearchIcon } from "lucide-react";

import SearchResults from "./SearchResults/SearchResults";

import { movies } from "@/constants/constants";
import "../../css/header.css";

const filterShows = (searchWord: string, shows: Show[]) => {
  const result = shows.filter((show) => {
    return show.name.toLowerCase().includes(searchWord.toLowerCase());
  });
  return result;
};

function Header({}) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<Show[]>(movies);
  const [showResults, setShowResults] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setSearchResults([]);
    } else {
      setSearchResults(() => {
        return filterShows(event.target.value, movies);
      });
    }
    setSearchValue(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {};

  const handleSearchButtonClick = () => {
    searchRef.current?.focus();
    if (!searchResults.length) {
      setSearchResults(filterShows(searchValue, movies));
    }
  };

  const handleClearButtonClick = () => {
    searchRef.current?.focus();
    setSearchValue("");
    setSearchResults(movies);
  };

  return (
    <header className="header">
      <div className="header__input">
        <button
          className="header__input__clear-button"
          onClick={handleClearButtonClick}
        >
          <CircleXIcon className="header__input__clear-button__icon" />
        </button>
        <input
          id="search-input"
          type="text"
          value={searchValue}
          ref={searchRef}
          onChange={handleChange}
          placeholder={"Search a Show"}
          className="header__input__input-field"
          onKeyDown={handleKeyDown}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
        />
        <button
          className="header__input__search-button"
          onClick={handleSearchButtonClick}
        >
          <SearchIcon className="header__input__search-button__icon" />
        </button>
        {showResults && (
          <SearchResults
            searchWord={searchValue}
            searchResults={searchResults}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
