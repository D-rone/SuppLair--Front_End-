import React, { useState } from "react";

const AddProductModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    group: "",
    image: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add product logic here
    onClose();
  };

  if (!isOpen) {
    return null;
  }

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
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 py-2 bg-blue-500">
            <h3
              className="text-lg font-medium leading-6 text-white"
              id="modal-title"
            >
              Add Product
            </h3>
          </div>
          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block mb-2 font-bold text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border border-blue-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="group"
                  className="block mb-2 font-bold text-gray-700"
                >
                  Group
                </label>
                <input
                  type="text"
                  name="group"
                  id="group"
                  value={formData.group}
                  onChange={handleChange}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border border-blue-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between mb-4">
                <label
                  htmlFor="image"
                  className="block mr-2 font-bold text-gray-700"
                >
                  Image
                </label>
                <div className="flex items-center">
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    id="image"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <span>
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="Product Image"
                        className="w-12 h-12 rounded-full"
                      />
                    )}
                  </span>
                  <label
                    htmlFor="image"
                    className="px-4 py-2 ml-2 font-bold text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600"
                  >
                    {/* <DownloadIcon className="inline w-5 h-5" /> */}
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block mb-2 font-bold text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border border-blue-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="quantity"
                  className="block mb-2 font-bold text-gray-700"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border border-blue-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
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

export default AddProductModal;
