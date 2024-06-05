import React, { useEffect, useReducer, useState } from "react";
import PopUp1 from "./PopUp1";
import { toast } from "react-toastify";
import { FaDownload } from "react-icons/fa6";
import productsData from "./../home/inventory/products.json";

function AddProductPopup({ close, product }) {
  const [updated, setUpdated] = useState(false);
  const updateReducer = (state, newValue) => {
    setUpdated(true);
    return newValue;
  };

  const [formData, setFormData] = useReducer(updateReducer, {
    name: "",
    reference: "",
    price: 0,
    description: "",
    quantity: 0,
    minimumQuantity: 0,
    imagePaths: [],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData(product);
      setUpdated(false);
    }
  }, [product]);

  const closePopup = () => {
    updated
      ? window.confirm("Are you sure you want to cancel?")
        ? close(null)
        : () => {}
      : close(null);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    console.log(product);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  // we need to handle multiple images
  
  const [images, setImages] = useState([]);

  let handleImageChange = (e) => {

  };


  return (
    <PopUp1 closeMe={closePopup} title="Add Product">
      <form onSubmit={handleAddProduct} className="p-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
              <span>Available Quantity :</span>

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
              <span>Minimum Sell Quantity :</span>
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
          </div>

          {/* Second Column */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span>Group :</span>
              <select
                name="group"
                value={formData.group}
                onChange={handleChange}
                className="w-full h-10 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Group</option>
                {[].map((product) => (
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
            <div className="flex items-center gap-2">
              <span>image :</span>
              <label
                htmlFor="image-upload"
                className="flex items-center justify-center w-1/5 h-10 px-4 border-2 border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:border-blue-500"
              >
                <div className="absolute">
                  <FaDownload />
                </div>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
                className="hidden"
              />
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

        <div className="flex justify-end gap-5 mt-6">
          <button onClick={closePopup} className="cancelBtn" type="button">
            Cancel
          </button>
          <input
            type="submit"
            value="Save"
            className={`${updated || loading ? `hover:cursor-pointer approveBtn` : "cancelBtn"} `}
          />
          {loading ? (
            <div className="pt-[6px]">
              <ClockLoader size={"30px"} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </form>
    </PopUp1>
  );
}

export default AddProductPopup;
