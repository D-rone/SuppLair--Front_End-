import React, { useEffect, useState } from "react";
import PopUp1 from "./PopUp1";
import { toast } from "react-toastify";
import productsData from "../home/inventory/groupProducts.json";
import { FaDownload } from "react-icons/fa6";

function UpdateProductPopup({ close, product }) {
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
    <PopUp1 closeMe={closePopup} title="Update Product">
      <div className="p-4">
        <form onSubmit={handleUpdateProduct}>
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
                <option key={product.group} value={product.group}>
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
              <span className="w-fit h-10 px-6 border-2 border-gray-400 rounded-lg flex items-center justify-center cursor-pointer bg-white hover:bg-gray-100">
                <FaDownload style={{ fontSize: '1rem' }} className="w-24 " />
              </span>
            </label>
            {formData.image && (
              <img
                src={formData.image}
                alt="Selected an Image"
                className="mt-2 w-16 h-16 object-cover rounded-xl"
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
            <button type="button" onClick={closePopup} className="cancelBtn">
              Cancel
            </button>
            <button type="submit" className="approveBtn">
              Save
            </button>
          </div>
        </form>
      </div>
    </PopUp1>
  );
}

export default UpdateProductPopup;
