import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faAddressBook,
  faEnvelope,
  faPhone,
  faTrademark,
  faTimes,
  faDownload,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from "universal-cookie";

function SuperAdminAccounts() {
  const [showAccountsMenu, setShowAccountsMenu] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showTableHeaders, setShowTableHeaders] = useState(true);
  const [updatedData, setUpdatedData] = useState([]);
  const [data, setData] = useState([]);
  const [companyDetails, setCompanyDetails] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState({
    data: [],
    showCategoryMenu: false,
  });

  const categories = [
    "FRESH_PRODUCE",
    "MEAT_AND_POULTRY",
    "SEAFOOD",
    "DAIRY_AND_EGGS",
    "GRAINS_AND_BAKERY",
    "CANNED_AND_PACKAGED_GOODS",
    "BEVERAGES",
    "FROZEN_FOODS",
    "SNACKS_AND_CONFECTIONERY",
    "ORGANIC_AND_SPECIALTY_FOODS",
    "ETHNIC_FOODS",
    "HEALTH_AND_WELLNESS",
    "BULK_AND_WHOLESALE",
    "GOURMET_AND_SPECIALTY",
    "FOOD_SERVICE_EQUIPMENT_AND_SUPPLIES",
  ];
  const cookies = new Cookies();
  const storedAccessToken = cookies.get("access_token");
  const formData = new FormData();
  formData.append("token", storedAccessToken);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/companies`, {
        headers: {
          Authorization: "Bearer " + storedAccessToken,
        },
      })
      .then((res) => {
        setUpdatedData(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const toggleAccountsMenu = () => {
    setShowAccountsMenu(!showAccountsMenu);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setShowAccountsMenu(false);
    if (filter == "Active") {
      setUpdatedData(data.filter((item) => item.state === "ACTIVE"));
    } else if (filter == "Inactive") {
      setUpdatedData(data.filter((item) => item.state === "INACTIVE"));
    } else if (filter == "Blocked") {
      setUpdatedData(data.filter((item) => item.state === "BLOCKED"));
    } else {
      setUpdatedData(data);
    }
  };

  const handleEditClick = (company) => {
    setSelectedCompany(company);
    setShowSidebar(true);
  };

  const handleCompanyNameClick = async (company) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/companies/" + company.key,
        {
          headers: {
            Authorization: "Bearer " + storedAccessToken,
          },
        }
      );
      console.log(response.data);
      setCompanyDetails(response.data);
      setSelectedCategories({
        data: response.data.categories,
        showCategoryMenu: false,
      });
    } catch (error) {
      console.error("Error:", error);
    }
    setSelectedCompany(company);
    setShowSidebar(true);
    setShowTableHeaders(false);
  };

  const handleSaveChanges = (updatedCompany) => {
    const updatedDataArray = updatedData.map((company) =>
      company.key === updatedCompany.key ? updatedCompany : company
    );
    setShowSidebar(false);
  };

  const Sidebar = ({ selectedCompany, onSaveChanges }) => {
    const [state, setState] = useState("");
    const [category, setCategory] = useState("");
    const [showStateMenu, setShowStateMenu] = useState(false);
    const [sidebarHeight, setSidebarHeight] = useState(0);

    useEffect(() => {
      const sidebarElement = document.getElementById("sidebar");
      if (sidebarElement) {
        setSidebarHeight(sidebarElement.offsetHeight);
      }
    }, []);

    useEffect(() => {
      if (selectedCompany) {
        setState(companyDetails.stateType);
      }
    }, [selectedCompany]);

    const handleStateChange = (selectedState) => {
      setState(selectedState);
      setShowStateMenu(false);
    };

    const toggleCategoryMenu = () => {
      setSelectedCategories({
        data: selectedCategories.data,
        showCategoryMenu: !selectedCategories.showCategoryMenu,
      });
    };

    const handleCategorySelect = (cat) => {
      console.log(selectedCategories.data);
      if (selectedCategories.data.includes(cat)) {
        setSelectedCategories({
          data: selectedCategories.data.filter((c) => c !== cat),
          showCategoryMenu: selectedCategories.showCategoryMenu,
        });
      } else {
        setSelectedCategories({
          data: [...selectedCategories.data, cat],
          showCategoryMenu: selectedCategories.showCategoryMenu,
        });
      }
    };

    const toggleStateMenu = () => {
      setShowStateMenu(!showStateMenu);
    };

    const handleSaveChanges = async () => {
      const updatedCompany = {
        ...selectedCompany,
        state: state,
      };
      console.log(state);

      try {
        const response = await axios.put(
          "http://localhost:8080/api/v1/companies",
          {
            email: companyDetails.email,
            companyName: companyDetails.name,
            stateType: state,
            categories: selectedCategories.data,
          },
          {
            headers: {
              Authorization: "Bearer " + storedAccessToken,
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
      axios
        .get(`http://localhost:8080/api/v1/companies`, {
          headers: {
            Authorization: "Bearer " + storedAccessToken,
          },
        })
        .then((res) => {
          setUpdatedData(res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      onSaveChanges(updatedCompany);
    };

    return (
      <div
        id="sidebar"
        className="fixed top-0 right-0 h-full w-2/3 bg-white shadow-lg p-6 flex flex-col overflow-auto "
        style={{
          maxHeight: `calc(100vh - ${
            sidebarHeight > window.innerHeight ? 0 : 48
          }px)`,
        }}
      >
        <div className="flex justify-between items-center mt-10 mb-4">
          <p className="text-xl font-bold ">{selectedCompany?.companyName}</p>
          <button
            className="text-supplair-primary hover:text-supplair-primary-darker"
            onClick={() => setShowSidebar(false)}
          >
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
          </button>
        </div>
        <div className="mb-4 flex items-center">
          <span className=" text-supplair-primary px-2 py-1 rounded-md mr-2">
            email
          </span>
          <span>{companyDetails.email}</span>
        </div>
        <div className="mb-4 flex items-center">
          <span className="text-supplair-primary px-2 py-1 rounded-md mr-2">
            phone
          </span>
          <span>{companyDetails.number}</span>
        </div>
        <div className="mb-4 flex items-center">
          <span className="text-supplair-primary px-2 py-1 rounded-md mr-2">
            address
          </span>
          <span>{companyDetails.address}</span>
        </div>
        <div className="mb-4 flex items-center">
          <span className="text-supplair-primary px-2 py-1 rounded-md mr-2">
            trade registry
          </span>
          <FontAwesomeIcon
            icon={faDownload}
            className="text-supplair-primary ml-2 cursor-pointer"
          />
        </div>
        <div className="mb-8 flex flex-col relative">
          <div className="mb-1">
            <span className="text-supplair-primary">Select Categories</span>
          </div>
          <div className="relative inline-block text-left w-full">
            <div>
              <button
                type="button"
                className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-supplair-primary"
                id="categories-menu"
                aria-haspopup="true"
                aria-expanded={selectedCategories.showCategoryMenu}
                onClick={toggleCategoryMenu}
              >
                {selectedCategories.length > 0
                  ? `${selectedCategories.length} selected`
                  : "Select Categories"}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="-mr-1 ml-2 h-5 w-5"
                />
              </button>
            </div>
            {selectedCategories.showCategoryMenu && (
              <div className="absolute z-10 right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="categories-menu"
                  style={{ height: "150px", overflow: "scroll" }}
                >
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <input
                        type="checkbox"
                        className="mr-2 leading-tight"
                        checked={selectedCategories.data.includes(category)}
                        onChange={() => handleCategorySelect(category)}
                      />
                      <span className="ml-2">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex-shrink-0 mb-4">
          <div className="mb-1">
            <span className="text-supplair-primary">Select state</span>
          </div>
          <div className="relative inline-block text-left w-full">
            <div>
              <button
                type="button"
                className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-supplair-primary"
                id="state-menu"
                aria-haspopup="true"
                aria-expanded={showStateMenu}
                onClick={toggleStateMenu}
              >
                {state || "inactive"}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="-mr-1 ml-2 h-5 w-5"
                />
              </button>
            </div>
            {showStateMenu && (
              <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="state-menu"
                >
                  {/* Radio button options */}
                  <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                    <input
                      type="radio"
                      className="mr-2 leading-tight"
                      checked={state === "ACTIVE"}
                      onChange={() => handleStateChange("ACTIVE")}
                    />
                    <span className="ml-2">active</span>
                  </label>
                  <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                    <input
                      type="radio"
                      className="mr-2 leading-tight"
                      checked={state === "INACTIVE"}
                      onChange={() => handleStateChange("INACTIVE")}
                    />
                    <span className="ml-2">inactive</span>
                  </label>
                  <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                    <input
                      type="radio"
                      className="mr-2 leading-tight"
                      checked={state === "BLOCKER"}
                      onChange={() => handleStateChange("BLOCKED")}
                    />
                    <span className="ml-2">blocked</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          className="bg-supplair-primary text-white px-4 py-2 rounded"
          onClick={handleSaveChanges}
        >
          Save
        </button>
      </div>
    );
  };

  return (
    <div className="absolute top-8 left-0 right-0 mx-auto w-[95%]">
      <div className="flex items-center justify-between">
        <div className="flex items-center relative">
          <h2 className="text-2xl font-bold mr-2">All Accounts</h2>
          <button
            className="p-2 rounded-md text-supplair-primary"
            onClick={toggleAccountsMenu}
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {showAccountsMenu && (
            <div className="absolute top-10 left-0 bg-white shadow-lg rounded-md p-2 w-48">
              <div
                className="px-4 py-2 hover:bg-supplair-primary hover:text-white rounded-md cursor-pointer"
                onClick={() => handleFilterChange("All")}
              >
                All
              </div>
              <div
                className="px-4 py-2 hover:bg-supplair-primary hover:text-white rounded-md cursor-pointer"
                onClick={() => handleFilterChange("Active")}
              >
                Active
              </div>
              <div
                className="px-4 py-2 hover:bg-supplair-primary hover:text-white rounded-md cursor-pointer"
                onClick={() => handleFilterChange("Inactive")}
              >
                Inactive
              </div>
              <div
                className="px-4 py-2 hover:bg-supplair-primary hover:text-white rounded-md cursor-pointer"
                onClick={() => handleFilterChange("Blocked")}
              >
                Blocked
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full mt-8">
        <table className="w-full border-separate border-spacing-y-1">
          {!showSidebar && (
            <thead>
              <tr>
                <th className="text-left text-gray-500 py-2 border-b-2 border-gray-300">
                  Company Name
                </th>
                <th className="text-left text-gray-500 py-2 border-b-2 border-gray-300">
                  Contact
                </th>
                <th className="text-left text-gray-500 py-2 border-b-2 border-gray-300">
                  State
                </th>
                <th className="text-center text-gray-500 py-2 border-b-2 border-gray-300">
                  Edit
                </th>
              </tr>
            </thead>
          )}
          <tbody>
            {updatedData
              .sort((a, b) => a.key - b.key)
              .map((data, index) => (
                <tr
                  key={index}
                  className={`${
                    selectedCompany?.key === data.key && showSidebar
                      ? "bg-gray-200"
                      : "bg-white"
                  }`}
                >
                  <td
                    className={`text-left py-2 border-b border-gray-300 text-supplair-primary font-semibold cursor-pointer ${
                      selectedCompany?.key === data.key && showSidebar
                        ? "bg-gray-200"
                        : "bg-white"
                    }`}
                    onClick={() => handleCompanyNameClick(data)}
                  >
                    {data.companyName}
                  </td>
                  <td
                    className={`text-left py-2 border-b border-gray-300 ${
                      selectedCompany?.key === data.key && showSidebar
                        ? "bg-gray-200"
                        : "bg-white"
                    }`}
                  >
                    {data.contact}
                  </td>
                  <td
                    className={`text-left py-2 border-b border-gray-300 ${
                      selectedCompany?.key === data.key && showSidebar
                        ? "bg-gray-200"
                        : "bg-white"
                    }`}
                  >
                    {data.state}
                  </td>
                  <td
                    className={`py-2 text-center border-b border-gray-300 ${
                      selectedCompany?.key === data.key && showSidebar
                        ? "bg-gray-200"
                        : "bg-white"
                    }`}
                  >
                    <button
                      className="focus:outline-none"
                      onClick={() => handleCompanyNameClick(data)}
                    >
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="text-supplair-primary cursor-pointer"
                      />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {showSidebar && (
        <div className="fixed top-0 right-0 h-screen bg-white shadow-lg flex flex-col">
          <Sidebar
            selectedCompany={selectedCompany}
            onSaveChanges={handleSaveChanges}
          />
        </div>
      )}
    </div>
  );
}
export default SuperAdminAccounts;
