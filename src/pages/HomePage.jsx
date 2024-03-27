import React, { createContext, useContext, useEffect, useState } from "react";
import TopBar from "../components/home/TopBar";
import SideBar from "../components/home/SideBar";
import HomeBody from "../components/home/HomeBody";

const ScreenContext = createContext();
export const useScreenContext = () => useContext(ScreenContext);

function HomePage() {
  const [showLogoText, setShowLogoText] = useState(false);
  const [foldingSideBar, setFoldingSideBar] = useState(true);
  const [sideBar, setSideBar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowLogoText(window.innerWidth >= 900);
      setFoldingSideBar(window.innerWidth >= 1100);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <ScreenContext.Provider value={{ showLogoText, foldingSideBar, sideBar, setSideBar }}>
        <TopBar />

        {/* Top Bar Spacer */}
        <div className="h-14"></div>

        <div className="relative flex">
          <SideBar />
          <HomeBody />
        </div>
      </ScreenContext.Provider>
    </>
  );
}

export default HomePage;
