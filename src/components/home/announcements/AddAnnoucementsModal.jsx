import React, { useState } from "react";
import productsData from "../inventory/products.json";

const AddGroupProductModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    beginDate: "",
    endDate: "",
    description: "",
    products: [{ productId: "", deal: "" }],
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "productId" || name === "deal") {
      const products = [...formData.products];
      products[index][name] = value;
      setFormData({ ...formData, products });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddProduct = () => {
    setFormData({
      ...formData,
      products: [...formData.products, { productId: "", deal: "" }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add group product logic here
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Modal content */}
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        {/* Modal panel */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {/* Modal header */}
          <div className="bg-blue-500 px-4 py-2">
            <h3 className="text-lg leading-6 font-medium text-white">
              Add Group Product
            </h3>
          </div>

          {/* Modal body */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
              <label
                  htmlFor="endDate"
                  className="block text-gray-700 font-bold mb-2"
                >
                  begin Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="endDate"
                  className="block text-gray-700 font-bold mb-2"
                >
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="products"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Products
                </label>
                {formData.products.map((product, index) => (
                  <div key={index} className="flex mb-2">
                    <select
                      name="productId"
                      value={product.productId}
                      onChange={(e) => handleChange(e, index)}
                      className="border border-blue-500 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                    >
                      <option value="">Select Product</option>
                      {productsData.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      name="deal"
                      value={product.deal}
                      onChange={(e) => handleChange(e, index)}
                      placeholder="Deal"
                      className="border border-blue-500 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                    />
                    {index === formData.products.length - 1 && (
                      <button
                        type="button"
                        onClick={handleAddProduct}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        +
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGroupProductModal;
