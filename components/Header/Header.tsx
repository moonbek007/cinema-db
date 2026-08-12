"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CircleXIcon, MenuIcon, SearchIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";
import dynamic from "next/dynamic";

import { fetchSearchResults } from "@/lib/utils";

import "../../css/header.css";

const SearchResults = dynamic(() => import("./SearchResults/SearchResults"));
const MobileNavModal = dynamic(
  () => import("../MobileNavModal/MobileNavModal"),
);

function Header({}) {
  const pathName = usePathname();

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<Show[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showNavModal, setShowNavModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchRef.current?.focus();
    (() => setWindowWidth(window.innerWidth))();
  }, []);

  const debouncedAPICall = useDebouncedCallback(async (searchValue: string) => {
    if (!searchValue) {
      setSearchResults([]);
      return;
    }
    const searchResults = await fetchSearchResults(searchValue);
    setSearchResults(() => {
      return searchResults.slice(0, 10);
    });
    setIsLoading(false);
  }, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setSearchValue(() => event.target.value);
    debouncedAPICall(event.target.value);
  };

  const handleToggleNavModal = () => {
    setShowNavModal(() => !showNavModal);
  };

  const handleSearchButtonClick = () => {
    searchRef.current?.focus();
  };

  const handleClearButtonClick = () => {
    searchRef.current?.focus();
    setSearchValue("");
    setSearchResults([]);
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
          // onBlur={() => setShowResults(false)}
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
            screenWidth={windowWidth!}
            isLoading={isLoading}
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
