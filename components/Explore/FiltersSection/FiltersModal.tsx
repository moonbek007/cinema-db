"use client";

import { useState } from "react";
import { ArrowDownIcon, ArrowUpIcon, StarIcon, XIcon } from "lucide-react";

import DropdownMenu from "./DropdownMenu/DropdownMenu";

import {
  defaultFilters,
  dropdownOptions,
  FilterTypes,
} from "@/constants/constants";
import "../../../css/filters.css";

function FiltersModal({ closeModal }: FiltersModalProps) {
  const [filters, setFilters] = useState(defaultFilters);

  const handlePickDropdownOption = (type: FilterTypes, option: string) => {
    setFilters((state) => {
      return {
        ...state,
        [type]: {
          value: option,
          dropdownOpen: false,
        },
      };
    });
  };

  const handleToggleDropdown = (type: FilterTypes, isOpen: boolean) => {
    setFilters((state) => {
      return {
        ...state,
        [type]: {
          ...state[type],
          dropdownOpen: !isOpen,
        },
      };
    });
  };

  const handleClickApplyFilters = () => {
    closeModal();
  };

  const handleClickClearFilters = () => {
    setFilters(defaultFilters);
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
            onClick={() =>
              handleToggleDropdown(
                FilterTypes.RATING,
                filters.Rating.dropdownOpen,
              )
            }
          >
            {filters.Rating.value !== "All" && <StarIcon />}
            <span>{filters.Rating.value}</span>
            {filters.Rating.dropdownOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </button>
          {filters.Rating.dropdownOpen && (
            <DropdownMenu
              type={FilterTypes.RATING}
              options={dropdownOptions[FilterTypes.RATING]}
              pickOption={handlePickDropdownOption}
            />
          )}
        </div>
        <div className="filters-modal__filters__filter country">
          <p>
            <label htmlFor="country">Country</label>
          </p>
          <button
            id="country"
            className="rounded-md dropdown-btn"
            onClick={() =>
              handleToggleDropdown(
                FilterTypes.COUNTRY,
                filters.Country.dropdownOpen,
              )
            }
          >
            <span>{filters.Country.value}</span>
            {filters.Country.dropdownOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </button>
          {filters.Country.dropdownOpen && (
            <DropdownMenu
              type={FilterTypes.COUNTRY}
              options={dropdownOptions[FilterTypes.COUNTRY]}
              pickOption={handlePickDropdownOption}
            />
          )}
        </div>
        <div className="filters-modal__filters__filter status">
          <p>
            <label htmlFor="status">Status</label>
          </p>
          <button
            id="status"
            className="rounded-md dropdown-btn"
            onClick={() =>
              handleToggleDropdown(
                FilterTypes.STATUS,
                filters.Status.dropdownOpen,
              )
            }
          >
            <span>{filters.Status.value}</span>
            {filters.Status.dropdownOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </button>
          {filters.Status.dropdownOpen && (
            <DropdownMenu
              type={FilterTypes.STATUS}
              options={dropdownOptions[FilterTypes.STATUS]}
              pickOption={handlePickDropdownOption}
            />
          )}
        </div>

        <div className="filters-modal__filters__filter language">
          <p>
            <label htmlFor="language">Language</label>
          </p>
          <button
            id="language"
            className="rounded-md dropdown-btn"
            onClick={() =>
              handleToggleDropdown(
                FilterTypes.LANGUAGE,
                filters.Language.dropdownOpen,
              )
            }
          >
            <span>{filters.Language.value}</span>
            {filters.Language.dropdownOpen ? (
              <ArrowUpIcon />
            ) : (
              <ArrowDownIcon />
            )}
          </button>
          {filters.Language.dropdownOpen && (
            <DropdownMenu
              type={FilterTypes.LANGUAGE}
              options={dropdownOptions[FilterTypes.LANGUAGE]}
              pickOption={handlePickDropdownOption}
            />
          )}
        </div>
        <div className="filters-modal__filters__filter type">
          <p>
            <label htmlFor="type">Type</label>
          </p>
          <button
            id="type"
            className="rounded-md dropdown-btn"
            onClick={() =>
              handleToggleDropdown(FilterTypes.TYPE, filters.Type.dropdownOpen)
            }
          >
            <span>{filters.Type.value}</span>
            {filters.Type.dropdownOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </button>
          {filters.Type.dropdownOpen && (
            <DropdownMenu
              type={FilterTypes.TYPE}
              options={dropdownOptions[FilterTypes.TYPE]}
              pickOption={handlePickDropdownOption}
            />
          )}
        </div>
      </div>
      <div className="filters-modal__buttons">
        <button
          className="apply__filters__button"
          onClick={handleClickApplyFilters}
        >
          <span>Apply</span>
        </button>
        <button
          className="clear__filters__button"
          onClick={handleClickClearFilters}
        >
          <span>Clear</span>
        </button>
      </div>
    </div>
  );
}

export default FiltersModal;
