import clsx from "clsx";
import { CheckIcon } from "lucide-react";

function DropdownMenu({
  type,
  options,
  tickedOptions,
  pickOption,
}: DropdownMenuProps) {
  return (
    <div className="dropdown">
      <ul>
        {options.map((option) => {
          const isTicked = !!tickedOptions.find(
            (tickedOption) => tickedOption === option,
          );

          return (
            <li key={option}>
              <button
                className={clsx("dropdown__option", {
                  "bg-gray-900": isTicked,
                })}
                onClick={() => pickOption(type, option)}
              >
                {isTicked && <CheckIcon />}
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
