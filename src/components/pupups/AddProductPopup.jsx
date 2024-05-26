import React, { useEffect, useState } from "react";
import PopUp1 from "./PopUp1";
import { toast } from "react-toastify";
import productsData from "../home/inventory/groupProducts.json";
import { FaDownload } from "react-icons/fa";

function AddProductPopup({ close, product }) {
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
    if (!formData.name && !formData.price && !formData.quantity) {
      close(null);
    } else if (window.confirm("Are you sure you want to cancel?")) {
      close(null);
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    // Validation logic
    if (formData.name.trim().length < 3) {
      toast.error("Invalid Product Name");
    } else {
      close(formData);
      toast.success(product ? "Product updated" : "Product added");
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
    <PopUp1 closeMe={closePopup} title="Add Product">
      <form onSubmit={handleAddProduct} className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* First Column */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span>Product Name :</span>
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
              <span>Price :</span>
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
              <span>Quantity :</span>
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
              <span>Group :</span>
              <select
                name="group"
                value={formData.group}
                onChange={handleChange}
                className="w-full h-10 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Group</option>
                {productsData.map((product) => (
                  <option key={product.id} value={product.name}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <span>Reference :</span>
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
              <span>Discount Value :</span>
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
                <span>Discount Start Date :</span>
                <input
                  type="date"
                  name="discount.startDate"
                  value={formData.discount.startDate}
                  onChange={handleChange}
                  className="w-full h-10 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <span>Discount End Date :</span>
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
              <span>image :</span>
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
                    alt="Product Preview"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <a
                    href={formData.image}
                    download
                    className="absolute bottom-0 right-0 p-1 bg-gray-800 rounded-full text-white"
                  >
                  </a>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <span>Description :</span>
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
            onClick={closePopup}
            className="px-4 py-2 bg-gray-400 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none"
            type="button"
          >
            Cancel
          </button>
          <input
            type="submit"
            value="Save"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
          />
        </div>
      </form>
    </PopUp1>
  );
}

export default AddProductPopup;
