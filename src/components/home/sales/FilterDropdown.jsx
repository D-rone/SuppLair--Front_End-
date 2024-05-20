import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const FilterDropdown = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("ALL");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onFilterChange(option);
    setIsOpen(false);
  };

  return (
    <div className="ml-4 relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          <FontAwesomeIcon
            icon={faChevronDown}
            className="text-supplair-primary "
          />
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <button
              className={`text-gray-700 block px-4 py-2 text-sm ${
                selectedOption === "ALL" ? "bg-gray-100" : ""
              }`}
              role="menuitem"
              tabIndex="-1"
              onClick={() => handleOptionClick("ALL")}
            >
              ALL
            </button>
            <button
              className={`text-gray-700 block px-4 py-2 text-sm ${
                selectedOption === "PENDING" ? "bg-gray-100" : ""
              }`}
              role="menuitem"
              tabIndex="-1"
              onClick={() => handleOptionClick("PENDING")}
            >
              PENDING
            </button>
            <button
              className={`text-gray-700 block px-4 py-2 text-sm ${
                selectedOption === "ACCEPTED" ? "bg-gray-100" : ""
              }`}
              role="menuitem"
              tabIndex="-1"
              onClick={() => handleOptionClick("ACCEPTED")}
            >
              ACCEPTED
            </button>
            <button
              className={`text-gray-700 block px-4 py-2 text-sm ${
                selectedOption === "REFUSED" ? "bg-gray-100" : ""
              }`}
              role="menuitem"
              tabIndex="-1"
              onClick={() => handleOptionClick("REFUSED")}
            >
              REFUSED
            </button>
            <button
              className={`text-gray-700 block px-4 py-2 text-sm ${
                selectedOption === "ORDERED" ? "bg-gray-100" : ""
              }`}
              role="menuitem"
              tabIndex="-1"
              onClick={() => handleOptionClick("ORDERED")}
            >
              ORDERED
            </button>
            <button
              className={`text-gray-700 block px-4 py-2 text-sm ${
                selectedOption === "PAYED" ? "bg-gray-100" : ""
              }`}
              role="menuitem"
              tabIndex="-1"
              onClick={() => handleOptionClick("PAYED")}
            >
              PAYED
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
