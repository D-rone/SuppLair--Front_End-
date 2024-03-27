import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import _homeIcon from "../../assets/images/sideBar_icons/home.svg";
import _inventoryIcon from "../../assets/images/sideBar_icons/inventory.svg";
import _salesIcon from "../../assets/images/sideBar_icons/sales.svg";
import _announcementsIcon from "../../assets/images/sideBar_icons/announcements.svg";
import _users_rolesIcon from "../../assets/images/sideBar_icons/users_roles.svg";
import _billingIcon from "../../assets/images/sideBar_icons/billing.svg";
import _hasMore from "../../assets/images/sideBar_icons/hasMore.svg";
import _openSideBar from "../../assets/images/sideBar_icons/openSideBar.svg";
import "./homeStyle.css";
import { useScreenContext } from "../../pages/HomePage";

function SideBar() {
  let { foldingSideBar, sideBar, setSideBar } = useScreenContext();
  let toggleSideBar = () => {
    setSideBar(!sideBar);
  };

  let checkActive = ({ isActive }) => {
    return isActive ? "bg-gray-200 rounded-xl font-semibold" : "";
  };


  const [expandInventory, setExpandInventory] = useState(false);
  const toggleExpandInventory = () => {
    setExpandInventory(!expandInventory);
  };
  const [expandSales, setExpandSales] = useState(false);
  const toggleExpandSales = () => {
    setExpandSales(!expandSales);
  };
  const [expandUsersRoles, setExpandUsersRoles] = useState(false);
  const toggleExpandUsersRoles = () => {
    setExpandUsersRoles(!expandUsersRoles);
  };

  const currentPathname = useLocation().pathname;
  useEffect(() => {
    switch (currentPathname) {
      case "/products":
      case "/group_products":
        setExpandInventory(true);
        setExpandSales(false);
        setExpandUsersRoles(false);
        break;
      case "/orders":
      case "/clients":
        setExpandInventory(false);
        setExpandSales(true);
        setExpandUsersRoles(false);
        break;

      case "/roles":
      case "/users":
        setExpandInventory(false);
        setExpandSales(false);
        setExpandUsersRoles(true);
        break;
      default:
        setExpandInventory(false);
        setExpandSales(false);
        setExpandUsersRoles(false);
        break;
    }
  }, [currentPathname]);

  return (
    <div>
      <div
        id="HomeSideBar"
        className={`fixed z-10 w-[20%] min-w-[250px] bg-supplair-sidebar h-_pageBody transition-transform duration-300 ease-in-out transform ${
          sideBar || foldingSideBar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col p-4 text-lg">
          <NavLink to={"/"} className={checkActive}>
            <div className="flex items-center w-11/12 m-2 mr-0">
              <img src={_homeIcon} className="h-4 m-3" />
              <p>Home</p>
            </div>
          </NavLink>

          <div>
            <div onClick={toggleExpandInventory} className="cursor-pointer">
              <div className="flex items-center w-11/12 m-2">
                <img src={_inventoryIcon} className="h-4 m-3" />
                <p>Inventory</p>
                <img
                  src={_hasMore}
                  className={`ml-auto transition-all ${expandInventory ? "rotate-90" : ""}`}
                />
              </div>
              {expandInventory ? (
                <>
                  <NavLink to={"/products"} className={checkActive}>
                    <div className="flex items-center w-11/12 m-2 mr-0">
                      <p>Products</p>
                    </div>
                  </NavLink>
                  <NavLink to={"/group_products"} className={checkActive}>
                    <div className="flex items-center w-11/12 m-2 mr-0">
                      <p>Group Products</p>
                    </div>
                  </NavLink>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div>
            <div onClick={toggleExpandSales} className="cursor-pointer">
              <div className="flex items-center w-11/12 m-2">
                <img src={_salesIcon} className="h-4 m-3" />
                <p>Sales</p>
                <img
                  src={_hasMore}
                  className={`ml-auto transition-all ${expandSales ? "rotate-90" : ""}`}
                />
              </div>
              {expandSales ? (
                <>
                  <NavLink to={"/orders"} className={checkActive}>
                    <div className="flex items-center w-11/12 m-2 mr-0">
                      <p>Orders</p>
                    </div>
                  </NavLink>
                  <NavLink to={"/clients"} className={checkActive}>
                    <div className="flex items-center w-11/12 m-2 mr-0">
                      <p>Clients</p>
                    </div>
                  </NavLink>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>

          <NavLink to={"/announcements"} className={checkActive}>
            <div className="flex items-center w-11/12 m-2">
              <img src={_announcementsIcon} className="h-4 m-3" />
              <p>Announcements</p>
            </div>
          </NavLink>

          <div>
            <div onClick={toggleExpandUsersRoles} className="cursor-pointer">
              <div className="flex items-center w-11/12 m-2">
                <img src={_users_rolesIcon} className="h-4 m-3" />
                <p>Users & Roles</p>

                <img
                  src={_hasMore}
                  className={`ml-auto transition-all ${expandUsersRoles ? "rotate-90" : ""}`}
                />
              </div>
              {expandUsersRoles ? (
                <>
                  <NavLink to={"/users"} className={checkActive}>
                    <div className="flex items-center w-11/12 m-2 mr-0">
                      <p>Users</p>
                    </div>
                  </NavLink>
                  <NavLink to={"/roles"} className={checkActive}>
                    <div className="flex items-center w-11/12 m-2 mr-0">
                      <p>Roles</p>
                    </div>
                  </NavLink>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>

          <NavLink to={"/billing"} className={checkActive}>
            <div className="flex items-center w-11/12 m-2">
              <img src={_billingIcon} className="h-4 m-3" />
              <p>Billing</p>
            </div>
          </NavLink>
        </div>
      </div>
      {!foldingSideBar ? (
        <div
          className={`fixed z-10 transition-all duration-300 ease-in-out top-1/2 ${
            sideBar ? "left-[250px]" : "left-0 rotate-180"
          }`}
        >
          <button onClick={toggleSideBar}>
            <img src={_openSideBar} />
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SideBar;
