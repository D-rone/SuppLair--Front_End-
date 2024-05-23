import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

const ProductsTable = () => {
  const [menuOpen, setMenuOpen] = useState(null);
  const menuRef = useRef();
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8090/query/products?page=0&limit=3")
      .then((snapshot) => {
        setProductsData(snapshot.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Product
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Price Unit
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Quantity
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Group
            </th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {productsData.map((product) => (
            <tr key={product.productId}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-12 h-12">
                    <img
                      className="w-12 h-12 border-2 rounded-full border-supplair-primary"
                      src={product?.image}
                      alt={product.name}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-supplair-primary">{product.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{product.price}</td>
              <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{product.qte}</td>
              <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{product?.group}</td>
              <td className="relative px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                <div className="inline-block text-left" ref={menuRef}>
                  <button
                    onClick={() => toggleMenu(product?.productId)}
                    type="button"
                    className="inline-flex justify-center p-2 text-white rounded-full bg-supplair-primary focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
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

                  {menuOpen === product.product?.productId && (
                    <div className="absolute right-0 z-50 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
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
