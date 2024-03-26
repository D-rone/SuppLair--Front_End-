import React from "react";
import { Outlet } from "react-router-dom";

function HomeBody({ openSideBar }) {
  return (
    <div
      className={`relative h-_pageBody transition-all duration-300 ease-in-out ${
        openSideBar ? "w-4/5 left-1/5" : "w-full left-0"
      }`}
    >
      <Outlet />
    </div>
  );
}

export default HomeBody;
