import React, { useState } from "react";
import { Outlet } from "react-router";
import { NavLink, useLocation } from "react-router-dom";

function UserProfile() {
  let checkActive = ({ isActive }) =>
    `${isActive ? "text-supplair-primary font-bold" : "text-gray-400"}`;

  const currentPathname = useLocation().pathname;
  const [activeLink, setActiveLink] = useState(currentPathname);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center">
        <h1 className="flex items-center w-full h-16 mt-2 ml-10 text-xl font-bold">EDIT PROFILE</h1>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex flex-col justify-center gap-2 px-40 pb-6 border-b-2 border-gray-300">
          <NavLink to="/user_profile/personal_profile" className={checkActive}>
            <div className="flex items-center gap-3">
              {currentPathname == "/user_profile/personal_profile" ? (
                <svg
                  viewBox="0 0 11 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3"
                >
                  <path
                    d="M0.559733 3.26182C-0.0666251 2.70257 -0.0668041 1.72272 0.55935 1.16324C1.093 0.686414 1.89957 0.686171 2.43351 1.16267L10.2635 8.15038C11.1546 8.94563 11.1546 10.3395 10.2635 11.1348L2.43351 18.1225C1.89957 18.599 1.093 18.5987 0.55935 18.1219C-0.0668041 17.5624 -0.0666249 16.5826 0.559734 16.0233L6.03531 11.1345C6.92593 10.3393 6.92594 8.9459 6.03531 8.1507L0.559733 3.26182Z"
                    fill="#0D6EFD"
                  />
                </svg>
              ) : (
                <div className="w-2"></div>
              )}
              Personal Profile
            </div>
          </NavLink>
          <NavLink to="/user_profile/company_profile" className={checkActive}>
            <div className="flex items-center gap-3">
              {currentPathname == "/user_profile/company_profile" ? (
                <svg
                  viewBox="0 0 11 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-2"
                >
                  <path
                    d="M0.559733 3.26182C-0.0666251 2.70257 -0.0668041 1.72272 0.55935 1.16324C1.093 0.686414 1.89957 0.686171 2.43351 1.16267L10.2635 8.15038C11.1546 8.94563 11.1546 10.3395 10.2635 11.1348L2.43351 18.1225C1.89957 18.599 1.093 18.5987 0.55935 18.1219C-0.0668041 17.5624 -0.0666249 16.5826 0.559734 16.0233L6.03531 11.1345C6.92593 10.3393 6.92594 8.9459 6.03531 8.1507L0.559733 3.26182Z"
                    fill="#0D6EFD"
                  />
                </svg>
              ) : (
                <div className="w-2"></div>
              )}
              Company Profile
            </div>
          </NavLink>
        </div>
        <div className="h-full pr-10 break-all">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function multiplyBy2(x) {}

export default UserProfile;
