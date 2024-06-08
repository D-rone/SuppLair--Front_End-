import React, { useState } from "react";

const AddRoleModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    sales: false,
    inventory: false,
    announcements: false,
    users: false,
    roles: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add role logic here
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
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-blue-500 px-4 py-2">
            <h3
              className="text-lg leading-6 font-medium text-white"
              id="modal-title"
            >
              Add Role
            </h3>
          </div>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Role Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4 flex flex-col">
                <p className="block text-gray-700 font-bold mb-2">Access Rights</p>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="checkbox"
                    name="sales"
                    checked={formData.sales}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-blue-500"
                  />
                  <span className="ml-2">Sales</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="checkbox"
                    name="inventory"
                    checked={formData.inventory}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-blue-500"
                  />
                  <span className="ml-2">Inventory</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="checkbox"
                    name="announcements"
                    checked={formData.announcements}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-blue-500"
                  />
                  <span className="ml-2">Announcements</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="checkbox"
                    name="users"
                    checked={formData.users}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-blue-500"
                  />
                  <span className="ml-2">Users</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="checkbox"
                    name="roles"
                    checked={formData.roles}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-blue-500"
                  />
                  <span className="ml-2">Roles</span>
                </label>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
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

export default AddRoleModal;
