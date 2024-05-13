import React, { useEffect, useState } from "react";
import dummyData from "./products.json";
import { toast } from "react-toastify";
import AddProductPopup from "../../pupups/AddProductPopup";
import UpdateProductPopup from "../../pupups/UpdateProductPopup";
import _defualtPic from "../../../assets/images/noProfilePic.png";
import showMore from "../../../assets/images/more.svg";

function Products() {
  const [products, setProducts] = useState(dummyData.products);
  const [updateProduct, setUpdateProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [addProduct, setAddProduct] = useState(false);
  const [showDetails, setShowDetails] = useState(null);

  const showProductOptions = (product) => {
    setUpdateProduct(product);
    setDeleteProduct(product);
  };

  const hideProductOptions = () => {
    setShowDetails(null);
  };

  return (
    <div onClick={hideProductOptions}>
      <div className="flex items-center h-16 px-8 pt-4 mb-5">
        <h1 className="py-2 px-4 rounded-lg text-2xl w-fit m-5 bg-white text-gray-800 font-bold shadow-lg dark:shadow-2x">Products</h1>
        <div className="flex items-center justify-end w-full">
          <button
            className="h-12 bg-supplair-primary text-xl mr-10 w-72  hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg "
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
              <th className="font-normal">
                Product Name
              </th>
              <th className="font-normal">
                Price Unit
              </th>
              <th className="font-normal">
                Quantity
              </th>
              <th className="font-normal">
                Group
              </th>
              <th className="font-normal">
                Description
              </th>
              <th className="font-normal">
                Rating
              </th>
              <th className="font-normal">
                Reviews
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody >
            {products.map((product) => (
              <tr className={"border-b-2 border-gray-300 h-20"} key={product.id}>
                <td className="flex row p-2">
                  <img src={product.image}  className="w-10 h-10 inline rounded-full mr-4" />
                  <div className="font-regular inline text-supplair-primary">
                    <h3 className=" whitespace-no-wrap">{product.name}</h3>
                  </div>
                </td>
                <td className=" px-6 font whitespace-no-wrap font-regular text-supplair-secondary">
                  <h3 className="inline">{product.price}</h3>
                </td>
                <td className=" whitespace-no-wrap px-6 font-regular text-supplair-secondary">
                  <h3 className="inline">{product.quantity}</h3>
                </td>
                <td className=" whitespace-no-wrap px-6 font-regular text-supplair-secondary">
                  <h3 className="inline">{product.group}</h3>
                </td>
                <td className=" font-regular text-sm text-supplair-secondary">
                  <h3 className="">{product.description}</h3>
                </td>
                <td className=" whitespace-no-wrap px-6 font-regular text-supplair-secondary">
                  <h3 className="inline">{product.rating}/5</h3>
                </td>
                <td className=" whitespace-no-wrap px-6 font-regular text-supplair-secondary">
                  <h3 className="inline">{product.reviews}</h3>
                </td>
                <td className="relative">
                  {showDetails === product.id ? (
                    <div className="absolute right-0 z-10 flex flex-col gap-2 p-2 bg-white rounded-lg shadow-sm -top-3 shadow-black h-fit w-fit">
                      <button
                        className="w-40 h-10 px-4 text-lg font-regular rounded-lg hover:text-white hover:bg-supplair-primary text-start"
                        onClick={(e) => {
                          e.stopPropagation();
                          showProductOptions(product);
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
                    setShowDetails(product.id);
                  }}
                >
                  <img src={showMore} alt="" className="w-16" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {addProduct ? <AddProductPopup close={setAddProduct} /> : null}
        {updateProduct ? <UpdateProductPopup product={updateProduct} close={setUpdateProduct} /> : <></>}
      </div>
    </div>
  );
}

export default Products;
