"use client";

import { useState } from "react";
import clsx from "clsx";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CircleXIcon,
  PlayIcon,
  StarIcon,
  StarsIcon,
  XIcon,
} from "lucide-react";

import DropdownMenu from "./DropdownMenu/DropdownMenu";

import "../../../css/filters.css";
import { dropdownOptions, FilterTypes } from "@/constants/constants";

function FiltersModal({ closeModal }: FiltersModalProps) {
  const [rating] = useState("+5.0");
  const [ratingDropdownOpen, setRatingDropdownOpen] = useState(false);

  const [status] = useState("Running");
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  const [type] = useState("Scripted");
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

  const [country] = useState("France");
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

  const [language] = useState("English");
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const handleClickApplyFilters = () => {
    closeModal();
  };

  const handleClickClearFilters = () => {
    closeModal();
  };

  return (
    <div className="filters-modal rounded-2xl">
      <p className="title">
        <span>Filters</span>
        <button
          className="title__close__button hover:cursor-pointer"
          onClick={() => closeModal()}
        >
          <XIcon />
        </button>
      </p>
      <div className="filters-modal__filters">
        <div className="filters-modal__filters__filter rating">
          <p>
            <label htmlFor="rating">Rating</label>
          </p>
          <button
            id="rating"
            className="rounded-md dropdown-btn"
            onClick={() => setRatingDropdownOpen(!ratingDropdownOpen)}
          >
            <StarIcon />
            <span>{rating}</span>
            {ratingDropdownOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </button>
          {ratingDropdownOpen && (
            <DropdownMenu options={dropdownOptions[FilterTypes.RATING]} />
          )}
        </div>
        <div className="filters-modal__filters__filter country">
          <p>
            <label htmlFor="country">Country</label>
          </p>
          <button
            id="country"
            className="rounded-md dropdown-btn"
            onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
          >
            <span>{country}</span>
            {countryDropdownOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </button>
          {countryDropdownOpen && (
            <DropdownMenu options={dropdownOptions[FilterTypes.COUNTRY]} />
          )}
        </div>
        <div className="filters-modal__filters__filter status">
          <p>
            <label htmlFor="status">Status</label>
          </p>
          <button
            id="status"
            className="rounded-md dropdown-btn"
            onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
          >
            <span>{status}</span>
            {statusDropdownOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </button>
          {statusDropdownOpen && (
            <DropdownMenu options={dropdownOptions[FilterTypes.STATUS]} />
          )}
        </div>

        <div className="filters-modal__filters__filter language">
          <p>
            <label htmlFor="language">Language</label>
          </p>
          <button
            id="language"
            className="rounded-md dropdown-btn"
            onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
          >
            <span>{language}</span>
            {languageDropdownOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </button>
          {languageDropdownOpen && (
            <DropdownMenu options={dropdownOptions[FilterTypes.LANGUAGE]} />
          )}
        </div>
        <div className="filters-modal__filters__filter type">
          <p>
            <label htmlFor="type">Type</label>
          </p>
          <button
            id="type"
            className="rounded-md dropdown-btn"
            onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
          >
            <span>{type}</span>
            {typeDropdownOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </button>
          {typeDropdownOpen && (
            <DropdownMenu options={dropdownOptions[FilterTypes.TYPE]} />
          )}
        </div>
      </div>
      <div className="filters-modal__buttons">
        <button
          className="apply__filters__button"
          onClick={handleClickApplyFilters}
        >
          <PlayIcon />
          <span>Apply</span>
        </button>
        <button
          className="clear__filters__button"
          onClick={handleClickClearFilters}
        >
          <XIcon />
          <span>Clear</span>
        </button>
      </div>
    </div>
  );
}

export default FiltersModal;
