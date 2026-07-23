"use client";

import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { CircleXIcon, SearchIcon } from "lucide-react";

import "../../css/header.css";

function Header({}) {
  const [searchValue, setSearchValue] = useState("");

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {};

  const handleSearchButtonClick = () => {};

  const handleClearButtonClick = () => {
    searchRef.current?.focus();
    setSearchValue("");
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
        />
        <button
          className="header__input__search-button"
          onClick={handleSearchButtonClick}
        >
          <SearchIcon className="header__input__search-button__icon" />
        </button>
      </div>
    </header>
  );
}

export default Header;
