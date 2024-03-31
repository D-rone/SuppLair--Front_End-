import React, { useState } from "react";
import TopBar from "../components/home/TopBar";
import SideBar from "../components/home/SideBar";
import HomeBody from "../components/home/HomeBody";

function HomePage() {
  const [profileDropdown, setProfileDropdown] = useState(false);

  let closeProfilePopUp = () => {
    setProfileDropdown((old) => {
      if (old) return false;
    });
  };

  return (
    <div>
      <TopBar profileDropdown={profileDropdown} setProfileDropdown={setProfileDropdown} />

      {/* Top Bar Spacer */}
      <div className="h-14"></div>

      <div className="relative flex font-raleway" onClick={closeProfilePopUp}>
        <SideBar />
        <HomeBody closeProfilePopUp={closeProfilePopUp} />
      </div>
    </div>
  );
}

export default HomePage;
