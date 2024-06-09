import React, { useEffect, useState } from "react";
import defaultProfilePic from "../../assets/images/noProfilePic.png";
import _LogoInline from "../../assets/images/Logo_inline.png";
import _logoIcon from "../../assets/images/Logo_icon.png";
import _search from "../../assets/images/search.svg";
import _dropDown from "../../assets/images/dropDown.svg";
import _noProfilePic from "../../assets/images/noProfilePic.png";
import _bell from "../../assets/images/bell.svg";
import { NavLink } from "react-router-dom";
import { useScreenContext } from "../../App";
import { useUserContext } from "../../pages/HomePage";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { supplairAPI } from "../../utils/axios";

function TopBar({ profileDropdown, setProfileDropdown }) {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const storedAccessToken = cookies.get("access_token");
  const { userData } = useUserContext();
  const [username, setUsername] = useState(userData.name);
  const [profilePic, setProfilePic] = useState(defaultProfilePic);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchCustomers, setSearchCustomers] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);

  useEffect(() => {
    // Mock data for search results
    const mockData = [
      { id: 1, title: "Ali" },
      { id: 2, title: "Mohamed" },
      { id: 3, title: "Yasser" },
    ];
    const mockData2 = [
      { id: 1, title: "elio Huile 5L" },
      { id: 1, title: "elio Huile 2L" },
      { id: 2, title: "Lben" },
      { id: 3, title: "Sucre" },
    ];

    // Filter mock data based on search query
    const filteredProducts = mockData2.filter((result) =>
      result.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredClients = mockData.filter((result) =>
      result.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Update search results
    setSearchCustomers(filteredClients);
    setSearchProducts(filteredProducts);
  }, [searchQuery]);

  let toggleProfileDropdown = (e) => {
    e.stopPropagation();
    setProfileDropdown(!profileDropdown);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Perform search
    // Example: fetchSearchResults(searchQuery);
  };

  const renderSearchCustomers = () => {
    if (searchQuery === "") return null;
    return searchCustomers.map((result) => (
      <div className="text-base font-medium my-2 cursor-pointer" key={result.id}>
        {result.title}
      </div>
    ));
  };
  const renderSearchProducts = () => {
    if (searchQuery === "") return null;
    return searchProducts.map((result) => (
      <div className="text-base font-medium my-2 cursor-pointer" key={result.id}>
        {result.title}
      </div>
    ));
  };

  const { showLogoText } = useScreenContext();

  let logout = async () => {
    try {
      const response = await supplairAPI.post(`orders-srv/api/v1/logout/` + storedAccessToken, {
        headers: {
          Authorization: "Bearer " + storedAccessToken,
        },
      });
      cookies.remove("access_token", { path: "/" });
      cookies.remove("refresh_token", { path: "/" });
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    // TOP BAR
    <div
      className="fixed z-10 flex items-center w-full h-14 bg-supplair-secondary"
      onClick={() => {
        setProfileDropdown(false);
      }}
    >
      {/* LOGO */}
      <div className="w-1/5">
        {showLogoText ? (
          <div className="relative left-[10%] w-fit hover:cursor-pointer">
            <NavLink to={"/"}>
              <img src={_LogoInline} id="topBar_logo" alt="" className="inline h-8 mr-2" />
            </NavLink>
          </div>
        ) : (
          <div className="flex justify-center w-full hover:cursor-pointer">
            <NavLink to={"/"}>
              <img src={_logoIcon} id="topBar_logo" alt="" className="inline h-8 mr-2" />
            </NavLink>
          </div>
        )}
      </div>
      {/* Search Bar */}
      <div className="w-2/5">
        <form onSubmit={handleSearchSubmit}>
          <div className="flex items-center w-full h-10 p-2 bg-white border-2 rounded-md relative">
            <img src={_search} alt="" className="h-7 hover:cursor-pointer" />
            <input
              type="text"
              placeholder="Search ..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full h-8 pl-2 ml-3 border-l-2 border-gray-300 focus:outline-none"
            />
            {searchQuery === "" ? (
              <></>
            ) : (
              <div
                className="absolute left-0 right-0 top-full bg-white p-2 border border-gray-300 border-solid border-t-0 border-b border-l-0 border-r-0 rounded-b-lg overflow-scroll"
                style={{ maxHeight: "400px" }}
              >
                {" "}
                <h6 className="text-sm text-gray-400">Customers</h6>
                {renderSearchCustomers()}
                <div className="w-full h-px bg-gray-300 my-2"></div>
                <h6 className=" text-sm text-gray-400">Products</h6>
                {renderSearchProducts()}
              </div>
            )}
          </div>
        </form>
      </div>
      {/* Profile Options */}
      <div className="flex items-center justify-end h-full p-4 ml-auto w-fit">
        <div className="pr-4 m-4 text-base leading-none text-white border-r-[3px] font-raleway">
          {username}
        </div>

        <div>
          <img src={_bell} className="h-6 m-3 hover:cursor-pointer opacity-80" />
        </div>

        <div className="p-4">
          <img
            src={profilePic}
            onClick={toggleProfileDropdown}
            className="w-10 h-10 border-2 border-gray-700 rounded-full hover:cursor-pointer"
          />
        </div>
        {profileDropdown && (
          <div className="absolute w-48 mt-2 text-white rounded-md shadow-lg bg-supplair-secondary top-14 right-2">
            <div className="py-1">
              <NavLink
                to="/user_profile"
                className="flex items-center block border-[1px] border-gray-700 px-8 py-2 text-base h-14 hover:bg-gray-950"
              >
                Profile
              </NavLink>
              <button
                className="flex items-center block border-[1px] border-gray-700 px-8 py-2 text-base h-14 hover:bg-gray-950"
                onClick={logout}
                style={{ width: "100%", border: "none" }}
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TopBar;
