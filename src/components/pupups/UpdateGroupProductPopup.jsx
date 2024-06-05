import React, { useReducer, useState } from "react";
import PopUp1 from "./PopUp1";
import { supplairAPI } from "../../utils/axios";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";

const UpdateGroupProductPopup = ({ onClose, productGroupData, setUpdateGet }) => {
  const [loading, setLoading] = useState(false);

  const [updated, setUpdated] = useState(false);
  const updateReducer = (state, newValue) => {
    setUpdated(true);
    return newValue;
  };
  const [formData, setFormData] = useReducer(updateReducer, {
    name: productGroupData.name,
  });

  let closePopup = (e) => {
    if (!updated) onClose();
    else if (confirm("Are you sure you want to cancel ?")) onClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (updated && !loading) {
      const cookies = new Cookies();
      const storedAccessToken = cookies.get("access_token");
      setLoading(true);
      supplairAPI
        .put(
          `products-srv/command/products_group/${productGroupData.productsGroupId}`,
          {
            name: formData.name,
          },
          {
            headers: {
              Authorization: `Bearer ${storedAccessToken}`,
            },
          }
        )
        .then((response) => {
          toast.success(response.data);
          setUpdateGet((prev) => !prev);
          onClose(false);
        })
        .catch((err) => {
          toast.error(err.message);
          setUpdated(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    onClose();
  };

  return (
    <PopUp1 closeMe={closePopup} title="Update Group Product">
      <form onSubmit={handleSubmit}>
        <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="w-full mt-3 text-center sm:mt-0 sm:text-left">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  value={formData.name}
                  className="block w-full p-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <div className="block w-full p-2 mt-1 bg-gray-200 border rounded-md shadow-sm">
                  {productGroupData.categoryId}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-5">
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
};

export default UpdateGroupProductPopup;
