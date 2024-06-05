import React, { useState } from "react";
import showMore from "../../../assets/images/more.svg";
import { toast } from "react-toastify";

function ProductsTable({ products , menuProduct, setMenuProduct , setUpdateProduct}) {
  const [showDetails, setShowDetails] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const toggleProductDetails = (productId) => {
    setShowDetails((prev) => (prev === productId ? null : productId));
  };

  const showProductOptions = (product) => {
    setMenuProduct(product.productId);
  };

  const toggleDescription = (productId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };
  return (
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
          <React.Fragment key={product.productId}>
            <tr
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
                {menuProduct === product.productId ? (
                  <div className="absolute right-0 z-10 flex flex-col gap-2 p-2 bg-white rounded-lg shadow-sm -top-3 shadow-black h-fit w-fit">
                    <button
                      className="w-40 h-10 px-4 text-lg rounded-lg font-regular hover:text-white hover:bg-supplair-primary text-start"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUpdateProduct(product);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="w-40 h-10 px-4 text-lg rounded-lg font-regular hover:text-white hover:bg-red-500 text-start"
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.success("Product deleted");
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </td>
              <td
                className="w-full h-20 hover:cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  showProductOptions(product);
                }}
              >
                <img src={showMore} alt="" className="w-6" />
              </td>
            </tr>
            {showDetails === product.productId && (
              <tr className="border-b-2 border-gray-300">
                <td colSpan="5" className="p-4 px-32">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <strong>Description:</strong>{" "}
                      {expandedDescriptions[product.productId]
                        ? product.description
                        : `${product.description.substring(0, 10)}...`}
                      <button
                        className="ml-2 text-blue-500 hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDescription(product.productId);
                        }}
                      >
                        {expandedDescriptions[product.productId] ? "Show Less" : "Show More"}
                      </button>
                    </div>
                    <div>
                      <strong>Group:</strong> {product.productsGroupId}
                    </div>
                    <div>
                      <strong>Rating:</strong> {product.rate}/5
                    </div>
                    <div>
                      <strong>Reviews:</strong> {product.numberOfRates}
                    </div>
                    <div>
                      <strong>Reference:</strong> {product.reference}
                    </div>
                    <div>
                      <strong>Discount:</strong>{" "}
                      {product.discount
                        ? `${product.discount.value}% (Valid from ${new Date(
                            product.discount.startDate
                          ).toLocaleDateString()} to ${new Date(
                            product.discount.endDate
                          ).toLocaleDateString()})`
                        : "No Discount"}
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default ProductsTable;
