import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddGroupProductPopup from "../../pupups/AddGroupProductPopup";
import UpdateGroupProductPopup from "../../pupups/UpdateGroupProductPopup";
import _defaultPic from "../../../assets/images/noProfilePic.png";
import moreIcon from "../../../assets/images/more.svg";
import { ScaleLoader } from "react-spinners";
import Cookies from "universal-cookie";
import { supplairAPI } from "../../../utils/axios";
import Pagination from "../../utils/Pagination";
import { NavLink } from "react-router-dom";

function GroupProducts() {
  const [showOptionsForId, setShowOptionsForId] = useState(null);
  const [showAddGroupProductPopup, setShowAddGroupProductPopup] = useState(false);
  const [showUpdateGroupProductPopup, setShowUpdateGroupProductPopup] = useState(null);

  const [loading, setLoading] = useState(true);
  const [updateGet, setUpdateGet] = useState(false);

  const [totalPages, setTotalPages] = useState(1);

  const [page, setPage] = useState(0);

  const [groupProducts, setGroupProducts] = useState([]);

  let makeRequest = (page) => {
    setLoading(true);
    const cookies = new Cookies();
    const storedAccessToken = cookies.get("access_token");

    supplairAPI
      .get("products-srv/query/supplier/myProductsGroups?page=" + page + "&size=8", {
        headers: {
          Authorization: `Bearer ${storedAccessToken}`,
        },
      })
      .then((data) => {
        console.log(data?.data?.content);
        setGroupProducts(data.data?.content);
        setTotalPages(data.data?.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        if (Math.floor(err?.response?.status / 100) == 5) toast.error("Server Error");
        else toast.error(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    makeRequest(page);
  }, [page, updateGet]);

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
    setShowUpdateGroupProductPopup(groupProduct);
  };

  const deleteProductsGroup = (e, id) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this products group ?")) {
      const cookies = new Cookies();
      const storedAccessToken = cookies.get("access_token");
      supplairAPI
        .delete("products-srv/command/products_group/" + id, {
          headers: {
            Authorization: `Bearer ${storedAccessToken}`,
          },
        })
        .then((response) => {
          toast.success(response.data);
          setUpdateGet((prev) => !prev);
        })
        .catch((err) => {
          if (err?.response?.status == 500) {
            let message = "Can't delete a non empty Products Group";
            if (err?.response?.data.includes(message)) toast.error(message);
          } else {
            toast.error(err.message);
          }
        });
    }
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
              <th className="font-normal text-center w-[30%]">Name</th>
              <th className="font-normal text-center w-[30%] ">Category</th>
              <th className="font-normal text-center w-[30%] ">Number of Products</th>
              <th className="w-[6%]"></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="h-[300px]">
                <td>
                  <div className="absolute top-0 flex items-center justify-center w-full h-full">
                    <ScaleLoader />
                  </div>
                </td>
              </tr>
            ) : (
              groupProducts.map((groupProduct) => (
                <tr
                  className={`border-b-2 border-gray-300 h-20`}
                  key={groupProduct?.productsGroupId}
                >
                  <td className="whitespace-no-wrap font font-regular text-supplair-secondary">
                    <NavLink to={groupProduct.productsGroupId}>
                      <h3 className="inline px-16 text-xl font-bold">{groupProduct.name} </h3>
                    </NavLink>
                  </td>
                  <td className="px-6 text-center whitespace-no-wrap font-regular text-supplair-secondary">
                    <h3 className="inline">{groupProduct.categoryId}</h3>
                  </td>
                  <td className="text-xl text-center font-semiboldbold">
                    {groupProduct?.productsIds?.length}
                  </td>
                  <td className="relative">
                    {showOptionsForId === groupProduct.productsGroupId && (
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
                          className="w-40 h-10 px-4 text-lg rounded-lg font-regular hover:text-white hover:bg-red-500 text-start"
                          onClick={(e) => {
                            deleteProductsGroup(e, groupProduct.productsGroupId);
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
              ))
            )}
          </tbody>
        </table>

        <div className="h-16"></div>
        <div className="fixed bg-white bottom-5 right-10">
          <Pagination
            totalPages={totalPages}
            page={page}
            setPage={setPage}
            makeRequest={makeRequest}
          />
        </div>

        {showAddGroupProductPopup && (
          <AddGroupProductPopup
            onClose={() => setShowAddGroupProductPopup(false)}
            setUpdateGet={setUpdateGet}
          />
        )}
        {showUpdateGroupProductPopup && (
          <UpdateGroupProductPopup
            onClose={() => setShowUpdateGroupProductPopup(null)}
            productGroupData={showUpdateGroupProductPopup}
            setUpdateGet={setUpdateGet}
          />
        )}
      </div>
    </div>
  );
}

export default GroupProducts;
