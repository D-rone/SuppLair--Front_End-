import React, { useEffect, useState } from "react";
import PopUp1 from "./PopUp1";
import { toast } from "react-toastify";
import { FaDownload } from "react-icons/fa6";
import productsData from "../home/inventory/groupProducts.json";

function AddProductPopup({ close, product }) {
  const [formData, setFormData] = useState({
    name: "",
    group: "",
    image: "",
    price: "",
    quantity: "",
    description: "", 
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

  return (
    <PopUp1 closeMe={closePopup} title="Add Product">
      <div className="p-4">
        <form onSubmit={handleAddProduct}>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>Product Name :</span>
            <input
              type="text"
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
            />
          </div>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>Price :</span>
            <input
              type="number"
              required
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
              min="0"
            />
          </div>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>Quantity :</span>
            <input
              type="number"
              required
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
              min="0"
            />
          </div>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>Group :</span>
            <select
              name="group"
              value={formData.group}
              onChange={handleChange}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
            >
              <option value="">Select Group</option>
              {productsData.map((product) => (
                <option key={product.id} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row gap-1 mb-6 text-sm font-semibold">
            <label htmlFor="image" className="flex items-center gap-2">
              <span>Image :</span>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <span className="flex items-center justify-center h-10 px-6 bg-white border-2 border-gray-400 rounded-lg cursor-pointer w-fit hover:bg-gray-100">
                <FaDownload style={{ fontSize: "1rem" }} className="w-24 " />
              </span>
            </label>
            {formData.image && (
              <img
                src={formData.image}
                alt="Selected Image"
                className="object-cover w-16 h-16 mt-2 rounded-xl"
              />
            )}
          </div>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>Description :</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full h-24 px-6 py-3 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
            />
          </div>

          <div className="flex justify-end gap-5">
            <button
              onClick={closePopup}
              className="cancelBtn"
              type="button"
            >
              Cancel
            </button>
            <input type="submit" value="Save" className="approveBtn" />
          </div>
        </form>
      </div>
    </PopUp1>
  );
}

export default AddProductPopup;
