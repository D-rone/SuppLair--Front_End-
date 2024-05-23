import React, { useEffect, useReducer, useState } from "react";
import PopUp1 from "./PopUp16";
import dummyData from "../home/users_roles/DUMMY_DATA.json";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { useUserContext } from "../../pages/HomePage";
import axios from "axios";

function UpdateUserPopup({ user, close }) {
  const cookies = new Cookies();
  const storedAccessToken = cookies.get("access_token");
  const formData = new FormData();
  const { userData, setUserData } = useUserContext();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/roles/` + userData.userId, {
        headers: {
          Authorization: "Bearer " + storedAccessToken,
        },
      })
      .then((res) => {
        setRoles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let closePopup = (e) => {
    if (!updated) close(null);
    else if (confirm("Are you sure you want to cancel ?")) close(null);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    if (updated) {
      try {
        const response = await axios.patch(
          `http://localhost:8080/api/v1/users`,
          {
            email: user.email,
            roleName: role,
            stateType: active,
          },
          {
            headers: {
              Authorization: "Bearer " + storedAccessToken,
            },
          }
        );
        console.log(response.data);
        window.location.reload();
      } catch (error) {
        console.error("Error:", error);
      }
      close(null);
    }
  };

  const [updated, setUpdated] = useState(false);
  const updateReducer = (state, newValue) => {
    setUpdated(true);
    return newValue;
  };

  const [role, setRole] = useReducer(updateReducer, user.roleName);
  const [active, setActive] = useReducer(updateReducer, user.stateType);

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
              value={user.fullname}
              readOnly
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
              {roles.map((role) => (
                <option value={role.roleName} key={role.roleName}>
                  {role.roleName}
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
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-5">
            <button onClick={closePopup} className="cancelBtn" type="button">
              Cancel
            </button>
            <input
              type="submit"
              value="Update"
              className={`${
                updated ? `hover:cursor-pointer approveBtn` : "cancelBtn"
              } `}
            />
          </div>
        </form>
      </div>
    </PopUp1>
  );
}

export default UpdateUserPopup;
