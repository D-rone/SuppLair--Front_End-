import React, { useEffect, useState } from "react";
import PopUp1 from "./PopUp1";
import { useReducer } from "react";
import { useUserContext } from "../../pages/HomePage";
import { supplairAPI } from "../../utils/axios";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { ClockLoader } from "react-spinners";

const AddGroupProductPopup = ({ onClose, setUpdateGet }) => {
  const [loading, setLoading] = useState(false);

  const [updated, setUpdated] = useState(false);
  const updateReducer = (state, newValue) => {
    setUpdated(true);
    return newValue;
  };
  const [formData, setFormData] = useReducer(updateReducer, {
    name: "",
    category: "",
  });

  let closePopup = (e) => {
    if (!updated) onClose(false);
    else if (confirm("Are you sure you want to cancel ?")) onClose(false);
  };

  const { userData } = useUserContext();

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
        .post(
          `products-srv/command/category/${formData.category}/products_group`,
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
  };

  return (
    <PopUp1 closeMe={closePopup} title="Add Group Product">
      <form onSubmit={handleSubmit}>
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
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="block w-full p-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Category</option>
            {userData?.categories.map((category) => (
              <option key={v4()} value={category}>
                {category}
              </option>
            ))}
          </select>
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

export default AddGroupProductPopup;
