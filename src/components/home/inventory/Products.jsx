import React, { useEffect, useState } from "react";
import dummyData from "./products.json";
import { toast } from "react-toastify";
import AddProductPopup from "../../pupups/AddProductPopup";
import UpdateProductPopup from "../../pupups/UpdateProductPopup";
import _defaultPic from "../../../assets/images/noProfilePic.png";
import showMore from "../../../assets/images/more.svg";

function Products() {
  const [products, setProducts] = useState(dummyData);
  const [updateProduct, setUpdateProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [addProduct, setAddProduct] = useState(false);
  const [showDetails, setShowDetails] = useState(null);
  const [menuProduct, setMenuProduct] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const toggleProductDetails = (productId) => {
    setShowDetails((prev) => (prev === productId ? null : productId));
  };

  const showProductOptions = (product) => {
    setMenuProduct(product.productId);
  };

  const hideProductOptions = () => {
    setMenuProduct(null);
  };

  const getProducts = () => {
    let filteredProducts = [];
    if (filterStatus === "all") {
      filteredProducts = dummyData;
    } else if (filterStatus === "available") {
      filteredProducts = dummyData.filter((product) => product.quantity > 0);
    } else if (filterStatus === "out_of_stock") {
      filteredProducts = dummyData.filter((product) => product.quantity === 0);
    }
    setProducts(filteredProducts);
  };

  useEffect(() => {
    getProducts();
  }, [filterStatus]);

  useEffect(() => {
    // Update products array whenever there's a change in products state
    // Check if quantity is 0 and set inactive status
    const updatedProducts = products.map((product) => ({
      ...product,
      status: product.quantity === 0 ? "inactive" : "active",
    }));
    setProducts(updatedProducts);
  }, [products]);

  const toggleDescription = (productId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <div onClick={hideProductOptions}>
      <div className="flex items-center h-16 px-8 pt-4 mb-5">
        <label className="py-2 px-4 rounded-lg text-2xl w-fit m-5 bg-white text-gray-800 font-bold shadow-lg dark:shadow-2x">
          <select
            id="selectProductStatus"
            className="text-2xl bg-white text-gray-800 font-bold hover:cursor-pointer"
            onChange={(e) => setFilterStatus(e.target.value)}
            value={filterStatus}
          >
            <option value="all">All Products</option>
            <option value="available">Available Products</option>
            <option value="out_of_stock">Out of Stock Products</option>
          </select>
        </label>
        <div className="flex items-center justify-end w-full">
          <button
            className="h-12 bg-supplair-primary text-xl mr-10 w-72 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            onClick={() => {
              setAddProduct(true);
            }}
          >
            Add Product
          </button>
        </div>
      </div>
      <div>
        <table className="w-[96%] mx-[2%]">
          <thead className="text-gray-400 border-b-2 border-gray-300">
            <tr>
              <th className="font-normal">Product Name</th>
              <th className="font-normal">Price Unit</th>
              <th className="font-normal">Quantity</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <React.Fragment key={product.productId}>
                <tr
                  className={`border-b-2 border-gray-300 h-20 ${
                    product.quantity === 0 ? "bg-gray-200" : ""
                  }`}
                >
                  <td
                    className="flex row p-2 cursor-pointer"
                    onClick={() => toggleProductDetails(product.productId)}
                  >
                    <img
                      src={
                        product.imagePaths && product.imagePaths.length > 0
                          ? product.imagePaths[0]
                          : _defaultPic
                      }
                      className="w-10 h-10 inline rounded-full mr-4"
                      alt={product.name}
                    />
                    <div className="font-regular inline text-supplair-primary">
                      <h3 className="whitespace-no-wrap">{product.name}</h3>
                    </div>
                  </td>
                  <td className="px-6 font whitespace-no-wrap font-regular text-supplair-secondary">
                    <h3 className="inline">{product.price}</h3>
                  </td>
                  <td className="whitespace-no-wrap px-6 font-regular text-supplair-secondary">
                    <h3 className="inline">{product.quantity}</h3>
                  </td>
                  <td className="relative">
                    {menuProduct === product.productId ? (
                      <div className="absolute right-0 z-10 flex flex-col gap-2 p-2 bg-white rounded-lg shadow-sm -top-3 shadow-black h-fit w-fit">
                        <button
                          className="w-40 h-10 px-4 text-lg font-regular rounded-lg hover:text-white hover:bg-supplair-primary text-start"
                          onClick={(e) => {
                            e.stopPropagation();
                            setUpdateProduct(product);
                          }}
                        >
                          Update
                        </button>
                        <button
                          className="w-40 h-10 px-4 text-lg font-regular rounded-lg hover:text-white hover:bg-supplair-primary text-start"
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
                    className="hover:cursor-pointer"
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
                    <td colSpan="5" className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <strong>Description:</strong>{" "}
                          {expandedDescriptions[product.productId]
                            ? product.description
                            : `${product.description.substring(0, 10)}...`}
                          <button
                            className="text-blue-500 hover:underline ml-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDescription(product.productId);
                            }}
                          >
                            {expandedDescriptions[product.productId]
                              ? "Show Less"
                              : "Show More"}
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
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {addProduct && <AddProductPopup close={setAddProduct} />}
        {updateProduct && (
          <UpdateProductPopup product={updateProduct} close={setUpdateProduct} />
        )}
      </div>
    </div>
  );
}

export default Products;
