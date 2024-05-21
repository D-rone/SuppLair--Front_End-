import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const ClientFilter = ({ onFilterChange }) => {
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
          className="inline-flex justify-between items-center rounded-md border   px-2 py-2 text-sm font-medium   hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          id="menu-button"
          aria-expanded={isOpen}
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
                selectedOption === "Active" ? "bg-gray-100" : ""
              }`}
              role="menuitem"
              tabIndex="-1"
              onClick={() => handleOptionClick("Active")}
            >
              Active
            </button>
            <button
              className={`text-gray-700 block px-4 py-2 text-sm ${
                selectedOption === "Inactive" ? "bg-gray-100" : ""
              }`}
              role="menuitem"
              tabIndex="-1"
              onClick={() => handleOptionClick("Inactive")}
            >
              Inactive
            </button>
            <button
              className={`text-gray-700 block px-4 py-2 text-sm ${
                selectedOption === "Blocked" ? "bg-gray-100" : ""
              }`}
              role="menuitem"
              tabIndex="-1"
              onClick={() => handleOptionClick("Blocked")}
            >
              Blocked
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientFilter;
