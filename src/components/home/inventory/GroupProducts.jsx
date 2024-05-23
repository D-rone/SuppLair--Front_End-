import React, { useState } from "react";
import dummyData from "./groupProducts.json";
import { toast } from "react-toastify";
import AddGroupProductPopup from "../../pupups/AddGroupProductPopup";
import UpdateGroupProductPopup from "../../pupups/UpdateGroupProductPopup";
import _defaultPic from "../../../assets/images/noProfilePic.png";
import moreIcon from "../../../assets/images/more.svg";

function GroupProducts() {
  const [groupProducts, setGroupProducts] = useState(dummyData);
  const [showOptionsForId, setShowOptionsForId] = useState(null);
  const [showAddGroupProductPopup, setShowAddGroupProductPopup] = useState(false);
  const [showUpdateGroupProductPopup, setShowUpdateGroupProductPopup] = useState(false);

  const handleShowOptions = (groupProduct) => {
    setShowOptionsForId(groupProduct.id);
  };

  const handleHideOptions = () => {
    setShowOptionsForId(null);
  };
  const handleAddGroupProduct = () => {
    setShowAddGroupProductPopup(true);
  };

  const handleUpdateGroupProduct = (groupProduct) => {
    setShowUpdateGroupProductPopup(true);
  };

  return (
    <div onClick={handleHideOptions}>
      <div className="flex items-center h-16 px-8 pt-4 mb-5 whitespace-no-wrap">
        <label className="w-[300px] px-4 py-2 m-5 text-2xl font-bold text-gray-800 whitespace-no-wrap bg-white rounded-lg shadow-lg dark:shadow-2x">
          Group Products
        </label>
        <div className="flex items-center justify-end w-full">
          <button
            className="h-12 px-4 py-2 mr-10 text-xl font-bold text-white rounded-lg bg-supplair-primary w-72 hover:bg-blue-600 "
            onClick={handleAddGroupProduct}
          >
            Add Group Product
          </button>
        </div>
      </div>
      <div>
        <table className="w-[96%] mx-[2%]">
          <thead className="text-gray-400 border-b-2 border-gray-300 ">
            <tr>
              <th className="pl-10 font-normal text-start">Name</th>
              <th className="pl-16 font-normal text-start">Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {groupProducts.map((groupProduct) => (
              <tr className={`border-b-2 border-gray-300 h-20`} key={groupProduct.id}>
                <td className="whitespace-no-wrap font font-regular text-supplair-secondary">
                  <h3 className="inline">{groupProduct.name}</h3>
                </td>
                <td className="px-6 whitespace-no-wrap font font-regular text-supplair-secondary">
                  <h3 className="inline">{groupProduct.category}</h3>
                </td>
                <td className="relative">
                  {showOptionsForId === groupProduct.id && (
                    <div className="absolute right-0 z-10 flex flex-col gap-2 p-2 bg-white rounded-lg shadow-sm -top-3 shadow-black h-fit w-fit">
                      <button
                        className="w-40 h-10 px-4 text-lg rounded-lg font-regular hover:text-white hover:bg-supplair-primary text-start"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShowOptions(groupProduct);
                          handleUpdateGroupProduct(groupProduct);
                          toast.success("Update clicked");
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="w-40 h-10 px-4 text-lg rounded-lg font-regular hover:text-white hover:bg-supplair-primary text-start"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShowOptions(groupProduct);
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
                      showOptionsForId === groupProduct.id ? null : groupProduct.id
                    );
                  }}
                >
                  <img src={moreIcon} alt="More Options" className="w-6" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showAddGroupProductPopup && (
          <AddGroupProductPopup
            onClose={() => setShowAddGroupProductPopup(false)}
            isOpen={showAddGroupProductPopup}
          />
        )}
        {showUpdateGroupProductPopup && (
          <UpdateGroupProductPopup
            onClose={() => setShowUpdateGroupProductPopup(false)}
            isOpen={showUpdateGroupProductPopup}
          />
        )}
      </div>
    </div>
  );
}

export default GroupProducts;
