import axios from "axios";
import React, { useState } from "react";

const AddGroupProductModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) {
    return null;
  }

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/command/products_group", {
        productsGroupId: "105",
        name: formData.name,
      })
      .catch((err) => {
        console.log(err);
      });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-10 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          aria-hidden="true"
        ></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 py-2 bg-blue-500">
            <h3 className="text-lg font-medium leading-6 text-white" id="modal-title">
              Add Group Product
            </h3>
          </div>
          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <form onSubmit={submitForm}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 font-bold text-gray-700">
                  Name
                </label>
                {/* <form onSubmit={submitForm}> */}
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border border-blue-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
                {/* </form> */}
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 ml-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
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
