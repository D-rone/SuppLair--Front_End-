import React, { useState } from "react";
import _editIcon from "../../assets/images/editIcon.svg";
import _doneIcon from "../../assets/images/doneIcon.svg";
import _changeProfilePic from "../../assets/images/plusSign.svg";
import UpdatePwdPopup from "../pupups/UpdatePwdPopup";
import { toast } from "react-toastify";
import { useUserContext } from "../../pages/HomePage";

function PersonalProfile() {
  const { userData, setUserData } = useUserContext();

  // User Profile Picture
  const [hovered, setHovered] = useState(false);
  const [profilePic, setProfilePic] = useState(userData.profilePic);

  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };
  const loadNewProfilePic = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const updateNewPic = () => {
    setUserData((old) => ({ ...old, profilePic: profilePic }));
  };

  const [username, setUsername] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [roles] = useState(userData.roles);
  const [pwdLength] = useState(userData.passwordLength);

  const [edit, setEdit] = useState("");

  const handleUpdate = (field) => {
    setEdit("");
    if (field == "username") {
      if (username != userData.name) {
        if (username.trim().length < 3) {
          toast.error("User Name length should be >= 3");
          setUsername(userData.name);
        } else {
          setUserData((old) => ({ ...old, name: username }));
          toast.success(`Filed ${field} can be updated`);
        }
      }
    } else if (field == "email") {
      if (email != userData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
          toast.error("Email should take pattern : example@example.example");
          setEmail(userData.email);
        } else {
          setUserData((old) => ({
            ...old,
            email: email,
          }));
          toast.success(`Filed ${field} can be updated`);
        }
      }
    }
  };

  const [passwordUpdatePopup, setPasswordUpdatePopup] = useState(false);

  return (
    <div className="h-full max-w-[1000px] w-full mt-14">
      <div className="flex justify-center">
        <div className="flex flex-col items-center w-1/3 pt-3">
          <div
            className="relative inline-block rounded-full size-44"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src={profilePic} alt="Profile Picture" className="rounded-full size-44" />
            {hovered && (
              <div className="absolute top-0 left-0 bg-black rounded-full size-full bg-opacity-30">
                <input type="file" className="hidden" />
                <input
                  type="file"
                  className="rounded-full opacity-0 size-44 hover:cursor-pointer"
                  onChange={loadNewProfilePic}
                />
                <img
                  src={_changeProfilePic}
                  className="absolute size-14 left-[35%] pointer-events-none top-[36%]"
                />
              </div>
            )}
            <div>
              {profilePic != userData.profilePic ? (
                <div className="relative flex gap-4 mt-5 right-2">
                  <button
                    className="cancelBtn min-w-[90px]"
                    onClick={() => {
                      setProfilePic(userData.profilePic);
                    }}
                  >
                    Cancel
                  </button>
                  <button className="approveBtn min-w-[90px]" onClick={updateNewPic}>
                    Update
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="w-2/3">
          <div className="flex px-8 py-4 border-b-2 border-gray-300">
            <span className="w-1/3">Name</span>

            <div className="w-2/3">
              {edit == "username" ? (
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-2 border-gray-400 rounded"
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      handleUpdate("username");
                    }
                  }}
                />
              ) : (
                <span className="font-semibold ">{username}</span>
              )}
            </div>
            <span>
              {edit == "username" ? (
                <img
                  src={_doneIcon}
                  className="h-6 hover:cursor-pointer"
                  onClick={() => {
                    handleUpdate("username");
                  }}
                />
              ) : (
                <img
                  src={_editIcon}
                  className=" hover:cursor-pointer"
                  onClick={() => {
                    setEdit("username");
                  }}
                />
              )}
            </span>
          </div>
          <div className="flex px-8 py-4 border-b-2 border-gray-300">
            <span className="w-1/3">Email</span>
            <div className="w-2/3">
              {edit == "email" ? (
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-2 border-gray-400 rounded"
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      handleUpdate("email");
                    }
                  }}
                />
              ) : (
                <span className="font-semibold "> {email}</span>
              )}
            </div>
            <span>
              {edit == "email" ? (
                <img
                  src={_doneIcon}
                  className="h-6 hover:cursor-pointer"
                  onClick={() => {
                    handleUpdate("email");
                  }}
                />
              ) : (
                <img
                  src={_editIcon}
                  className=" hover:cursor-pointer"
                  onClick={() => {
                    setEdit("email");
                  }}
                />
              )}
            </span>
          </div>
          <div className="flex px-8 py-4 border-b-2 border-gray-300">
            <span className="w-1/3">Role</span>

            <span className="w-2/3 font-semibold">{roles.join(", ")}</span>
            <span>
              <img src={_editIcon} className="opacity-0" />
            </span>
          </div>
          <div className="flex px-8 py-4 border-b-2 border-gray-300">
            <span className="w-1/3">Password</span>
            <span className="w-2/3 font-semibold">{"*".repeat(pwdLength)}</span>
            <span>
              <img
                src={_editIcon}
                className="hover:cursor-pointer"
                onClick={() => {
                  setPasswordUpdatePopup(true);
                }}
              />
              {passwordUpdatePopup ? <UpdatePwdPopup setShow={setPasswordUpdatePopup} /> : <></>}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalProfile;
