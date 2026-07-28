import {
  DropdownValues,
  FilterTypes,
  modalFilters,
} from "@/constants/constants";

function loadFiltersModalFilters(filters: DefaultFiltersType) {
  const newFilters = { ...modalFilters };
  Object.entries(filters).forEach(([filterName, filterValues]) => {
    if (!!filterValues.applied.length) {
      newFilters[filterName as FilterTypes] = {
        ...newFilters[filterName as FilterTypes],
        value:
          filterValues.applied.length > 1
            ? `${filterValues.applied[0]} +${filterValues.applied.length - 1}`
            : filterValues.applied[0] || DropdownValues.ALL,
        picked: [...(filterValues?.applied as string[])],
      };
    }
  });
  return newFilters;
}

export { loadFiltersModalFilters };
