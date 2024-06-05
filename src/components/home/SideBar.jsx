import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import _openSideBar from "../../assets/images/openSideBar.svg";
import { useUserContext } from "../../pages/HomePage";

function SideBar() {
  let checkActive = ({ isActive }) => {
    return isActive ? "bg-supplair-primary text-white rounded-r-2xl font-semibold" : "";
  };

  const { userData } = useUserContext();
  const { permissions } = userData;

  const currentPathname = useLocation().pathname;
  let checkActivePath = (inventory, sales, us_ro, def) => {
    switch (currentPathname) {
      case "/products":
      case "/group_products":
        inventory();
        break;
      case "/orders":
      case "/clients":
        sales();
        break;
      case "/roles":
      case "/users":
        us_ro();
        break;
      default:
        if (currentPathname.includes("/group_products")) inventory();
        else def();
        break;
    }
  };

  let initialMenusState = {
    inventory: false,
    sales: false,
    users_roles: false,
  };

  checkActivePath(
    () => (initialMenusState.inventory = true),
    () => (initialMenusState.sales = true),
    () => (initialMenusState.users_roles = true),
    () => {}
  );

  const [expandMenu, setExpandMenu] = useState(initialMenusState);
  const [activeMenu, setActiveMenu] = useState(initialMenusState);

  let toggleExpandMenu = (menu) => {
    setExpandMenu((old) => {
      let temp = { ...old };
      temp[menu] = !old[menu];
      return temp;
    });
  };

  const updateMenus = (menu) => {
    let temp = initialMenusState;
    temp[menu] = true;
    setExpandMenu(temp);
    setActiveMenu(temp);
  };

  useEffect(() => {
    checkActivePath(
      () => updateMenus("inventory"),
      () => updateMenus("sales"),
      () => updateMenus("users_roles"),
      () => {
        let initMenuStr = JSON.stringify(initialMenusState);
        if (
          initMenuStr != JSON.stringify(activeMenu) ||
          initMenuStr != JSON.stringify(expandMenu)
        ) {
          setActiveMenu(initialMenusState);
          setExpandMenu(initialMenusState);
        }
      }
    );
  }, [currentPathname]);

  return (
    <div>
      <div
        id="HomeSideBar"
        className="fixed z-10 w-1/5 overflow-scroll bg-supplair-sidebar h-_pageBody"
      >
        <div className="flex flex-col p-4 pl-0 text-[18px] font-bold">
          {permissions.includes("SUPERADMIN") ? (
            <>
              <NavLink to={"/super-admin_accounts"} className={checkActive}>
                {({ isActive }) => (
                  <div className="flex items-center w-11/12 m-2 mr-0">
                    <svg
                      className="h-5 m-3 ml-4 mr-4"
                      viewBox="0 0 33 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_209_490)">
                        <g clipPath="url(#clip1_209_490)">
                          <path
                            d="M22.7703 32.6484V29.9818C22.7703 28.5673 22.2084 27.2107 21.2082 26.2105C20.2081 25.2103 18.8515 24.6484 17.437 24.6484H6.77035C5.35586 24.6484 3.9993 25.2103 2.99911 26.2105C1.99891 27.2107 1.43701 28.5673 1.43701 29.9818V32.6484"
                            stroke={isActive ? "white" : "black"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12.1034 19.3151C15.0489 19.3151 17.4367 16.9273 17.4367 13.9818C17.4367 11.0363 15.0489 8.64844 12.1034 8.64844C9.15783 8.64844 6.77002 11.0363 6.77002 13.9818C6.77002 16.9273 9.15783 19.3151 12.1034 19.3151Z"
                            stroke={isActive ? "white" : "black"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M30.77 32.6484V29.9818C30.7691 28.8001 30.3758 27.6521 29.6518 26.7182C28.9279 25.7843 27.9142 25.1172 26.77 24.8218"
                            stroke={isActive ? "white" : "black"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M21.437 8.82178C22.5842 9.11551 23.6011 9.78271 24.3272 10.7182C25.0533 11.6537 25.4475 12.8042 25.4475 13.9884C25.4475 15.1727 25.0533 16.3232 24.3272 17.2587C23.6011 18.1942 22.5842 18.8614 21.437 19.1551"
                            stroke={isActive ? "white" : "black"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_209_490">
                          <rect
                            width="32.7344"
                            height="29.8125"
                            fill="white"
                            transform="translate(0.103516 0.648438)"
                          />
                        </clipPath>
                        <clipPath id="clip1_209_490">
                          <rect
                            width="32"
                            height="32"
                            fill="white"
                            transform="translate(0.103516 4.64844)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    <p>Accounts</p>
                  </div>
                )}
              </NavLink>
              <NavLink to={"/super-admin_users"} className={checkActive}>
                {({ isActive }) => (
                  <div className="flex items-center w-11/12 m-2 mr-0">
                    <svg
                      className="h-5 m-3 ml-4 mr-4"
                      viewBox="0 0 33 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_209_490)">
                        <g clipPath="url(#clip1_209_490)">
                          <path
                            d="M22.7703 32.6484V29.9818C22.7703 28.5673 22.2084 27.2107 21.2082 26.2105C20.2081 25.2103 18.8515 24.6484 17.437 24.6484H6.77035C5.35586 24.6484 3.9993 25.2103 2.99911 26.2105C1.99891 27.2107 1.43701 28.5673 1.43701 29.9818V32.6484"
                            stroke={isActive ? "white" : "black"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12.1034 19.3151C15.0489 19.3151 17.4367 16.9273 17.4367 13.9818C17.4367 11.0363 15.0489 8.64844 12.1034 8.64844C9.15783 8.64844 6.77002 11.0363 6.77002 13.9818C6.77002 16.9273 9.15783 19.3151 12.1034 19.3151Z"
                            stroke={isActive ? "white" : "black"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M30.77 32.6484V29.9818C30.7691 28.8001 30.3758 27.6521 29.6518 26.7182C28.9279 25.7843 27.9142 25.1172 26.77 24.8218"
                            stroke={isActive ? "white" : "black"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M21.437 8.82178C22.5842 9.11551 23.6011 9.78271 24.3272 10.7182C25.0533 11.6537 25.4475 12.8042 25.4475 13.9884C25.4475 15.1727 25.0533 16.3232 24.3272 17.2587C23.6011 18.1942 22.5842 18.8614 21.437 19.1551"
                            stroke={isActive ? "white" : "black"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_209_490">
                          <rect
                            width="32.7344"
                            height="29.8125"
                            fill="white"
                            transform="translate(0.103516 0.648438)"
                          />
                        </clipPath>
                        <clipPath id="clip1_209_490">
                          <rect
                            width="32"
                            height="32"
                            fill="white"
                            transform="translate(0.103516 4.64844)"
                          />
                        </clipPath>
                      </defs>
                    </svg>

                    <p>Users</p>
                  </div>
                )}
              </NavLink>
              <NavLink to={"/super-admin_billing"} className={checkActive}>
                {({ isActive }) => (
                  <div className="flex items-center w-11/12 m-2 mr-0">
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 m-3 ml-4 mr-4 fill-none"
                    >
                      <title />
                      <g data-name="Layer 2" id="Layer_2">
                        <path
                          fill={isActive ? "white" : "black"}
                          d="M24,29H8a5,5,0,0,1-5-5V10A1,1,0,0,1,4,9H24a5,5,0,0,1,5,5V24A5,5,0,0,1,24,29ZM5,11V24a3,3,0,0,0,3,3H24a3,3,0,0,0,3-3V14a3,3,0,0,0-3-3Z"
                        />
                        <path
                          fill={isActive ? "white" : "black"}
                          d="M26,11a1,1,0,0,1-1-1V7.25a2.33,2.33,0,0,0-.78-1.87,1.94,1.94,0,0,0-1.67-.32L5.78,8.87a1,1,0,0,0-.78,1,1,1,0,0,1-2,0A3,3,0,0,1,5.33,6.92L22.11,3.11a3.9,3.9,0,0,1,3.36.71A4.34,4.34,0,0,1,27,7.25V10A1,1,0,0,1,26,11Z"
                        />
                        <path
                          fill={isActive ? "white" : "black"}
                          d="M28,23H21a4,4,0,0,1,0-8h7a1,1,0,0,1,1,1v6A1,1,0,0,1,28,23Zm-7-6a2,2,0,0,0,0,4h6V17Z"
                        />
                      </g>
                      <g id="frame">
                        <rect className="cls-1" height="32" width="32" />
                      </g>
                    </svg>
                    <p>Billing</p>
                  </div>
                )}
              </NavLink>
            </>
          ) : (
            <>
              {permissions.includes("HOME") ? (
                <NavLink to={"/"} className={checkActive} end>
                  {({ isActive }) => (
                    <div className="flex items-center w-11/12 m-2 mr-0">
                      <svg
                        viewBox="0 0 35 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 m-3 ml-4 mr-4 "
                      >
                        <path
                          d="M33.1628 15.4168C32.8166 16.2386 31.9589 16.7696 30.9768 16.7696H30.1778V27.0176C30.1778 27.5319 29.7092 27.9493 29.1319 27.9493H22.8565V21.4278C22.8565 18.8593 20.5105 16.7696 17.6269 16.7696C14.7434 16.7696 12.3974 18.8593 12.3974 21.4278V27.9493H6.12203C5.54469 27.9493 5.07613 27.5319 5.07613 27.0176V16.7696H4.27601C3.29391 16.7696 2.43627 16.2395 2.09008 15.4178C1.74388 14.5961 1.99804 13.6924 2.73854 13.1166L14.9536 2.81268C16.4534 1.54844 18.8015 1.54844 20.3003 2.81268L32.5446 13.1408C33.2538 13.6914 33.509 14.5951 33.1628 15.4168Z"
                          fill={isActive ? "white" : "black"}
                        />
                      </svg>
                      <p>Home</p>
                    </div>
                  )}
                </NavLink>
              ) : (
                <></>
              )}
              {permissions.includes("INVENTORY") ? (
                <div>
                  <div
                    onClick={() => {
                      toggleExpandMenu("inventory");
                    }}
                    className="flex flex-col cursor-pointer"
                  >
                    <div
                      className={`flex items-center w-11/12 m-2 ${
                        activeMenu.inventory ? "text-supplair-primary font-bold" : ""
                      }`}
                    >
                      <svg
                        className="h-5 m-3 ml-4 mr-4"
                        viewBox="0 0 37 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.343 22.3188C18.7554 21.8222 18.0924 21.4464 17.354 21.2048L15.802 15.7823L34.2303 11.1383L36.2042 18.0775L19.343 22.3188ZM13.4816 7.62178L25.762 4.53474L27.736 11.4739L15.4555 14.5609L13.4816 7.62178ZM14.024 21.0974C13.6774 21.1779 13.361 21.2987 13.0596 21.4464L7.63514 2.44091H5.60095C5.40507 2.84357 4.96809 3.12543 4.45578 3.12543H1.92434C1.23121 3.12543 0.643555 2.58856 0.643555 1.93088C0.643555 1.27321 1.21614 0.736328 1.92434 0.736328H4.47085C4.89275 0.736328 5.25438 0.951079 5.48041 1.24636H9.38304V1.30005L9.44331 1.28663L15.0486 20.9364C14.7021 20.9632 14.3706 21.0169 14.024 21.0974ZM14.3555 22.2517C16.7212 21.6611 19.1773 22.9765 19.8101 25.218C20.443 27.4594 19.0417 29.7546 16.6609 30.3451C14.2952 30.9491 11.8391 29.6203 11.2063 27.3923C10.5734 25.1508 11.9747 22.8557 14.3555 22.2517ZM13.6774 26.8286C13.9487 27.795 14.9884 28.3587 16.013 28.1037C17.0226 27.8487 17.6403 26.8554 17.3691 25.9025C17.0979 24.9361 16.0582 24.3724 15.0336 24.6408C14.0089 24.8958 13.4062 25.8756 13.6774 26.8286ZM36.0385 22.1309L21.1964 25.8622C21.1663 25.5401 21.1211 25.218 21.0307 24.8958C20.9403 24.5737 20.8046 24.2784 20.654 23.9831L35.4207 20.2653L36.0385 22.1309Z"
                          fill={activeMenu.inventory ? "#0D6EFD" : "black"}
                        />
                      </svg>

                      <p>Inventory</p>
                      <svg
                        viewBox="0 0 11 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`ml-auto transition-all h-4 ${
                          expandMenu.inventory ? "rotate-90" : ""
                        }`}
                      >
                        <path
                          d="M0.559733 3.26182C-0.0666251 2.70257 -0.0668041 1.72272 0.55935 1.16324C1.093 0.686414 1.89957 0.686171 2.43351 1.16267L10.2635 8.15038C11.1546 8.94563 11.1546 10.3395 10.2635 11.1348L2.43351 18.1225C1.89957 18.599 1.093 18.5987 0.55935 18.1219C-0.0668041 17.5624 -0.0666249 16.5826 0.559734 16.0233L6.03531 11.1345C6.92593 10.3393 6.92594 8.9459 6.03531 8.1507L0.559733 3.26182Z"
                          fill={activeMenu.inventory ? "#0D6EFD" : "black"}
                        />
                      </svg>
                    </div>
                    {expandMenu.inventory ? (
                      <>
                        <NavLink to={"products"} className={checkActive}>
                          <div className="flex items-center w-11/12 pl-10 m-2 mr-0 text-base font-semibold">
                            <p>Products</p>
                          </div>
                        </NavLink>
                        <NavLink to={"group_products"} className={checkActive}>
                          <div className="flex items-center w-11/12 pl-10 m-2 mr-0 text-base font-semibold">
                            <p>Group Products</p>
                          </div>
                        </NavLink>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ) : (
                <></>
              )}
              {permissions.includes("SALES") ? (
                <div>
                  <div
                    onClick={() => {
                      toggleExpandMenu("sales");
                    }}
                    className="flex flex-col cursor-pointer"
                  >
                    <div
                      className={`flex items-center w-11/12 m-2 ${
                        activeMenu.sales ? "text-supplair-primary font-bold" : ""
                      }`}
                    >
                      <svg
                        className="h-5 m-3 ml-4 mr-4"
                        viewBox="0 0 35 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_209_470)">
                          <path
                            d="M29.8087 8.0625H24.37V6.82031C24.37 3.34219 21.302 0.609375 17.3973 0.609375C13.4926 0.609375 10.4246 3.34219 10.4246 6.82031V13.0312H13.2137V10.5469H18.7918V8.0625H13.2137V6.82031C13.2137 4.70859 15.0266 3.09375 17.3973 3.09375C19.768 3.09375 21.5809 4.70859 21.5809 6.82031V13.0312H24.37V10.5469H27.2985L28.5536 27.9375H6.38048L7.49611 10.5469H7.63556V8.0625H4.98594L3.3125 30.4219H31.3427L29.8087 8.0625Z"
                            fill={activeMenu.sales ? "#0D6EFD" : "black"}
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_209_470">
                            <rect
                              width="33.4688"
                              height="29.8125"
                              fill="white"
                              transform="translate(0.663086 0.609375)"
                            />
                          </clipPath>
                        </defs>
                      </svg>

                      <p>Sales</p>

                      <svg
                        viewBox="0 0 11 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`ml-auto transition-all h-4 ${
                          expandMenu.sales ? "rotate-90" : ""
                        }`}
                      >
                        <path
                          d="M0.559733 3.26182C-0.0666251 2.70257 -0.0668041 1.72272 0.55935 1.16324C1.093 0.686414 1.89957 0.686171 2.43351 1.16267L10.2635 8.15038C11.1546 8.94563 11.1546 10.3395 10.2635 11.1348L2.43351 18.1225C1.89957 18.599 1.093 18.5987 0.55935 18.1219C-0.0668041 17.5624 -0.0666249 16.5826 0.559734 16.0233L6.03531 11.1345C6.92593 10.3393 6.92594 8.9459 6.03531 8.1507L0.559733 3.26182Z"
                          fill={activeMenu.sales ? "#0D6EFD" : "black"}
                        />
                      </svg>
                    </div>
                    {expandMenu.sales ? (
                      <>
                        <NavLink to={"orders"} className={checkActive}>
                          <div className="flex items-center w-11/12 pl-10 m-2 mr-0 text-base font-semibold">
                            <p>Orders</p>
                          </div>
                        </NavLink>
                        <NavLink to={"clients"} className={checkActive}>
                          <div className="flex items-center w-11/12 pl-10 m-2 mr-0 text-base font-semibold">
                            <p>Clients</p>
                          </div>
                        </NavLink>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ) : (
                <></>
              )}
              {permissions.includes("ANNOUNCEMENT") ? (
                <NavLink to={"announcements"} className={checkActive}>
                  {({ isActive }) => (
                    <div className="flex items-center w-11/12 m-2 mr-0">
                      <svg
                        className="h-5 m-3 ml-4 mr-4 "
                        viewBox="0 0 26 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.6667 4.84291V22.6536C11.6667 23.9495 10.6161 25 9.32024 25C8.32861 25 7.44403 24.3766 7.11051 23.4428L4.24863 15.2438M21 14.3333C23.2091 14.3333 25 12.5425 25 10.3333C25 8.12419 23.2091 6.33333 21 6.33333M4.24863 15.2438C2.33906 14.4321 1 12.5391 1 10.3333C1 7.38781 3.38781 5 6.33332 5H8.77611C14.2436 5 18.9425 3.35454 21 1L21 19.6667C18.9425 17.3121 14.2436 15.6667 8.77611 15.6667L6.3333 15.6667C5.59357 15.6667 4.88902 15.5161 4.24863 15.2438Z"
                          stroke={isActive ? "white" : "black"}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p>Announcements</p>
                    </div>
                  )}
                </NavLink>
              ) : (
                <></>
              )}
              {permissions.includes("USERS") ? (
                <div>
                  <div
                    onClick={() => {
                      toggleExpandMenu("users_roles");
                    }}
                    className="flex flex-col cursor-pointer"
                  >
                    <div
                      className={`flex items-center w-11/12 m-2 ${
                        activeMenu.users_roles ? "text-supplair-primary font-bold" : ""
                      }`}
                    >
                      <svg
                        className="h-5 m-3 ml-4 mr-4"
                        viewBox="0 0 33 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_209_490)">
                          <g clipPath="url(#clip1_209_490)">
                            <path
                              d="M22.7703 32.6484V29.9818C22.7703 28.5673 22.2084 27.2107 21.2082 26.2105C20.2081 25.2103 18.8515 24.6484 17.437 24.6484H6.77035C5.35586 24.6484 3.9993 25.2103 2.99911 26.2105C1.99891 27.2107 1.43701 28.5673 1.43701 29.9818V32.6484"
                              stroke={activeMenu.users_roles ? "#0D6EFD" : "black"}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12.1034 19.3151C15.0489 19.3151 17.4367 16.9273 17.4367 13.9818C17.4367 11.0363 15.0489 8.64844 12.1034 8.64844C9.15783 8.64844 6.77002 11.0363 6.77002 13.9818C6.77002 16.9273 9.15783 19.3151 12.1034 19.3151Z"
                              stroke={activeMenu.users_roles ? "#0D6EFD" : "black"}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M30.77 32.6484V29.9818C30.7691 28.8001 30.3758 27.6521 29.6518 26.7182C28.9279 25.7843 27.9142 25.1172 26.77 24.8218"
                              stroke={activeMenu.users_roles ? "#0D6EFD" : "black"}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M21.437 8.82178C22.5842 9.11551 23.6011 9.78271 24.3272 10.7182C25.0533 11.6537 25.4475 12.8042 25.4475 13.9884C25.4475 15.1727 25.0533 16.3232 24.3272 17.2587C23.6011 18.1942 22.5842 18.8614 21.437 19.1551"
                              stroke={activeMenu.users_roles ? "#0D6EFD" : "black"}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_209_490">
                            <rect
                              width="32.7344"
                              height="29.8125"
                              fill="white"
                              transform="translate(0.103516 0.648438)"
                            />
                          </clipPath>
                          <clipPath id="clip1_209_490">
                            <rect
                              width="32"
                              height="32"
                              fill="white"
                              transform="translate(0.103516 4.64844)"
                            />
                          </clipPath>
                        </defs>
                      </svg>

                      <p>Users & Roles</p>
                      <svg
                        viewBox="0 0 11 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`ml-auto transition-all h-4 ${
                          expandMenu.users_roles ? "rotate-90" : ""
                        }`}
                      >
                        <path
                          d="M0.559733 3.26182C-0.0666251 2.70257 -0.0668041 1.72272 0.55935 1.16324C1.093 0.686414 1.89957 0.686171 2.43351 1.16267L10.2635 8.15038C11.1546 8.94563 11.1546 10.3395 10.2635 11.1348L2.43351 18.1225C1.89957 18.599 1.093 18.5987 0.55935 18.1219C-0.0668041 17.5624 -0.0666249 16.5826 0.559734 16.0233L6.03531 11.1345C6.92593 10.3393 6.92594 8.9459 6.03531 8.1507L0.559733 3.26182Z"
                          fill={activeMenu.users_roles ? "#0D6EFD" : "black"}
                        />
                      </svg>
                    </div>
                    {expandMenu.users_roles ? (
                      <>
                        <NavLink to={"users"} className={checkActive}>
                          <div className="flex items-center w-11/12 pl-10 m-2 mr-0 text-base font-semibold">
                            <p>Users</p>
                          </div>
                        </NavLink>
                        <NavLink to={"roles"} className={checkActive}>
                          <div className="flex items-center w-11/12 pl-10 m-2 mr-0 text-base font-semibold">
                            <p>Roles</p>
                          </div>
                        </NavLink>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ) : (
                <></>
              )}
              {permissions.includes("BILLING") ? (
                <NavLink to={"billing"} className={checkActive}>
                  {({ isActive }) => (
                    <div className="flex items-center w-11/12 m-2 mr-0">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 m-3 ml-4 mr-4 fill-none"
                      >
                        <title />
                        <g data-name="Layer 2" id="Layer_2">
                          <path
                            fill={isActive ? "white" : "black"}
                            d="M24,29H8a5,5,0,0,1-5-5V10A1,1,0,0,1,4,9H24a5,5,0,0,1,5,5V24A5,5,0,0,1,24,29ZM5,11V24a3,3,0,0,0,3,3H24a3,3,0,0,0,3-3V14a3,3,0,0,0-3-3Z"
                          />
                          <path
                            fill={isActive ? "white" : "black"}
                            d="M26,11a1,1,0,0,1-1-1V7.25a2.33,2.33,0,0,0-.78-1.87,1.94,1.94,0,0,0-1.67-.32L5.78,8.87a1,1,0,0,0-.78,1,1,1,0,0,1-2,0A3,3,0,0,1,5.33,6.92L22.11,3.11a3.9,3.9,0,0,1,3.36.71A4.34,4.34,0,0,1,27,7.25V10A1,1,0,0,1,26,11Z"
                          />
                          <path
                            fill={isActive ? "white" : "black"}
                            d="M28,23H21a4,4,0,0,1,0-8h7a1,1,0,0,1,1,1v6A1,1,0,0,1,28,23Zm-7-6a2,2,0,0,0,0,4h6V17Z"
                          />
                        </g>
                        <g id="frame">
                          <rect className="cls-1" height="32" width="32" />
                        </g>
                      </svg>
                      <p>Billing</p>
                    </div>
                  )}
                </NavLink>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
