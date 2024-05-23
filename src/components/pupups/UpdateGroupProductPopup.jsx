import React, { useState } from "react";
import PopUp1 from "./PopUp1";
import categoriesData from "../home/inventory/groupProducts.json"; // Importing categories JSON data

const UpdateGroupProductPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic here to handle form submission
    onClose();
  };

  return (
    <PopUp1 closeMe={onClose} title="Update Group Product">
      <form onSubmit={handleSubmit}>
        <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="w-full mt-3 text-center sm:mt-0 sm:text-left">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  value={formData.name}
                  className="block w-full p-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                {/* Select field populated with categories */}
                <select
                  name="category"
                  id="category"
                  onChange={handleChange}
                  value={formData.category}
                  className="block w-full p-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  {categoriesData.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-5">
          <button
            onClick={onClose}
            type="button"
            className="cancelBtn "
          >
            Cancel
          </button>
        <input type="submit" value="Save" className="approveBtn" />
        </div>
      </form>
    </PopUp1>
  );
};

export default UpdateGroupProductPopup;
