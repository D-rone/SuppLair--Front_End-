import React, { useEffect, useState } from "react";
import _logoIcon from "../../assets/images/LogoIcon.png";
import _logoText from "../../assets/images/LogoText.png";
import _search from "../../assets/images/search.svg";
import _dropDown from "../../assets/images/dropDown.svg";
import _noProfilePic from "../../assets/images/noProfilePic.png";
import _bell from "../../assets/images/bell.svg";

let searchFormController = (event) => {
  event.preventDefault();
};

function TopBar() {
  const [showLogoText, setShowLogoText] = useState(false);
  const [profilePic, setProfilePic] = useState(_noProfilePic);
  const [userName, setUserName] = useState("Mohamed Ouksili");
  
  useEffect(() => {
    const handleResize = () => {
      setShowLogoText(window.innerWidth >= 900);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    // TOP BAR
    <div className="fixed z-10 flex items-center w-full h-14 bg-supplair-secondary">
      {/* LOGO */}
      <div className="w-1/4">
        {showLogoText ? (
          <div className="relative left-1/10 w-fit hover:cursor-pointer">
            <img src={_logoIcon} id="topBar_logo" alt="" className="inline h-8 mr-2" />
            <img src={_logoText} id="topBar_logo" alt="" className="inline h-6 mt-1 " />
          </div>
        ) : (
          <div className="flex justify-center w-full hover:cursor-pointer">
            <img src={_logoIcon} id="topBar_logo" alt="" className="inline h-8 mr-2" />
          </div>
        )}
      </div>
      {/* Search Bar */}
      <div className="w-1/4">
        <form onSubmit={searchFormController}>
          <div className="flex items-center w-full h-10 p-2 bg-white border-2 rounded-xl">
            <img src={_search} alt="" className="h-7 hover:cursor-pointer" />
            <img src={_dropDown} alt="" className="h-1.5 hover:cursor-pointer" />
            <input
              type="text"
              placeholder="Search ..."
              className="w-full h-8 pl-2 ml-3 border-l-2 border-gray-300 focus:outline-none"
            />
          </div>
        </form>
      </div>
      {/* Profile Options */}
      <div className="flex items-center justify-end h-full p-4 ml-auto w-fit">
        <div className="pr-4 m-4 text-base leading-none text-white border-r-3 font-raleway">
          {userName}
        </div>

        <div>
          <img src={_bell} className="h-6 m-3 hover:cursor-pointer opacity-80" />
        </div>

        <div className="p-4">
          <img
            src={profilePic}
            className="w-10 h-10 border-2 border-gray-700 rounded-full hover:cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
