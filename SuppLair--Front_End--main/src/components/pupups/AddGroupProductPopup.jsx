import React, { useState } from "react";
import PopUp1 from "./PopUp1";

let categoriesData = [
  {
    id: "1",
    name: "name",
  },
  {
    id: "2",
    name: "name2",
  },
];

const AddGroupProductPopup = ({ isOpen, onClose }) => {
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
    <PopUp1 closeMe={onClose} title="Add Group Product">
      <form onSubmit={handleSubmit}>
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
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
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
        <div className="flex justify-end gap-5">
          <button onClick={onClose} type="button" className="cancelBtn ">
            Cancel
          </button>
          <input type="submit" value="Save" className="approveBtn" />
        </div>
      </form>
    </PopUp1>
  );
};

export default AddGroupProductPopup;
