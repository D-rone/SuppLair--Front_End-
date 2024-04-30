import React, { useEffect, useReducer, useState } from "react";
import PopUp1 from "./PopUp1";
import dummyData from "../home/users_roles/DUMMY_DATA.json";
import { toast } from "react-toastify";

function UpdateUserPopup({ user, close }) {
  let closePopup = (e) => {
    if (!updated) close(null);
    else if (confirm("Are you sure you want to cancel ?")) close(null);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();

    if (updated) {
      if (name.trim().length < 3) toast.error("Invalid Name");
      else {
        close(null);
        toast.success("User can be updated");
      }
    }
  };

  const [updated, setUpdated] = useState(false);
  const updateReducer = (state, newValue) => {
    setUpdated(true);
    return newValue;
  };

  useEffect(() => {
    setRolesList(dummyData.roles);
  }, []);

  const [rolesList, setRolesList] = useState([]);
  const [name, setName] = useReducer(updateReducer, user.name);
  const [role, setRole] = useReducer(updateReducer, user.role);
  const [active, setActive] = useReducer(updateReducer, user.active);

  return (
    <PopUp1 closeMe={closePopup} title="Update User">
      <div className="p-4">
        <form onSubmit={handleUpdateUser}>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>Email :</span>
            <input
              type="text"
              readOnly
              value={user.email}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>User Name :</span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
            />
          </div>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>User Role :</span>
            <select
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
            >
              {rolesList.map((role) => (
                <option value={role.id} key={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>User Status :</span>
            <select
              type="text"
              required
              value={active}
              onChange={(e) => setActive(e.target.value)}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-5">
            <button onClick={closePopup} className="cancelBtn" type="button">
              Cancel
            </button>
            <input
              type="submit"
              value="Update"
              className={`${updated ? `hover:cursor-pointer approveBtn` : "cancelBtn"} `}
            />
          </div>
        </form>
      </div>
    </PopUp1>
  );
}

export default UpdateUserPopup;
