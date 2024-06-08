import React, { useEffect, useState } from "react";
import dummyData from "./products.json";
import AddProductPopup from "../../pupups/AddProductPopup";
import UpdateProductPopup from "../../pupups/UpdateProductPopup";
import _defaultPic from "../../../assets/images/noProfilePic.png";
import ProductsTable from "./ProductsTable";
import { supplairAPI } from "../../../utils/axios";
import { ScaleLoader } from "react-spinners";
import Pagination from "../../utils/Pagination";
import Cookies from "universal-cookie";

function Products() {
  const [products, setProducts] = useState([]);

  const [updateProduct, setUpdateProduct] = useState(null);
  const [addProduct, setAddProduct] = useState(false);

  const [loading, setLoading] = useState(true);
  const [updateGet, setUpdateGet] = useState(false);

  const [totalPages, setTotalPages] = useState(1);

  const [page, setPage] = useState(0);

  let makeRequest = (page) => {
    setLoading(true);
    const cookies = new Cookies();
    const storedAccessToken = cookies.get("access_token");

    supplairAPI
      .get("products-srv/query/supplier/myProducts?page=" + page + "&size=8", {
        headers: {
          Authorization: `Bearer ${storedAccessToken}`,
        },
      })
      .then((data) => {
        console.log(data?.data);
        setProducts(data?.data?.content);
        setTotalPages(data?.data?.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        if (Math.floor(err?.response?.status / 100) == 5) toast.error("Server Error");
        else toast.error(err.message);
        setLoading(false);
      });
  };

  const [categories, setCategories] = useState([]);
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    const cookies = new Cookies();
    const storedAccessToken = cookies.get("access_token");

    supplairAPI
      .get("products-srv/query/supplier/myProductsGroups?page=0&size=100", {
        headers: {
          Authorization: `Bearer ${storedAccessToken}`,
        },
      })
      .then((data) => {
        const result = data?.data?.content.reduce((acc, item) => {
          const { categoryId, name, productsGroupId } = item;
          if (!acc[categoryId]) {
            acc[categoryId] = [];
          }
          acc[categoryId].push({ name, productsGroupId });
          return acc;
        }, {});
        setCategories(result);
        setGroups(data?.data?.content);
      })
      .catch((err) => {
        if (Math.floor(err?.response?.status / 100) == 5) toast.error("Server Error");
        else toast.error(err.message);
      });
  }, []);

  useEffect(() => {
    makeRequest(page);
  }, [page, updateGet]);

  const [menuProduct, setMenuProduct] = useState(null);
  const hideProductOptions = () => {
    setMenuProduct(null);
  };

  const [filterStatus, setFilterStatus] = useState("");

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
        {loading ? (
          <div className="h-[70vh] w-full flex items-center justify-center">
            <ScaleLoader />
          </div>
        ) : (
          <ProductsTable
            products={products}
            menuProduct={menuProduct}
            setMenuProduct={setMenuProduct}
            setUpdateProduct={setUpdateProduct}
            groups={groups}
          />
        )}
        <div className="h-16"></div>
        <div className="fixed bg-white bottom-5 right-10">
          <Pagination
            totalPages={totalPages}
            page={page}
            setPage={setPage}
            makeRequest={makeRequest}
          />
        </div>
        {addProduct && (
          <AddProductPopup
            close={setAddProduct}
            categories={categories}
            setUpdateGet={setUpdateGet}
          />
        )}
        {updateProduct && (
          <AddProductPopup
            product={updateProduct}
            close={setUpdateProduct}
            categories={categories}
            setUpdateGet={setUpdateGet}
          />
        )}
      </div>
    </div>
  );
}

export default Products;
