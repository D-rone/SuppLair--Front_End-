import React, { useState } from "react";
import dummyData from "./groupProducts.json";
import productsData from "./products.json";
import { toast } from "react-toastify";
import AddGroupProductPopup from "../../pupups/AddGroupProductPopup";
import UpdateGroupProductPopup from "../../pupups/UpdateGroupProductPopup";
import _defaultPic from "../../../assets/images/noProfilePic.png";
import moreIcon from "../../../assets/images/more.svg";

function GroupProducts() {
  const [groupProducts, setGroupProducts] = useState(dummyData);
  const [updateGroupProduct, setUpdateGroupProduct] = useState(null);
  const [deleteGroupProduct, setDeleteGroupProduct] = useState(null);
  const [expandedGroupId, setExpandedGroupId] = useState(null);
  const [showOptionsForId, setShowOptionsForId] = useState(null);
  const [showAddGroupProductPopup, setShowAddGroupProductPopup] = useState(false);
  const [showUpdateGroupProductPopup, setShowUpdateGroupProductPopup] = useState(false);

  const handleShowProducts = (groupId) => {
    if (expandedGroupId === groupId) {
      setExpandedGroupId(null);
    } else {
      setExpandedGroupId(groupId);
    }
  };

  const handleShowOptions = (groupId, product) => {
    setShowOptionsForId(groupId);
    setUpdateGroupProduct(product);
    setDeleteGroupProduct(product);
  };

  const handleHideOptions = () => {
    setShowOptionsForId(null);
    setUpdateGroupProduct(null);
    setDeleteGroupProduct(null);
  };

  const handleAddGroupProduct = () => {
    setShowAddGroupProductPopup(true);
  };

  const handleUpdateGroupProduct = (product) => {
    setUpdateGroupProduct(product);
    setShowUpdateGroupProductPopup(true);
  };

  const renderProducts = (productsIds) => {
    return (
      <table className="w-full mt-2 border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {productsIds.map((productId) => {
            const product = findProductById(productId);
            if (!product) return null;
            return (
              <tr key={product.productId} className="border-b border-gray-200">
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.quantity}</td>
                <td className="px-4 py-2">${product.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const findProductById = (productId) => {
    return productsData.find((product) => product.productId === productId);
  };

  return (
    <div onClick={handleHideOptions}>
      <div className="flex items-center h-16 px-8 pt-4 mb-5 whitespace-no-wrap">
        <label className="py-2 px-4 rounded-lg text-2xl w-fit m-5 bg-white text-gray-800 font-bold shadow-lg dark:shadow-2x whitespace-no-wrap">
          Group Products
        </label>
        <div className="flex items-center justify-end w-full">
          <button
            className="h-12 bg-supplair-primary text-xl mr-10 w-72  hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            onClick={handleAddGroupProduct}
          >
            Add Group Product
          </button>
        </div>
      </div>
      <div>
        <table className="w-[96%] mx-[2%]">
          <thead className="text-gray-400 border-b-2 border-gray-300">
            <tr className="flex justify-between">
              <th className="font-normal">Name</th>
              <th className="font-normal">Category</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {groupProducts.map((groupProduct) => (
              <React.Fragment key={groupProduct.productsGroupId}>
                <tr
                  className={`border-b-2 border-gray-300 h-20 cursor-pointer`}
                  onClick={() => handleShowProducts(groupProduct.productsGroupId)}
                >
                  <td className="font whitespace-no-wrap font-regular text-supplair-primary">
                    <h3 className="inline cursor-pointer">{groupProduct.name}</h3>
                  </td>
                  <td className="px-6 font whitespace-no-wrap font-regular text-supplair-secondary">
                    <h3 className="inline">{groupProduct.categoryId}</h3>
                  </td>
                  <td className="relative">
                    {showOptionsForId === groupProduct.productsGroupId && (
                      <div className="absolute right-0 z-10 flex flex-col gap-2 p-2 bg-white rounded-lg shadow-sm -top-3 shadow-black h-fit w-fit">
                        <button
                          className="w-40 h-10 px-4 text-lg font-regular rounded-lg hover:text-white hover:bg-supplair-primary text-start"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShowOptions(groupProduct.productsGroupId, groupProduct);
                            handleUpdateGroupProduct(groupProduct);
                            toast.success("Update clicked");
                          }}
                        >
                          Update
                        </button>
                        <button
                          className="w-40 h-10 px-4 text-lg font-regular rounded-lg hover:text-white hover:bg-supplair-primary text-start"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShowOptions(groupProduct.productsGroupId, groupProduct);
                            toast.success("Delete clicked");
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                  <td
                    className="hover:cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowOptionsForId(
                        showOptionsForId === groupProduct.productsGroupId
                          ? null
                          : groupProduct.productsGroupId
                      );
                    }}
                  >
                    <img src={moreIcon} alt="More Options" className="w-6" />
                  </td>
                </tr>
                {expandedGroupId === groupProduct.productsGroupId && (
                  <tr>
                    <td colSpan="3">{renderProducts(groupProduct.productsIds)}</td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {showAddGroupProductPopup && <AddGroupProductPopup onClose={() => setShowAddGroupProductPopup(false)} isOpen={showAddGroupProductPopup} />}
      {showUpdateGroupProductPopup && <UpdateGroupProductPopup onClose={() => setShowUpdateGroupProductPopup(false)} isOpen={showUpdateGroupProductPopup} />}
    </div>
  );
}

export default GroupProducts;
