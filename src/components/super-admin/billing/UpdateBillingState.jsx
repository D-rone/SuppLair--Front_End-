import React, { useEffect, useReducer, useState } from "react";
import PopUp1 from "../../pupups/PopUp16";
import { supplairAPI } from "../../../utils/axios";

function UpdateBillingState({ close, invoice, setUpdate }) {
  const [status, setStatus] = useState(invoice.status);

  let closePopup = (e) => {
    if (confirm("Are you sure you want to cancel ?")) {
      setUpdate(false);
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("state", status);

    try {
      const response = await supplairAPI.put(
        `orders-srv/api/v1/invoices/` + invoice.id,
        formData
      );
      setUpdate(false);
    } catch (error) {
      console.error("Error:", error);
    }
    // Handle form submission here, you can send updated status to backend, etc.
  };

  return (
    <PopUp1 closeMe={closePopup} title="Update Billing State">
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Company Name
            </label>
            <input
              disabled
              type="text"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={invoice.companyName}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date
            </label>
            <input
              type="text"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={invoice.date}
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={handleStatusChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="PENDING">PENDING</option>
              <option value="PAID">PAID</option>
            </select>
          </div>
          <div className="flex justify-end gap-5">
            <button onClick={closePopup} className="cancelBtn" type="button">
              Cancel
            </button>
            <input
              type="submit"
              value="Save"
              className="hover:cursor-pointer approveBtn"
            />
          </div>
        </form>
      </div>
    </PopUp1>
  );
}

export default UpdateBillingState;
