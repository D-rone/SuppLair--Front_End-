import React, { useState, useRef, useEffect } from "react";
import productsData from "./products.json";

const ProductsTable = () => {
  const [menuOpen, setMenuOpen] = useState(null);
  const menuRef = useRef();

  const toggleMenu = (productId) => {
    if (menuOpen === productId) {
      setMenuOpen(null);
    } else {
      setMenuOpen(productId);
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
    <div className="container mx-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price Unit
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Group
            </th>
            <th className="px-6 py-3"></th> 
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {productsData.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12">
                    <img
                      className="h-12 w-12 rounded-full border-2 border-supplair-primary"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-supplair-primary">
                      {product.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                {product.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                {product.quantity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                {product.group}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                <div className="inline-block text-left" ref={menuRef}>
                  <button
                    onClick={() => toggleMenu(product.id)}
                    type="button"
                    className="inline-flex justify-center rounded-full bg-supplair-primary p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    
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

                  {menuOpen === product.id && (
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

export default ProductsTable;
