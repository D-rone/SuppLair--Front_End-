import React, { createContext, useContext, useEffect, useState } from "react";
import TopBar from "../components/home/TopBar";
import SideBar from "../components/home/SideBar";
import HomeBody from "../components/home/HomeBody";

function HomePage() {

  return (
    <>
      <TopBar />

      {/* Top Bar Spacer */}
      <div className="h-14"></div>

      <div className="relative flex">
        <SideBar />
        <HomeBody />
      </div>
    </>
  );
}

export default HomePage;
