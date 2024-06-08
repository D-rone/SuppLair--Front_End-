import React, { useState } from "react";
import showMore from "../../../assets/images/more.svg";
import { toast } from "react-toastify";

function ProductsTable({ products, menuProduct, setMenuProduct, setUpdateProduct, groups }) {
  const [showDetails, setShowDetails] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);
  const [showOptions, setShowOptions] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleProductDetails = (productId) => {
    setShowDetails(productId);
    setShowSidebar(true);
    setShowOptions(null);
  };

  const showProductOptions = (product) => {
    setSelectedProduct(product.productId);
  };

  const toggleDescription = (productId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const getDiscountStatus = (discount) => {
    if (!discount) return "No Discount";
    const currentDate = new Date();
    const startDate = new Date(discount.startDate);
    const endDate = new Date(discount.endDate);
    if (currentDate < startDate) return "Not Started";
    if (currentDate > endDate) return "Ended";
    return "Active";
  };

  return (
    <div className="flex relative">
      <table className="w-[96%] mx-[2%]">
        <thead className="text-gray-400 border-b-2 border-gray-300">
          <tr>
            <th className="font-normal w-[55%]">Product Name</th>
            <th className="font-normal w-[15%]">Price Unit</th>
            <th className="font-normal w-[20%]">Quantity</th>
            <th className="px-6 py-3 w-[5%]"></th>
            <th className="px-6 py-3 w-[5%]"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.productId}
              className={`border-b-2 border-gray-300 h-20 ${
                product.quantity < product.minimumQuantity ? "bg-gray-200" : ""
              }`}
            >
              <td
                className="flex items-center h-20 p-2 cursor-pointer row"
                onClick={() => toggleProductDetails(product.productId)}
              >
                <img
                  src={
                    product.imagePaths && product.imagePaths.length > 0
                      ? product.imagePaths[0]
                      : _defaultPic
                  }
                  className="inline w-16 h-16 mx-6 rounded-sm"
                />
                <div className="inline text-xl font-semibold text-supplair-primary">
                  <h3 className="whitespace-no-wrap">
                    {product.name.length < 50
                      ? product.name
                      : `${product.name.substring(0, 46)}...`}
                  </h3>
                </div>
              </td>
              <td className="px-6 text-xl font-semibold text-center whitespace-no-wrap font font-regular text-supplair-secondary">
                <h3 className="inline">
                  {product.price} <span className="text-sm font-normal">.DA</span>
                </h3>
              </td>
              <td className="px-6 text-xl font-semibold text-center whitespace-no-wrap text-supplair-secondary">
                <h3 className="inline">{product.quantity}</h3>
              </td>
              <td className="relative">
                {selectedProduct === product.productId ? (
                  <div className="absolute right-0 z-10 flex flex-col gap-2 p-2 bg-white rounded-lg shadow-sm -top-3 shadow-black h-fit w-fit">
                    <button
                      className="w-40 h-10 px-4 text-lg rounded-lg font-regular hover:text-white hover:bg-supplair-primary text-start"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUpdateProduct(product);
                        setSelectedProduct(null); // Close the options menu after clicking "Update"
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="w-40 h-10 px-4 text-lg rounded-lg font-regular hover:text-white hover:bg-red-500 text-start"
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.success("Product deleted");
                        setSelectedProduct(null); // Close the options menu after clicking "Delete"
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <img
                    src={showMore}
                    alt=""
                    className="w-6 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      showProductOptions(product);
                    }}
                  />
                )}
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className={`fixed z-10 pt-12 top-0 right-0 h-full bg-white shadow-lg transition-all duration-300 overflow-auto ${
          showSidebar ? "w-2/4" : "w-0"
        }`}
      >
        <div className="relative h-full overflow-y-scroll">
          {products.map((product) => {
            const productsGroup = groups.find(
              (group) => group.productsGroupId == product.productsGroupId
            );
            return showDetails === product.productId ? (
              <div key={product.productId} className="p-8 h-full overflow-y-scroll">
                <h1 className="text-4xl font-semibold text-supplair-primary mb-4">
                  {product.name}
                </h1>
                <div className="p-10">
                  <div className="mb-4">
                    <strong>Price:</strong> {product.price} DA
                  </div>
                  <div className="mb-4">
                    <strong>Images:</strong>
                    <div className="flex flex-wrap mt-2" style={{ maxWidth: "100%" }}>
                      {product.imagePaths &&
                        product.imagePaths.slice(0, 8).map((imagePath, index) => (
                          <div key={index} className="p-1 max-h-32">
                            <a href={imagePath} target="_blank">
                              <img
                                src={imagePath}
                                alt={`Image ${index}`}
                                className="h-32 py-1 max-w-[300px] rounded"
                              />
                            </a>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <strong>Discount:</strong>{" "}
                    {product.discount ? (
                      <>
                        {product.discount.value}% (Status:{" "}
                        <strong>{getDiscountStatus(product.discount)}</strong>, from{" "}
                        {new Date(product.discount.startDate).toLocaleDateString()} to{" "}
                        {new Date(product.discount.endDate).toLocaleDateString()})
                      </>
                    ) : (
                      "No Discount"
                    )}
                  </div>
                  <div className="mb-4">
                    <strong>Category:</strong> {productsGroup.categoryId}
                  </div>
                  <div className="mb-4">
                    <strong>Product Group:</strong> {productsGroup.name}
                  </div>
                  <div className="mb-4">
                    <strong>Reference:</strong> {product.reference}
                  </div>
                  <div className="mb-4">
                    <strong>Quantity:</strong> {product.quantity}
                  </div>
                  <div className="mb-4">
                    <strong>Minimum Quantity:</strong> {product.minimumQuantity}
                  </div>
                  <div className="mb-4">
                    <strong>Description:</strong> {product.description}
                  </div>
                </div>
              </div>
            ) : null;
          })}
          <button
            className="absolute bottom-4 left-4 bg-supplair-primary text-white px-4 py-2 rounded"
            onClick={() => {
              setShowDetails(null);
              setShowSidebar(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductsTable;
