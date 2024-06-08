import React, { useEffect, useReducer, useState } from "react";
import PopUp1 from "./PopUp1";
import { toast } from "react-toastify";
import { FaDownload } from "react-icons/fa6";
import { v4 } from "uuid";
import { fileUpload, supplairAPI } from "../../utils/axios";
import Cookies from "universal-cookie";
import { ClockLoader } from "react-spinners";

function UpdateProductPopup({ close, product, categories, setUpdateGet }) {
  const [updated, setUpdated] = useState(false);
  const updateReducer = (state, newValue) => {
    setUpdated(true);
    return newValue;
  };

  const [formData, setFormData] = useReducer(updateReducer, product);

  const [loading, setLoading] = useState(false);

  const closePopup = () => {
    updated
      ? window.confirm("Are you sure you want to cancel?")
        ? close(null)
        : () => {}
      : close(null);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (updated && !loading) {
      const formDataRequest = new FormData();

      if (formData.imagePaths.length > 0) {
        let paths = formData?.imagePaths.filter((image) => typeof image == "string");
        let files = formData?.imagePaths.filter((image) => typeof image == "object");

        files.forEach((image) => {
          formDataRequest.append("files", image);
        });
        setLoading(true);
        fileUpload
          .post("/api/upload/products", formDataRequest, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            const imagePaths = [...paths, ...response.data];
            const cookies = new Cookies();
            const storedAccessToken = cookies.get("access_token");

            const updateObject = {
              name: product.name == formData.name ? null : formData.name,
              reference: product.reference == formData.reference ? null : formData.reference,
              price: product.price == formData.price ? null : formData.price,
              description:
                product.description == formData.description ? null : formData.description,
              quantity: product.quantity == formData.quantity ? null : formData.quantity,
              minimumQuantity:
                product.minimumQuantity == formData.minimumQuantity
                  ? null
                  : formData.minimumQuantity,
              imagePaths: product.imagePaths == imagePaths ? null : imagePaths,
              discount: product.discount == formData.discount ? null : formData.discount,
            };

            supplairAPI
              .put(
                "/products-srv/command/products_group/" +
                  formData.productsGroupId +
                  "/product/" +
                  formData.productId,
                updateObject,
                {
                  headers: {
                    Authorization: `Bearer ${storedAccessToken}`,
                  },
                }
              )
              .then((response) => {
                toast.success(response.data);
                setUpdateGet((prev) => !prev);
                close(false);
              })
              .catch((err) => {
                toast.error(err.message);
              });
          })
          .catch((err) => {
            toast.error(err.message);
            setUpdated(true);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        toast.error("Each Product should have at least one image");
      }
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

  const [images, setImages] = useReducer(updateReducer, product.imagePaths);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.type.startsWith("image/"));

    if (validFiles.length + images.length > 8) {
      toast.error("Maximum 8 images allowed");
      return;
    }

    const newImages = validFiles.map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
    setFormData({ ...formData, imagePaths: [...formData.imagePaths, ...validFiles] });
  };

  const handleImageDelete = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    const updateFiles = [...formData.imagePaths];
    updateFiles.splice(index, 1);
    setFormData({ ...formData, imagePaths: [...updateFiles] });
  };

  const [addDiscount, setAddDiscount] = useState(product.discount);

  return (
    <PopUp1 closeMe={closePopup} title="Add Product">
      <form onSubmit={handleAddProduct} className="p-4">
        <div className="max-h-[60vh] overflow-y-scroll overflow-x-clip">
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
                  name="minimumQuantity"
                  value={formData.minimumQuantity}
                  onChange={handleChange}
                  className="w-full h-10 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  min="0"
                />
              </div>
            </div>

            {/* Second Column */}
            <div className="flex flex-col gap-4">
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
                <span>Group :</span>
                <select
                  name="productsGroupId"
                  required
                  value={formData.productsGroupId}
                  onChange={handleChange}
                  className="w-full h-10 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Group</option>
                  {Object.entries(categories).map(([category, groups]) => {
                    return (
                      <>
                        <optgroup key={v4()} label={category}>
                          {groups.map((group) => {
                            return (
                              <option key={v4()} value={group.productsGroupId}>
                                {group.name}
                              </option>
                            );
                          })}
                        </optgroup>
                      </>
                    );
                  })}
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
          </div>
          <div className="mt-4">
            <div>
              {addDiscount ? (
                <>
                  <div className="relative border-gray-300 border-2 rounded p-4">
                    <span className="text-lg">Discount :</span>
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                      onClick={() => setAddDiscount(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <div className="flex flex-col">
                      <label>Value</label>
                      <input
                        type="number"
                        required
                        min={0}
                        max={100}
                        value={formData?.discount?.value || 0}
                        name="discount.value"
                        onChange={handleChange}
                        className="w-full h-10 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                      <label>Start Date</label>
                      <input
                        type="date"
                        required
                        value={formData?.discount?.startDate.split("T")[0]}
                        name="discount.startDate"
                        onChange={handleChange}
                        className="w-full h-10 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                      <label>End Date</label>
                      <input
                        type="date"
                        required
                        value={formData?.discount?.endDate.split("T")[0]}
                        name="discount.endDate"
                        onChange={handleChange}
                        className="w-full h-10 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => setAddDiscount(true)}
                  className="rounded border-gray-300 p-2 border-2 bg-gray-200"
                >
                  Add Discount
                </button>
              )}
            </div>

            <div className="flex flex-col mt-4">
              <div className="flex items-center gap-2">
                <span>Image :</span>
                <label
                  htmlFor="image-upload"
                  className="flex items-center justify-center h-10 px-4 border-2 border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:border-blue-500"
                >
                  <FaDownload />
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <div className="flex flex-wrap overflow-x-auto mt-2">
                {images.map((imagePath, index) => (
                  <div
                    key={index}
                    className="relative mr-2 mb-2 size-20"
                    style={{ maxWidth: "25%" }}
                  >
                    <img
                      src={imagePath}
                      alt={`Image ${index}`}
                      className="object-cover w-full h-auto rounded-xl"
                      style={{ aspectRatio: "1 / 1" }}
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      onClick={() => handleImageDelete(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col mt-4">
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

export default UpdateProductPopup;
