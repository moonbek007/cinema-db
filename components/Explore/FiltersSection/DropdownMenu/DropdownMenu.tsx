import { FilterTypes } from "@/constants/constants";
import { StarIcon } from "lucide-react";

function DropdownMenu({ type, options, pickOption }: DropdownMenuProps) {
  return (
    <div className="dropdown">
      <ul>
        {options.map((option) => {
          return (
            <li key={option}>
              <button
                className="dropdown__option"
                onClick={() => pickOption(type, option)}
              >
                {option === FilterTypes.RATING && <StarIcon />}
                {option}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DropdownMenu;
