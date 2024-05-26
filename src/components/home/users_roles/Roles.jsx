import React, { useEffect, useState } from "react";
import showMore from "../../../assets/images/more.svg";
import { v4 } from "uuid";
import dummyData from "./DUMMY_DATA.json";
import { toast } from "react-toastify";
import UpdateRolePopup from "../../pupups/UpdateRolePopup";
import AddRolePopup from "../../pupups/AddRolePopup";

function Roles() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getRoles();
  }, []);

  let getRoles = () => {
    setRoles(dummyData.roles);
  };

  const [updateRole, setUpdateRole] = useState(null);

  let showRoleOptions = (role) => {
    setUpdateRole(role);
  };

  const [addRole, setAddRole] = useState(false);
  const [showDetails, setShowDetails] = useState(null);

  let hideDetails = () => {
    setShowDetails(null);
  };

  return (
    <div onClick={hideDetails}>
      <div className="flex items-center h-16 px-8 pt-4 mb-5">
        <h1 className="py-2 px-4 rounded-lg text-2xl w-fit m-5 bg-white text-gray-800 font-bold shadow-lg dark:shadow-2x">Roles</h1>
        <div className="flex items-center justify-end w-full">
          <button
            className="h-12 bg-supplair-primary text-xl mr-10 w-72  hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg "
            onClick={() => {
              setAddRole(true);
            }}
          >
            Add Role
          </button>
        </div>
      </div>
      <div>
        <table className="w-[96%] mx-[2%]">
          <thead className="text-gray-400 border-b-2 border-gray-300">
            <tr>
              <th className="px-[5%] py-4 font-normal w-[30%] text-start">Role Name</th>
              <th className="font-normal text-start">Access Rights</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-lg">
            {roles.map((role) => (
              <tr className={"border-b-2 border-gray-300 h-20"} key={v4()}> 
                <td className="px-[4%] font-semibold hover:cursor-pointer text-supplair-primary">
                  <h3 className="inline">{role.name}</h3>
                </td>
                <td className="relative font-semibold">
                  {role.rights.join(", ")}
                  {showDetails == role.id ? (
                    <div className="absolute right-0 z-10 flex flex-col gap-2 p-2 bg-white rounded-lg shadow-sm -top-3 shadow-black h-fit w-fit">
                      <button
                        className="w-40 h-10 px-4 text-lg font-semibold rounded-lg hover:text-white hover:bg-supplair-primary text-start"
                        onClick={(e) => {
                          e.stopPropagation();
                          showRoleOptions(role);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="w-40 h-10 px-4 text-lg font-semibold rounded-lg hover:text-white hover:bg-supplair-primary text-start"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.success("Role deleted");
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
                  className="flex justify-center h-20 hover:cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetails(role.id);
                  }}
                >
                  <img src={showMore} alt="" className="w-6" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {updateRole != null ? <UpdateRolePopup role={updateRole} close={setUpdateRole} /> : <></>}
        {addRole ? <AddRolePopup close={setAddRole} /> : <></>}
      </div>
    </div>
  );
}

export default Roles;
