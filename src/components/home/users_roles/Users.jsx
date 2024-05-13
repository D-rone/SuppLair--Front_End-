import React, { useEffect, useState } from "react";
import showMore from "../../../assets/images/more.svg";
import _defualtPic from "../../../assets/images/noProfilePic.png";
import { v4 } from "uuid";
import UpdateUserPopup from "../../pupups/UpdateUserPopup";

import dummyData from "./DUMMY_DATA.json";
import InviteUserPopup from "../../pupups/InviteUserPopup";
import { toast } from "react-toastify";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers("all");
  }, []);

  let getUsers = (state) => {
    if (state == "all") setUsers(dummyData.users);
    else if (state == "active") setUsers(dummyData.users.filter((u) => u.active));
    else if (state == "inactive") setUsers(dummyData.users.filter((u) => !u.active));
  };

  const [updateUser, setUpdateUser] = useState(null);

  let showUserOptions = (user) => {
    setUpdateUser(user);
  };

  const [inviteUser, setInviteUser] = useState(false);
  const [showDetails, setShowDetails] = useState(null);

  let hideDetails = () => {
    setShowDetails(null);
  };

  return (
    <div onClick={hideDetails}>
      <div className="flex items-center h-16 px-8 pt-4">
        <select
          id="selectUserStatus"
          className="py-2 px-4 rounded-lg text-2xl w-fit m-5 bg-white text-gray-800 font-bold shadow-lg dark:shadow-2x hover:cursor-pointer"
          onChange={(e) => getUsers(e.target.value)}
        >
          <option value="all">All Users</option>
          <option value="active">Active Users</option>
          <option value="inactive">Inactive Users</option>
        </select>
        <div className="flex items-center justify-end w-full">
          <button
            className="h-12 bg-supplair-primary text-xl mr-10 w-72  hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg "
            onClick={() => {
              setInviteUser(true);
            }}
          >
            Invite User
          </button>
        </div>
      </div>
      <div>
        <table className="w-[96%] mx-[2%]">
          <thead className="text-gray-400 border-b-2 border-gray-300">
            <tr>
              <th className="px-6 py-4 font-normal text-start">User</th>
              <th className="font-normal">Role</th>
              <th className="font-normal">State</th>
              <th className="font-normal text-start">Contact</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                className={`border-b-2 border-gray-300 h-20 ${user.active ? "" : "bg-gray-200"}`}
                key={v4()}
              >
                <td className="p-2 hover:cursor-pointer">
                  <img
                    src={user.profilePic || _defualtPic}
                    className="inline h-12 mx-4 border-2 rounded-full border-supplair-primary"
                  />
                  <h3 className="inline font-semibold text-supplair-primary">{user.name}</h3>
                </td>
                <td className="text-center">
                  {dummyData.roles.find((role) => role.id === user.role)?.name}
                </td>
                <td className="text-center">{user.active ? "Active" : "Inactive"}</td>
                <td className="relative">
                  {user.email}
                  {showDetails == user.id ? (
                    <div className="absolute right-0 z-10 flex flex-col gap-2 p-2 bg-white rounded-lg shadow-sm -top-3 shadow-black h-fit w-fit">
                      <button
                        className="w-40 h-10 px-4 text-lg font-semibold rounded-lg hover:text-white hover:bg-supplair-primary text-start"
                        onClick={(e) => {
                          e.stopPropagation();
                          showUserOptions(user);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="w-40 h-10 px-4 text-lg font-semibold rounded-lg hover:text-white hover:bg-supplair-primary text-start"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.success("User deleted");
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </td>
                <td
                  className="hover:cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetails(user.id);
                  }}
                >
                  <img src={showMore} alt="" className="w-6" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {updateUser != null ? <UpdateUserPopup user={updateUser} close={setUpdateUser} /> : <></>}
        {inviteUser ? <InviteUserPopup close={setInviteUser} /> : <></>}
      </div>
    </div>
  );
}

export default Users;
