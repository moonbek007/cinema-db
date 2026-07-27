"use client";

import { useState } from "react";
import { ArrowDownIcon, ArrowUpIcon, XIcon } from "lucide-react";

import DropdownMenu from "./DropdownMenu/DropdownMenu";

import {
  defaultFilters,
  dropdownOptions,
  DropdownValues,
  FilterTypes,
} from "@/constants/constants";
import "../../../css/filters.css";

function FiltersModal({ closeModal }: FiltersModalProps) {
  const [filters, setFilters] = useState(defaultFilters);

  const handlePickDropdownOption = (type: FilterTypes, option: string) => {
    // When dropdown type is 'Rating', only one option can be picked
    if (type === FilterTypes.RATING) {
      setFilters((state) => {
        return {
          ...state,
          [type]: {
            ...state[type],
            value: option,
            picked: [option],
            dropdownOpen: false,
          },
        };
      });

      return;
    }

    // When dropdown option is 'All' is picked, dropdown must close
    if (option === DropdownValues.ALL) {
      setFilters((state) => {
        return {
          ...state,
          [type]: {
            ...state[type],
            value: option,
            picked: [],
            dropdownOpen: false,
          },
        };
      });

      return;
    }

    // When dropdown option is already ticked, it should be unticked and removed from 'picked' array
    if (filters[type].picked.find((pickedOption) => pickedOption === option)) {
      setFilters((state) => {
        const newPicked = filters[type].picked.filter(
          (pickedOption) => pickedOption !== option,
        );

        return {
          ...state,
          [type]: {
            ...state[type],
            value:
              newPicked.length > 1
                ? `${newPicked[0]} +${newPicked.length - 1}`
                : newPicked.length === 1
                  ? newPicked[0]
                  : DropdownValues.ALL,
            picked: newPicked,
          },
        };
      });

      return;
    }

    // When new dropdown option is picked, it should be added to 'picked' array
    setFilters((state) => {
      const newPicked = [...state[type].picked];
      newPicked.push(option);

      return {
        ...state,
        [type]: {
          ...state[type],
          value:
            newPicked.length > 1
              ? `${newPicked[0]} +${newPicked.length - 1}`
              : option,
          picked: newPicked,
        },
      };
    });
  };

  const handleToggleDropdown = (type: FilterTypes, isOpen: boolean) => {
    setFilters((state) => {
      const newState = { ...state };
      const filters = Object.keys(newState) as FilterTypes[];

      // Close all other dropdown and toggle the chosen one afterwards
      filters.forEach((filter: FilterTypes) => {
        if (filter === type) {
          newState[type] = {
            ...newState[type],
            dropdownOpen: !isOpen,
          };
        } else {
          newState[filter] = {
            ...newState[filter],
            dropdownOpen: false,
          };
        }
      });

      return { ...newState };
    });
  };

  const handleCloseFiltersModal = () => {
    closeModal();
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
          onClick={() => handleCloseFiltersModal()}
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
            <span>{filters.Rating.value}</span>
            {filters.Rating.dropdownOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </button>
          {filters.Rating.dropdownOpen && (
            <DropdownMenu
              type={FilterTypes.RATING}
              options={dropdownOptions[FilterTypes.RATING]}
              tickedOptions={filters.Rating.picked}
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
              tickedOptions={filters.Country.picked}
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
              tickedOptions={filters.Status.picked}
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
              tickedOptions={filters.Language.picked}
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
              tickedOptions={filters.Type.picked}
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
