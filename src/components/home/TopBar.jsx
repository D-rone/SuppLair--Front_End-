import React, { useEffect, useState } from "react";
import _logoIcon from "../../assets/images/LogoIcon.png";
import _logoText from "../../assets/images/LogoText.png";
import _search from "../../assets/images/search.svg";
import _dropDown from "../../assets/images/dropDown.svg";
import _noProfilePic from "../../assets/images/noProfilePic.png";

function TopBar() {
  const [showLogoText, setShowLogoText] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowLogoText(window.innerWidth >= 1300);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex items-center w-full h-20 bg-supplair-secondary">
      <div className="w-1/5">
        {showLogoText ? (
          <div className="relative left-1/10 w-fit hover:cursor-pointer">
            <img src={_logoIcon} id="topBar_logo" alt="" className="inline mr-2 h-11" />
            <img src={_logoText} id="topBar_logo" alt="" className="inline h-8 mt-2 " />
          </div>
        ) : (
          <div className="flex justify-center w-full">
            <img src={_logoIcon} id="topBar_logo" alt="" className="inline mr-2 h-11" />
          </div>
        )}
      </div>
      <div className="w-1/4">
        <form>
          <div className="flex items-center w-full p-2 bg-white border-2 h-14.5 rounded-xl">
            <img src={_search} alt="" className="h-8" />
            <img src={_dropDown} alt="" className="h-2" />
            <input
              type="text"
              placeholder="Search ..."
              className="w-full h-8 pl-2 ml-3 border-l-2 border-gray-300"
            />
          </div>
        </form>
      </div>

      <div className="absolute right-0 flex justify-end w-1/4">
        <div className="p-6">
          <img src={_noProfilePic} className="rounded-full h-14 hover:cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
