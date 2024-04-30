import React, { useEffect, useReducer, useState } from "react";
import PopUp1 from "./PopUp1";
import dummyData from "../home/users_roles/DUMMY_DATA.json";
import { toast } from "react-toastify";

function AddRole({ close }) {
  let closePopup = (e) => {
    if (!updated) close(null);
    else if (confirm("Are you sure you want to cancel ?")) close(null);
  };

  const handleAddRole = (e) => {
    e.preventDefault();

    if (updated) {
      if (name.trim().length < 3) toast.error("Invalid Role Name");
      else {
        close(null);
        toast.success("Role can be saved");
      }
    }
  };

  const [updated, setUpdated] = useState(false);
  const updateReducer = (state, newValue) => {
    setUpdated(true);
    return newValue;
  };

  const [name, setName] = useReducer(updateReducer, "");
  const [rights, setRights] = useReducer(updateReducer, []);

  return (
    <PopUp1 closeMe={closePopup} title="Add Role">
      <div className="p-4">
        <form onSubmit={handleAddRole}>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>Role Name :</span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
            />
          </div>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>Access Rights :</span>
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value="Home"
                  className="mx-4 my-2 size-4 hover:cursor-pointer"
                  onChange={() => {
                    setUpdated(true);
                  }}
                />
                <label for="Home">Home</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value="Inventory"
                  className="mx-4 my-2 size-4 hover:cursor-pointer"
                  onChange={() => {
                    setUpdated(true);
                  }}
                />
                <label for="Inventory">Inventory</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value="Sales"
                  className="mx-4 my-2 size-4 hover:cursor-pointer"
                  onChange={() => {
                    setUpdated(true);
                  }}
                />
                <label for="Sales">Sales</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value="Announcements"
                  className="mx-4 my-2 size-4 hover:cursor-pointer"
                  onChange={() => {
                    setUpdated(true);
                  }}
                />
                <label for="Announcements">Announcements</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value="Users&Roles"
                  className="mx-4 my-2 size-4 hover:cursor-pointer"
                  onChange={() => {
                    setUpdated(true);
                  }}
                />
                <label for="Users&Roles">Users & Roles</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value="Billing"
                  className="mx-4 my-2 size-4 hover:cursor-pointer"
                  onChange={() => {
                    setUpdated(true);
                  }}
                />
                <label for="Billing">Billing</label>
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
              className={`${updated ? `hover:cursor-pointer approveBtn` : "cancelBtn"} `}
            />
          </div>
        </form>
      </div>
    </PopUp1>
  );
}

export default AddRole;
