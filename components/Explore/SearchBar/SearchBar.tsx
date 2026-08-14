"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CircleXIcon, SearchIcon } from "lucide-react";

import { QueryParams } from "@/constants/constants";

import "../../../css/filters.css";

function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchRef = useRef<HTMLInputElement>(null);
  const [searchWord, setSearchWord] = useState(
    searchParams.get(QueryParams.SEARCH) || "",
  );

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const handleSearchShows = (searchWord: string) => {
    const searchParam = searchParams.get(QueryParams.SEARCH);
    if (searchParam && searchParam.toLowerCase() === searchWord.toLowerCase())
      return;

    const params = new URLSearchParams(searchParams.toString());
    params.set(QueryParams.PAGE, "1");
    if (searchWord.length) {
      params.set(QueryParams.SEARCH, searchWord);
    } else {
      params.delete(QueryParams.SEARCH);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleClickClearButton = () => {
    if (!searchWord.length && !searchParams.get(QueryParams.SEARCH)) return;

    setSearchWord("");

    const params = new URLSearchParams(searchParams.toString());
    params.set(QueryParams.PAGE, "1");
    params.delete(QueryParams.SEARCH);

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClickSearchButton = () => {
    if (!searchWord.length && !searchParams.get(QueryParams.SEARCH)) return;

    handleSearchShows(searchWord);
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
