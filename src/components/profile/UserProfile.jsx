import React from "react";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

function UserProfile() {
  let checkActive = ({ isActive }) =>
    `${isActive ? "text-supplair-primary font-semibold" : "text-gray-400"}`;
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center h-16">
        <h1 className="w-full mt-2 ml-20 text-xl font-semibold">Edit Profile</h1>
      </div>
      <div className="flex flex-col flex-1 ">
        <div className="flex justify-center gap-40 p-2 border-gray-300 border-y-2">
          <NavLink to="/user_profile/personal_profile" className={checkActive}>
            Personal Profile
          </NavLink>
          <NavLink to="/user_profile/company_profile" className={checkActive}>
            Company Profile
          </NavLink>
        </div>
        <div className="flex justify-center flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function multiplyBy2(x){

}

export default UserProfile;
