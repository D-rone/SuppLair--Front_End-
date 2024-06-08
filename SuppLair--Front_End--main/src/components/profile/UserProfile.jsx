import React, { useReducer, useState } from "react";
import _editIcon from "../../assets/images/editIcon.svg";
import _doneIcon from "../../assets/images/doneIcon.svg";
import _changeProfilePic from "../../assets/images/plusSign.svg";
import { toast } from "react-toastify";
import { useUserContext } from "../../pages/HomePage";
import defaultProfilePic from "../../assets/images/noProfilePic.png";
import axios from "axios";
import Cookies from "universal-cookie";

function UserProfile({ userData, setUpdatedData }) {
  const [name, setName] = useState(userData.name);
  const email = userData.email;
  const [edit, setEdit] = useState("");

  const handleUpdate = (field) => {
    setEdit("");
    if (field == "name") {
      if (name != userData.name) {
        if (name.trim().length < 3) {
          toast.error("FullName length should be >= 3", { autoClose: false });
          setName(userData.name);
          return;
        } else {
          toast.success(`Filed ${field} can be updated`);
          setUpdatedData((old) => ({ ...old, fullname: name }));
        }
      }
    }
  };

  const [hovered, setHovered] = useState(false);
  const [companyPic, setCompanyPic] = useState(defaultProfilePic);

  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };
  const loadNewCompanyPic = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyPic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const updateNewPic = () => {
    setUserData((old) => ({ ...old, companyPic: companyPic }));
  };

  const [updated, setUpdated] = useState(false);
  const updateReducer = (state, newValue) => {
    setUpdated(true);
    return newValue;
  };

  return (
    <div className="h-full max-w-[1000px] w-full ">
      <div className="flex justify-center">
        <div className="flex flex-col items-center w-1/3 pt-3">
          <div
            className="relative inline-block rounded-full size-44"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={companyPic}
              alt="Profile Picture"
              className="rounded-full size-44"
            />
            {hovered && (
              <div className="absolute top-0 left-0 bg-black rounded-full size-full bg-opacity-30">
                <input type="file" className="hidden" />
                <input
                  type="file"
                  className="rounded-full opacity-0 size-44 hover:cursor-pointer"
                  onChange={loadNewCompanyPic}
                />
                <img
                  src={_changeProfilePic}
                  className="absolute size-14 left-[35%] pointer-events-none top-[36%]"
                />
              </div>
            )}
          </div>
        </div>

        <div className="w-2/3">
          <div className="flex px-8 py-4 border-b-2 border-gray-300">
            <span style={{ width: "150px", fontWeight: "700" }}>Username</span>

            <div className="w-2/3">
              {edit == "name" ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-2 border-gray-400 rounded"
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      handleUpdate("name");
                    }
                  }}
                />
              ) : (
                <span className="font-medium ">{name}</span>
              )}
            </div>
            <span>
              {edit == "name" ? (
                <img
                  src={_doneIcon}
                  className="h-6 hover:cursor-pointer"
                  onClick={() => {
                    handleUpdate("name");
                  }}
                />
              ) : (
                <img
                  src={_editIcon}
                  className=" hover:cursor-pointer"
                  onClick={() => {
                    setEdit("name");
                  }}
                />
              )}
            </span>
          </div>

          <div className="flex px-8 py-4 border-b-2 border-gray-300">
            <span style={{ width: "150px", fontWeight: "700" }}>Email</span>

            <div className="w-2/3">
              <span className="font-medium ">{email}</span>
            </div>
          </div>

          <div className="flex px-8 py-4 border-b-2 border-gray-300">
            <span style={{ width: "150px", fontWeight: "700" }}>
              Permissions
            </span>
            <div className="w-2/3">
              {userData.permissions.map((permission, index) => (
                <span
                  key={index}
                  className="inline-block font-medium "
                  style={{
                    marginRight: "10px",
                  }}
                >
                  {permission + ","}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
