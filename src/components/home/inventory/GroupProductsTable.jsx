import React, { useState, useRef, useEffect } from "react";
import groupProductsData from "./groupProducts.json";

const GroupProductsTable = () => {
  const [groupProducts, setGroupProducts] = useState(groupProductsData);
  const [menuOpen, setMenuOpen] = useState(null);
  const menuRef = useRef();

  const toggleMenu = (groupId) => {
    if (menuOpen === groupId) {
      setMenuOpen(null);
    } else {
      setMenuOpen(groupId);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <table className="w-full divide-y divide-gray-200">
        {/* Table headers */}
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Group Product Name
            </th>
            <th className="px-6 py-3"></th> {/* Empty header for menu column */}
          </tr>
        </thead>
        {/* Table body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {groupProducts.map((groupProduct) => (
            <tr key={groupProduct.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {groupProduct.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                <div className="inline-block text-left" ref={menuRef}>
                  <button
                    onClick={() => toggleMenu(groupProduct.id)}
                    type="button"
                    className="inline-flex justify-center rounded-full bg-supplair-primary p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    {/* SVG code provided */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {menuOpen === groupProduct.id && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <button
                          className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                          role="menuitem"
                        >
                          Update
                        </button>
                        <button
                          className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                          role="menuitem"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupProductsTable;
