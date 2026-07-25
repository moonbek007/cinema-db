import { FilterTypes } from "@/constants/constants";
import { StarIcon } from "lucide-react";

function DropdownMenu({ options }: DropdownMenuProps) {
  return (
    <div className="dropdown">
      <ul>
        {options.map((option) => {
          return (
            <li key={option}>
              <button className="dropdown__option">
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
