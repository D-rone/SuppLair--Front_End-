import React, { useEffect, useState } from "react";
import defaultProfilePic from "../../assets/images/noProfilePic.png";
import _LogoInline from "../../assets/images/Logo_inline.png";
import _logoIcon from "../../assets/images/Logo_icon.png";
import _search from "../../assets/images/search.svg";
import _dropDown from "../../assets/images/dropDown.svg";
import _noProfilePic from "../../assets/images/noProfilePic.png";
import _bell from "../../assets/images/bell.svg";
import { NavLink } from "react-router-dom";
import { useScreenContext } from "../../App";
import { useUserContext } from "../../pages/HomePage";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { supplairAPI } from "../../utils/axios";

let searchFormController = (event) => {
  event.preventDefault();
};

function TopBar({ profileDropdown, setProfileDropdown }) {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const storedAccessToken = cookies.get("access_token");
  const { userData } = useUserContext();
  const [username, setUsername] = useState(userData.name);
  const [profilePic, setProfilePic] = useState(defaultProfilePic);

  let toggleProfileDropdown = (e) => {
    e.stopPropagation();
    setProfileDropdown(!profileDropdown);
  };

  let { showLogoText } = useScreenContext();

  let logout = async () => {
    try {
      const response = await supplairAPI.post(`auth-srv/api/v1/logout/` + storedAccessToken);
      cookies.remove("access_token", { path: "/" });
      cookies.remove("refresh_token", { path: "/" });
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    // TOP BAR
    <div
      className="fixed z-30 flex items-center w-full h-14 bg-supplair-secondary"
      onClick={() => {
        setProfileDropdown(false);
      }}
    >
      {/* LOGO */}
      <div className="w-1/4">
        {showLogoText ? (
          <div className="relative left-[10%] w-fit hover:cursor-pointer">
            <NavLink to={"/"}>
              <img src={_LogoInline} id="topBar_logo" alt="" className="inline h-8 mr-2" />
            </NavLink>
          </div>
        ) : (
          <div className="flex justify-center w-full hover:cursor-pointer">
            <NavLink to={"/"}>
              <img src={_logoIcon} id="topBar_logo" alt="" className="inline h-8 mr-2" />
            </NavLink>
          </div>
        )}
      </div>
      {/* Search Bar */}
      <div className="w-1/4">
        <form onSubmit={searchFormController}>
          <div className="flex items-center w-full h-10 p-2 bg-white border-2 rounded-xl">
            <img src={_search} alt="" className="h-7 hover:cursor-pointer" />
            <img src={_dropDown} alt="" className="h-1.5 hover:cursor-pointer" />
            <input
              type="text"
              placeholder="Search ..."
              className="w-full h-8 pl-2 ml-3 border-l-2 border-gray-300 focus:outline-none"
            />
          </div>
        </form>
      </div>
      {/* Profile Options */}
      <div className="flex items-center justify-end h-full p-4 ml-auto w-fit">
        <div className="pr-4 m-4 text-base leading-none text-white border-r-[3px] font-raleway">
          {username}
        </div>

        <div>
          <img src={_bell} className="h-6 m-3 hover:cursor-pointer opacity-80" />
        </div>

        <div className="p-4">
          <img
            src={profilePic}
            onClick={toggleProfileDropdown}
            className="w-10 h-10 border-2 border-gray-700 rounded-full hover:cursor-pointer"
          />
        </div>
        {profileDropdown && (
          <div className="absolute w-48 mt-2 text-white rounded-md shadow-lg bg-supplair-secondary top-14 right-2">
            <div className="py-1">
              <NavLink
                to="/user_profile"
                className="flex items-center block border-[1px] border-gray-700 px-8 py-2 text-base h-14 hover:bg-gray-950"
              >
                Profile
              </NavLink>
              <button
                className="flex items-center block border-[1px] border-gray-700 px-8 py-2 text-base h-14 hover:bg-gray-950"
                onClick={logout}
                style={{ width: "100%", border: "none" }}
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TopBar;
