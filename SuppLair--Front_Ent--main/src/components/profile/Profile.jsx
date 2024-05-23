import React, { useState } from "react";
import { Outlet } from "react-router";
import { NavLink, useLocation } from "react-router-dom";
import CompanyProfile from "./CompanyProfile";
import UserProfile from "./UserProfile";

function Profile() {
  let checkActive = ({ isActive }) =>
    `${isActive ? "text-supplair-primary font-bold" : "text-gray-400"}`;

  const currentPathname = useLocation().pathname;
  const [activeLink, setActiveLink] = useState(currentPathname);

  return (
    <div
      className="flex flex-col w-full h-full"
      style={{ paddingBottom: "200px" }}
    >
      <div className="flex items-center">
        <h1 className="flex items-center w-full h-16 mt-2 ml-10 text-xl font-bold">
          EDIT PROFILE :
        </h1>
      </div>
      <div className="flex items-center">
        <h1 className="flex items-center w-full h-16 mt-2 ml-10  font-semibold">
          Personal Profile :
        </h1>
      </div>
      <UserProfile />
      <div className="flex items-center">
        <h1 className="flex items-center w-full h-16 mt-2 ml-10  font-semibold">
          Company Profile :
        </h1>
      </div>
      <CompanyProfile />
    </div>
  );
}

function multiplyBy2(x) {}

export default Profile;
