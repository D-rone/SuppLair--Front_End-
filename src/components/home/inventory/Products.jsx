import React, { useEffect, useState } from "react";
import dummyData from "./products.json";
import AddProductPopup from "../../pupups/AddProductPopup";
import UpdateProductPopup from "../../pupups/UpdateProductPopup";
import _defaultPic from "../../../assets/images/noProfilePic.png";
import ProductsTable from "./ProductsTable";

function Products() {
  const [products, setProducts] = useState(dummyData);
  const [updateProduct, setUpdateProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [addProduct, setAddProduct] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");


  const hideProductOptions = () => {
    setMenuProduct(null);
  };

  const getProducts = () => {
    let filteredProducts = [];
    if (filterStatus === "all") {
      filteredProducts = dummyData;
    } else if (filterStatus === "available") {
      filteredProducts = dummyData.filter((product) => product.quantity > product.minimumQuantity);
    } else if (filterStatus === "out_of_stock") {
      filteredProducts = dummyData.filter((product) => product.quantity < product.minimumQuantity);
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
      status: product.quantity < product.minimumQuantity ? "inactive" : "active",
    }));
    setProducts(updatedProducts);
  }, [products]);



  return (
    <div onClick={hideProductOptions}>
      <div className="flex items-center h-16 px-8 pt-4 mb-5">
        <label className="px-4 py-2 m-5 text-2xl font-bold text-gray-800 bg-white rounded-lg shadow-lg w-fit dark:shadow-2x">
          <select
            id="selectProductStatus"
            className="text-2xl font-bold text-gray-800 bg-white hover:cursor-pointer"
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
            className="h-12 px-4 py-2 mr-10 font-bold text-white rounded-lg bg-supplair-primary w-72 hover:bg-blue-600"
            onClick={() => {
              setAddProduct(true);
            }}
          >
            Add Product
          </button>
        </div>
      </div>
      <div>
        <ProductsTable products={products} />
        {addProduct && <AddProductPopup close={setAddProduct} />}
        {updateProduct && <UpdateProductPopup product={updateProduct} close={setUpdateProduct} />}
      </div>
    </div>
  );
}

export default Products;
