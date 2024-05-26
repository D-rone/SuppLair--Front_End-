import React, { useEffect, useState } from "react";
import PopUp1 from "./PopUp1";
import { toast } from "react-toastify";
import productsData from "../home/inventory/groupProducts.json";
import { FaDownload } from "react-icons/fa";

function UpdateProductPopup({ close, product }) {
  const [formData, setFormData] = useState({
    name: "",
    group: "",
    image: "",
    price: "",
    quantity: "",
    description: "",
    reference: "",
    discount: {
      value: 0,
      startDate: "",
      endDate: "",
    },
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const closePopup = () => {
    close(null);
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();

    // Validation logic
    if (formData.name.trim().length < 3) {
      toast.error("Invalid Product Name");
    } else {
      close(formData);
      toast.success("Product updated");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("discount.")) {
      const discountField = name.split(".")[1];
      setFormData({
        ...formData,
        discount: {
          ...formData.discount,
          [discountField]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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

  return (
    <PopUp1 closeMe={closePopup} title="Update Product">
      <div className="p-4">
        <form onSubmit={handleUpdateProduct}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* First Column */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Product Name:</span>
                <input
                  type="text"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-10 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Price:</span>
                <input
                  type="number"
                  required
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full h-10 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  min="0"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Quantity:</span>
                <input
                  type="number"
                  required
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full h-10 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  min="0"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Group:</span>
                <select
                  name="group"
                  value={formData.group}
                  onChange={handleChange}
                  className="w-full h-10 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Group</option>
                  {productsData.map((product) => (
                    <option key={product.group} value={product.group}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Reference:</span>
                <input
                  type="text"
                  name="reference"
                  value={formData.reference}
                  onChange={handleChange}
                  className="w-full h-10 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Second Column */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Discount Value:</span>
                <input
                  type="number"
                  name="discount.value"
                  value={formData.discount.value}
                  onChange={handleChange}
                  className="w-full h-10 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  min="0"
                  max="100"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    Discount Start Date:
                  </span>
                  <input
                    type="date"
                    name="discount.startDate"
                    value={formData.discount.startDate}
                    onChange={handleChange}
                    className="w-full h-10 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    Discount End Date:
                  </span>
                  <input
                    type="date"
                    name="discount.endDate"
                    value={formData.discount.endDate}
                    onChange={handleChange}
                    className="w-full h-10 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">Image:</span>
                <label
                  htmlFor="image-upload"
                  className="w-1/5 h-10 px-4 border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer focus:outline-none focus:border-blue-500"
                >
                  <FaDownload />
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {formData.image && (
                  <div className="relative">
                    <img
                      src={formData.image}
                      alt="Selected an Image"
                      className="mt-2 w-16 h-16 object-cover rounded-xl"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Description:</span>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full h-24 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-5 mt-4">
            <button
              type="button"
              onClick={closePopup}
              className="px-4 py-2 bg-gray-400 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </PopUp1>
  );
}

export default UpdateProductPopup;
