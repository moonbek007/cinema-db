"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CircleXIcon, MenuIcon, SearchIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";

import { movies } from "@/constants/movies";

import "../../css/header.css";

const SearchResults = dynamic(() => import("./SearchResults/SearchResults"));
const MobileNavModal = dynamic(
  () => import("../MobileNavModal/MobileNavModal"),
);

const filterShows = (searchWord: string, shows: Show[]) => {
  const result = shows.filter((show) => {
    return show.name.toLowerCase().includes(searchWord.toLowerCase());
  });
  return result;
};

function Header({}) {
  const pathName = usePathname();

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<Show[]>(movies);
  const [showResults, setShowResults] = useState(false);
  const [showNavModal, setShowNavModal] = useState(false);

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

  const handleToggleNavModal = () => {
    setShowNavModal(() => !showNavModal);
  };

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
      <nav className="header__nav">
        <ul>
          <li>
            <button
              className={`header__nav__btn text-amber-50 hover:text-gray-100 ${pathName === "/" && "link-active"}`}
            >
              <Link href="/">Home</Link>
            </button>
          </li>
          <li>
            <button
              className={`header__nav__btn text-amber-50 hover:text-gray-100 ${pathName === "/collections" && "link-active"}`}
            >
              <Link href="/collections">Collections</Link>
            </button>
          </li>
          <li>
            <button
              className={`header__nav__btn text-amber-50 hover:text-gray-100 ${pathName === "/explore" && "link-active"}`}
            >
              <Link href="/explore">Explore</Link>
            </button>
          </li>
        </ul>
      </nav>
      <button className="header__nav-btn" onClick={handleToggleNavModal}>
        <MenuIcon />
      </button>
      {showNavModal && <MobileNavModal closeModal={handleToggleNavModal} />}
    </header>
  );
}

export default Header;
