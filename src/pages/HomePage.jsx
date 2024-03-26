import React, { useState } from "react";
import TopBar from "../components/home/TopBar";
import SideBar from "../components/home/SideBar";
import HomeBody from "../components/home/HomeBody";

function HomePage() {
  const [openSideBar, setOpenSideBar] = useState(true);
  return (
    <>
      <TopBar />
      {/* Top Bar Spacer */}

      <div className="h-14"></div>
      <div className="relative flex">
        <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
        <HomeBody openSideBar={openSideBar} />
      </div>
    </>
  );
}

export default HomePage;
