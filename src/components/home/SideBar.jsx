import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import _homeIcon from "../../assets/images/sideBar_icons/home.svg";
import _inventoryIcon from "../../assets/images/sideBar_icons/inventory.svg";
import _salesIcon from "../../assets/images/sideBar_icons/sales.svg";
import _announcementsIcon from "../../assets/images/sideBar_icons/announcements.svg";
import _users_rolesIcon from "../../assets/images/sideBar_icons/users_roles.svg";
import _billingIcon from "../../assets/images/sideBar_icons/billing.svg";
import _hasMore from "../../assets/images/sideBar_icons/hasMore.svg";
import _openSideBar from "../../assets/images/sideBar_icons/openSideBar.svg";
import "./homeStyle.css";

function SideBar({ openSideBar, setOpenSideBar }) {
  let checkActive = ({ isActive }) => {
    return isActive ? "bg-gray-200 rounded-xl font-semibold" : "";
  };

  let toggleSideBar = () => {
    setOpenSideBar((old) => !old);
  };

  return (
    <div>
      <div
        id="HomeSideBar"
        className={`fixed z-10 w-1/5 bg-supplair-sidebar h-_pageBody transition-transform duration-300 ease-in-out transform ${
          openSideBar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col p-4 text-xl">
          <NavLink to={"/"} className={checkActive}>
            <div className="flex items-center w-11/12 m-2 mr-0">
              <img src={_homeIcon} className="h-6 m-3" />
              <p>Home</p>
            </div>
          </NavLink>
          <NavLink to={"/inventory"} className={checkActive}>
            <div className="flex items-center w-11/12 m-2">
              <img src={_inventoryIcon} className="h-6 m-3" />
              <p>Inventory</p>
              <img src={_hasMore} className="ml-auto" />
            </div>
          </NavLink>
          <NavLink to={"/sales"} className={checkActive}>
            <div className="flex items-center w-11/12 m-2">
              <img src={_salesIcon} className="h-6 m-3" />
              <p>Sales</p>
              <img src={_hasMore} className="ml-auto" />
            </div>
          </NavLink>
          <NavLink to={"/announcements"} className={checkActive}>
            <div className="flex items-center w-11/12 m-2">
              <img src={_announcementsIcon} className="h-6 m-3" />
              <p>Announcements</p>
            </div>
          </NavLink>
          <NavLink to={"/users_roles"} className={checkActive}>
            <div className="flex items-center w-11/12 m-2">
              <img src={_users_rolesIcon} className="h-6 m-3" />
              <p>Users & Roles</p>
              <img src={_hasMore} className="ml-auto" />
            </div>
          </NavLink>
          <NavLink to={"/billing"} className={checkActive}>
            <div className="flex items-center w-11/12 m-2">
              <img src={_billingIcon} className="h-6 m-3" />
              <p>Billing</p>
            </div>
          </NavLink>
        </div>
      </div>
      <div
        className={`fixed z-10 transition-all duration-300 ease-in-out top-1/2 ${
          openSideBar ? "left-1/5" : "left-0 rotate-180"
        }`}
      >
        <button onClick={toggleSideBar}>
          <img src={_openSideBar} />
        </button>
      </div>
    </div>
  );
}

export default SideBar;
