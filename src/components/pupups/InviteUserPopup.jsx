import React, { useEffect, useReducer, useState } from "react";
import PopUp1 from "./PopUp16";
import dummyData from "../home/users_roles/DUMMY_DATA.json";
import { toast } from "react-toastify";
import { useUserContext } from "../../pages/HomePage";
import Cookies from "universal-cookie";
import { supplairAPI } from "../../utils/axios";

function InviteUserPopup({ close }) {
  const cookies = new Cookies();
  const storedAccessToken = cookies.get("access_token");
  const formData = new FormData();
  const { userData, setUserData } = useUserContext();

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    supplairAPI
      .get(`auth-srv/api/v1/roles/` + userData.companyId, {
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

  const handleInviteUser = async (e) => {
    e.preventDefault();

    if (updated) {
      if (name.trim().length < 3) {
        toast.error("Invalid Name");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        toast.error("Invalid Email");
        return;
      }

      try {
        const response = await supplairAPI.post(
          `auth-srv/api/v1/invite-user`,
          {
            email: email,
            fullname: name,
            roleName: role,
            companyName: userData.companyName,
          },
          {
            headers: {
              Authorization: "Bearer " + storedAccessToken,
            },
          }
        );
        toast.success("User can be Saved");
        // Reload the page after successful user addition
        window.location.reload();
        close(null);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const [updated, setUpdated] = useState(false);
  const updateReducer = (state, newValue) => {
    setUpdated(true);
    return newValue;
  };

  const [name, setName] = useReducer(updateReducer, "");
  const [email, setEmail] = useReducer(updateReducer, "");
  const [role, setRole] = useReducer(updateReducer, "");

  return (
    <PopUp1 closeMe={closePopup} title="Invite User">
      <div className="p-4">
        <form onSubmit={handleInviteUser}>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>User Name :</span>
            <input
              type="text"
              placeholder="New User Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
            />
          </div>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>Email :</span>
            <input
              type="text"
              placeholder="New User Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-none"
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
              <option value="" disabled>
                -- Select an option --
              </option>
              {roles.map((role) => (
                <option value={role.roleName} key={role.roleName}>
                  {role.roleName}
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

export default InviteUserPopup;
